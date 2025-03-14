/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tordar.no' }],
        destination: 'https://tordar.no/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 