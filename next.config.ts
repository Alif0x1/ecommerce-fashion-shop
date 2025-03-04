/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // This allows all paths within the hostname
      },
       {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**', // This allows all paths within the hostname
      },
    ],
  },
}

module.exports = nextConfig