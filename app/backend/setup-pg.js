const pg = require('pg');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);

const PGUSER = process.env.PGUSER || 'postgres';

let databaseURL = 'postgres://';

databaseURL += PGUSER;
if (process.env.PGPASSWORD) {
  databaseURL += `:${process.env.PGPASSWORD}`;
}

databaseURL += '@';

databaseURL += process.env.PGHOST || 'localhost';
if (process.env.PGPORT) {
  databaseURL += `:${process.env.PGPORT}`;
}

databaseURL += '/';
databaseURL += process.env.PGDATABASE || 'connectivity_intake';

const connectPgPool = () => {
  const pgPool = new pg.Pool({ connectionString: databaseURL });

  const store = new PgSession({
    pool: pgPool,
    schemaName: 'connectivity_intake',
    tableName: 'connect_session',
  });

  return { pgPool, store };
};

module.exports = connectPgPool;
