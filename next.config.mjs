/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'cdn.sanity.io',
      'lh3.googleusercontent.com',
      'cdn.discordapp.com',
      'e0.365dm.com',
      'images.unsplash.com',
    ],
  },
};

export default nextConfig;
