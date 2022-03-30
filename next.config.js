/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    console.log(config.plugins)
    // Important: return the modified config
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
      ]
    }
  }
}

module.exports = nextConfig
