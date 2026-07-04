import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "m.dirbal.ly" },
      { hostname: "dashboard.alolya.gov.ly" },
      { hostname: "images.unsplash.com" },
      { hostname: "www.pokemon.com" },
      { hostname: "flagcdn.com" },
    ],
  },
};

export default nextConfig;
