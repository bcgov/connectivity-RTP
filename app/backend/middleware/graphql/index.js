import { postgraphile } from "postgraphile";
import { pgPool } from "../../db/setup-pg.js";
import { makePluginHook } from "postgraphile";
import PgManyToManyPlugin from "@graphile-contrib/pg-many-to-many";
import PostgraphileLogConsola from "postgraphile-log-consola";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { TagsFilePlugin } from "postgraphile/plugins.js";
import PostGraphileUploadFieldPlugin from "postgraphile-plugin-upload-field";
import PgOmitArchived from "@graphile-contrib/pg-omit-archived";
import PgOrderByRelatedPlugin from "@graphile-contrib/pg-order-by-related";
import authenticationPgSettings from "./authenticationPgSettings.js";

// Use consola for logging instead of default logger
const pluginHook = makePluginHook([PostgraphileLogConsola]);

let postgraphileOptions = {
  // pluginHook,
  // appendPlugins: [
  //   PgManyToManyPlugin,
  //   ConnectionFilterPlugin,
  //   TagsFilePlugin,
  //   PostGraphileUploadFieldPlugin,
  //   PgOmitArchived,
  //   PgOrderByRelatedPlugin,
  // ],
  classicIds: true,
  enableQueryBatching: true,
  dynamicJson: true,
  extendedErrors: ["hint", "detail", "errcode"],
  showErrorStack: "json",
};

if (process.env.NODE_ENV === "production") {
  postgraphileOptions = {
    ...postgraphileOptions,
    retryOnInitFail: true,
  };
} else {
  postgraphileOptions = {
    ...postgraphileOptions,
    graphiql: true,
    enhanceGraphiql: true,
    allowExplain: true,
  };
}

const postgraphileMiddleware = () => {
  return postgraphile(pgPool, process.env.DATABASE_SCHEMA || "connectivity_intake_public", {
    ...postgraphileOptions,
    // graphileBuildOptions: {
    //   connectionFilterAllowNullInput: true,
    //   connectionFilterAllowEmptyObjectInput: true,
    //   connectionFilterRelations: true,
    //   pgArchivedColumnName: "deleted_at",
    //   pgArchivedColumnImpliesVisible: false,
    //   pgArchivedRelations: false,
    // },
    pgSettings: (req) => {
      const opts = {
        ...authenticationPgSettings(req),
      };
      return opts;
    },
  });
};

export default postgraphileMiddleware;
