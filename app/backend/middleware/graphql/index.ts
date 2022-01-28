import type { Request } from 'express';
import { postgraphile } from 'postgraphile';
import { pgPool } from '../../db/setup-pg';
import { makePluginHook } from 'postgraphile';
import PgManyToManyPlugin from '@graphile-contrib/pg-many-to-many';
import PostgraphileLogConsola from 'postgraphile-log-consola';
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';
import { TagsFilePlugin } from 'postgraphile/plugins.js';
import PostGraphileUploadFieldPlugin from 'postgraphile-plugin-upload-field';
import PgOmitArchived from '@graphile-contrib/pg-omit-archived';
import PgOrderByRelatedPlugin from '@graphile-contrib/pg-order-by-related';
import authenticationPgSettings from './authenticationPgSettings';

// Use consola for logging instead of default logger
const pluginHook = makePluginHook([PostgraphileLogConsola]);

let postgraphileOptions = {
  pluginHook,
  classicIds: true,
  enableQueryBatching: true,
  dynamicJson: true,
  extendedErrors: ['hint', 'detail', 'errcode'],
  showErrorStack: true, // setting this to "json" results in a typescript error
  graphiql: true,
  enhanceGraphiql: true,
  retryOnInitFail: false,
  allowExplain: false
};

if (process.env.NODE_ENV === 'production') {
  postgraphileOptions = {
    ...postgraphileOptions,
    retryOnInitFail: true
  };
} else {
  postgraphileOptions = {
    ...postgraphileOptions,
    allowExplain: true
  };
}

const postgraphileMiddleware = () => {
  return postgraphile(
    pgPool,
    process.env.DATABASE_SCHEMA || 'connectivity_intake_public',
    {
      ...postgraphileOptions,
      pgSettings: (req: Request) => {
        console.log('PGSETTINGS: ', req.claims);
        const opts = {
          ...authenticationPgSettings(req)
        };
        return opts;
      }
    }
  );
};

export default postgraphileMiddleware;
