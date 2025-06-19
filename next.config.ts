import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'qxqnniejiuvuoqmdoyvz.supabase.co',
        port: '',
        pathname: '/storage/**'
      }
    ]
  }
};

export default nextConfig;
