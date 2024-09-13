/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/url/:path*',
        destination: `https://assignment-todolist-api.vercel.app/api/:path*`,
        // permanent: true,
      },
    ]
  },

};

export default nextConfig;
