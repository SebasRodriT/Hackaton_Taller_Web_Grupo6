import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acceder al HMR desde hosts en LAN durante desarrollo
  allowedDevOrigins: [
    "192.168.79.1",
    "192.168.79.1:3000",
    "http://192.168.79.1:3000",
    "192.168.79.1:3001",
    "http://192.168.79.1:3001",
    "localhost",
    "localhost:3000",
    "http://localhost:3000",
    "localhost:3001",
    "http://localhost:3001",
    "127.0.0.1",
    "127.0.0.1:3000",
    "http://127.0.0.1:3000",
    "127.0.0.1:3001",
    "http://127.0.0.1:3001",
  ],
};

export default nextConfig;
