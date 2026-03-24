/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  env: {
    CUSTOM_KEY: 'CLOSYR_PRODUCTION',
  },
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
  swcMinify: true,
  // Ensure compatibility with Vercel
  output: 'standalone',
};

module.exports = nextConfig;