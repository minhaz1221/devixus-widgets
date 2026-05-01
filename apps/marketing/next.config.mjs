/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@devixus/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
