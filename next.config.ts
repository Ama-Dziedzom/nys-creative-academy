import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The embedded local database ships WebAssembly that must load from node_modules, not a bundle.
  serverExternalPackages: ['@electric-sql/pglite'],
  // The site and the admin area have separate root layouts, so 404s use app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
