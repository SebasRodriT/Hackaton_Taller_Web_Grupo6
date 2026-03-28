import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acceder al HMR desde hosts en LAN durante desarrollo
  allowedDevOrigins: ["192.168.79.1", "localhost", "127.0.0.1"],
  // Evita warnings cuando hay múltiples lockfiles en el workspace
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
