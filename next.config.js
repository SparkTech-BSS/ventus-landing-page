/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "images.unsplash.com", "geeksaw.com.br"],
  },
};

module.exports = nextConfig;
