import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: []
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
