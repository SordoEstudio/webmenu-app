/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Eliminar console.log en producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'], // Mantener console.error incluso en producción
    } : false,
  },
};

module.exports = nextConfig;
