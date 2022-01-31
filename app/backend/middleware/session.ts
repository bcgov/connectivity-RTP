import crypto from 'crypto';
import expressSession from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pgPool } from '../db/setup-pg';

const PgSession = connectPgSimple(expressSession);
const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString();
const isProd = process.env.NODE_ENV === 'production';

const HALF_DAY = 12 * (60 * 60 * 1000);
const ONE_DAY = 2 * HALF_DAY;
const TWO_WEEKS = 14 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

const session = () => {
  const store = new PgSession({
    pool: pgPool,
    schemaName: 'connectivity_intake_private',
    tableName: 'connect_session'
  });

  const middleware = expressSession({
    secret: sessionSecret,
    store,
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
    }
  });

  return { middleware, store };
};

export default session;
