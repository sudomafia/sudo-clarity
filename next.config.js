/** @type {import('next').NextConfig} */
const nodeExternals = require('webpack-node-externals');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) return config;
    // Important: return the modified config
    return {
      ...config,
      externals: [nodeExternals()]
    }
  }
}

module.exports = nextConfig
