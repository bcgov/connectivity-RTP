import express from 'express';
import logger from 'morgan';
import compress from 'compression';
import { frameguard, xssFilter, noSniff, ieNoOpen, hsts } from 'helmet';
import lusca from 'lusca';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import formatLogs from '../utils/logging';
import session from './middleware/session';
import graphQlMiddleware from './middleware/graphql';
import ssoMiddleware from './middleware/sso';

const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const HALF_DAY = 12 * (60 * 60 * 1000);
const ONE_DAY = 2 * HALF_DAY;
const TWO_WEEKS = 14 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

const { json, urlencoded } = bodyParser;
const { p3p, referrerPolicy } = lusca;

const initExpresss = async () => {
  const expressServer = express();

  expressServer.use(logger(isProd ? formatLogs : 'dev'));
  expressServer.use(json());
  expressServer.use(urlencoded({ extended: false }));
  expressServer.use(cookieParser());

  // helmet
  expressServer.use(frameguard());
  expressServer.use(xssFilter());
  expressServer.use(noSniff());
  expressServer.use(ieNoOpen());
  expressServer.use(
    hsts({
      maxAge: TWO_WEEKS,
      includeSubDomains: true
    })
  );

  // lusca
  expressServer.use(p3p('ABCDEF'));
  expressServer.use(referrerPolicy('same-origin'));

  // At a minimum, disable X-Powered-By header
  expressServer.disable('x-powered-by');

  expressServer.set('trust proxy', 1); // trust first proxy

  expressServer.use(
    compress({
      filter: (req, res) =>
        /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type')),
      level: 9
    })
  );

  const { middleware: sessionMiddleware } = session();
  expressServer.use(sessionMiddleware);

  expressServer.use(await ssoMiddleware());

  expressServer.use(graphQlMiddleware());

  return expressServer;
};

export default initExpresss;
