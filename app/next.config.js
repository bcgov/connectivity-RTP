var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const dotenv = require('dotenv').config();


module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.plugins = [...config.plugins, new CaseSensitivePathsPlugin()];
    return config;
  },
  publicRuntimeConfig: {
    ORIGIN: process.env.ORIGIN,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS,
  }
};
