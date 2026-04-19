import type { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    appDir: true,
    runtime: 'nodejs',
    serverComponents: true,
    concurrentFeatures: true,
    output: 'standalone',
  },
};

export default config;