/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/8.x/notionists/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.111.191',
        port: '50075',
      },
    ],
  },
};

module.exports = nextConfig;
