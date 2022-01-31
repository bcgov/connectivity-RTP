import next from 'next';
import express from 'express';
import logger from 'morgan';
import compress from 'compression';
import { frameguard, xssFilter, noSniff, ieNoOpen, hsts } from 'helmet';
import lusca from 'lusca';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import formatLogs from './utils/logging';
import { createLightship } from 'lightship';
import session from './backend/middleware/session';
import graphQlMiddleware from './backend/middleware/graphql';
import ssoMiddleware from './backend/middleware/sso';
import createServer from './backend/create-server';
import delay from "delay";
import { pgPool } from "./backend/db/setup-pg";

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { json, urlencoded } = bodyParser;
const { p3p, referrerPolicy } = lusca;

const HALF_DAY = 12 * (60 * 60 * 1000);
const ONE_DAY = 2 * HALF_DAY;
const TWO_WEEKS = 14 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

app.prepare().then(async () => {
  const server = express();

  const lightship = createLightship();

  lightship.registerShutdownHandler(async () => {
    // Allow the server to send any in-flight requests before shutting down
    await delay(10000);
    await app.close();
    await pgPool.end();
  })

  server.use(logger(!dev ? formatLogs : 'dev'));
  server.use(json());
  server.use(urlencoded({ extended: false }));
  server.use(cookieParser());

  // helmet
  server.use(frameguard());
  server.use(xssFilter());
  server.use(noSniff());
  server.use(ieNoOpen());
  server.use(
    hsts({
      maxAge: TWO_WEEKS,
      includeSubDomains: true
    })
  );

  // lusca 
  server.use(p3p('ABCDEF'));
  server.use(referrerPolicy('same-origin'));

  // At a minimum, disable X-Powered-By header
  server.disable('x-powered-by');

  server.set('trust proxy', 1); // trust first proxy

  server.use(
    compress({
      filter: (req, res) =>
        /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type')),
      level: 9
    })
  );

  const { middleware: sessionMiddleware } = session();
  server.use(sessionMiddleware);

  server.use(await ssoMiddleware());

  server.use(graphQlMiddleware());

  // catch all other routes and return the index file
  server.all('*', async (req, res) => handle(req, res));

  createServer(server, lightship);
});
