/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tordar.no' }],
        destination: 'https://tordar.no/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tordar.no' }],
        missing: [{ type: 'header', key: 'x-forwarded-proto', value: 'https' }],
        destination: 'https://tordar.no/:path*',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig; 