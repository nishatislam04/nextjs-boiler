/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // Enable SWC-based minification
  reactStrictMode: false,
  experimental: {
    turbo: true, // Activates Turbo Mode
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Poll for changes every second
      aggregateTimeout: 300, // Delay rebuild after changes
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "xsgames.co",
        port: "",
        pathname: "/randomusers/avatar.php",
      },
    ],
  },
};

export default nextConfig;
