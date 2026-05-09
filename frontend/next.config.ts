import type { NextConfig } from "next";

/**
 * Local dev: browser calls same-origin `/api/*`; Next rewrites to uvicorn on :8000.
 * Vercel: `VERCEL=1` is set — skip rewrites so the platform routes `/api` to Python.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.VERCEL) return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
