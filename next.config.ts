import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel Hobby membatasi optimasi gambar (error 402 saat kuota habis). Foto dilayani langsung.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zkotqpszynvfunhenysp.supabase.co",
      },
    ],
  },
};

export default nextConfig;
