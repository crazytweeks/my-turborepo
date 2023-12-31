/** @type {import('next').NextConfig} */
module.exports = {  
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  transpilePackages: [
    '@repo/shared/{{member}}',
    '@repo/shared/src',
    '@repo/api/types'
  ],
    experimental: {
    typedRoutes: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: undefined,
        pathname: "/random",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: undefined,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "purecatamphetamine.github.io",
        port: undefined,
        pathname: "/**",
      },
    ],
  },
};
