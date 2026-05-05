import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foxivehwqliehofhwsrd.supabase.co",
      },
    ],
  },
  allowedDevOrigins: ["assessments-captured-profits-judge.trycloudflare.com"],
  reactCompiler: false,
};

export default nextConfig;
