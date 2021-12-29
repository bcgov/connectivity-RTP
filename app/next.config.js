var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.plugins = [...config.plugins, new CaseSensitivePathsPlugin()];
    return config;
  },
};
