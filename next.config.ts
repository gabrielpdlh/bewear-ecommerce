import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "d4lgxe9bm8juw.cloudfront.net",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
