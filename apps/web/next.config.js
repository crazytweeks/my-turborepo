/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@repo/shared/{{member}}',
    '@repo/shared/src',
    '@repo/api/types'
  ],
};
