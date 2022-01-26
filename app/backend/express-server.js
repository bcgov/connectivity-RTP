const crypto = require('crypto');
const express = require('express');
const logger = require('morgan');
const compress = require('compression');
const session = require('express-session');
const helmet = require('helmet');
const lusca = require('lusca');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectPgPool = require('./setup-pg');
const pgQuery = require('./queries');
const { countApplication } = require('./queries/application');
const { postgraphile } = require('postgraphile');
const { formatLogs } = require('../utils/logging');
const ssoMiddleware = require('./middleware/sso');

const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString();
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const HALF_DAY = 12 * (60 * 60 * 1000);
const ONE_DAY = 2 * HALF_DAY;
const TWO_WEEKS = 14 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

const initExpresss = async (options = {}) => {

  const { pgPool, store } = connectPgPool();

  const expressServer = express();
  expressServer.pgPool = pgPool;

  expressServer.use((req, res, next) => {
    req.pgPool = pgPool;
    req.pgQuery = new pgQuery(pgPool, req);
    next();
  });

  expressServer.use(logger(isProd ? formatLogs : 'dev'));
  expressServer.use(bodyParser.json());
  expressServer.use(bodyParser.urlencoded({ extended: false }));
  expressServer.use(cookieParser());

  // helmet
  expressServer.use(helmet.frameguard());
  expressServer.use(helmet.xssFilter());
  expressServer.use(helmet.noSniff());
  expressServer.use(helmet.ieNoOpen());
  expressServer.use(
    helmet.hsts({
      maxAge: TWO_WEEKS,
      includeSubDomains: true,
      force: true,
    })
  );

  // lusca
  expressServer.use(lusca.p3p('ABCDEF'));
  expressServer.use(lusca.referrerPolicy('same-origin'));

  // At a minimum, disable X-Powered-By header
  expressServer.disable('x-powered-by');

  expressServer.set('trust proxy', 1); // trust first proxy

  expressServer.use(
    compress({
      filter: (req, res) => /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type')),
      level: 9,
    })
  );

  expressServer.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        // session expiration is set by default to 30 days
        maxAge: THIRTY_DAYS,
        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: true,
        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: isProd,
      },
      store
    })
  );

  expressServer.use(await ssoMiddleware());

  expressServer.use((req, res, next) => {
    if (req.path !== '/') {
      if (req.claims) next(); else res.status(403).end();
    }
    next();
  });

  expressServer.use(
    postgraphile(pgPool, "connectivity_intake_public", {
      watchPg: !isProd,
      graphiql: true,
      enhanceGraphiql: true,
      // pgDefaultRole: 'connectivity_intake_guest',
      pgSettings: (req) => {
        if (!req.claims) return {};
        return { session_sub: req.claims.sub }
      }
    })
  );

  return expressServer;
};

module.exports = initExpresss;
