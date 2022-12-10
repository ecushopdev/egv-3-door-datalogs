const { redirect } = require('next/dist/server/api-utils')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  async redirect() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      }
    ]
  },
  nextConfig
}

