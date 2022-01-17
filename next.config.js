// next.config.js
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  env: {
    HOST: process.env.HOST,
  },
  trailingSlash: true,
  future: {
    webpack5: true,
  },
};

module.exports = withPlugins([withImages, nextConfig]);
