/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  images: {
    domains: [
      "backend",
      "localhost",
      "127.0.0.1",
      "telegram-dating.com",
      "e0b6f6c2-22bc-484f-ad97-2ec3367df512.selstorage.ru",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
