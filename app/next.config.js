import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import dotenv from "dotenv";
dotenv.config();

export function webpack(config, { isServer }) {
  if (!isServer) {
    config.resolve.fallback.fs = false;
  }
  config.plugins = [...config.plugins, new CaseSensitivePathsPlugin()];
  return config;
}
export const publicRuntimeConfig = {
  ORIGIN: process.env.ORIGIN
};
