/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' }
    ]
  },
  async redirects() {
    return [
      { source: '/ai-coach', destination: '/ai-role-play', permanent: true },
      { source: '/ai-roleplays', destination: '/ai-role-play', permanent: true },
      { source: '/actions-engine', destination: '/nudgeengine', permanent: true },
      { source: '/nudge-engine', destination: '/nudgeengine', permanent: true },
      { source: '/videos', destination: '/insights', permanent: true },
      { source: '/ai-shorts', destination: '/insights', permanent: true },
      { source: '/practice-lab', destination: 'https://work.nudgeable.app/', permanent: true },
      { source: '/ai-training', destination: '/#training', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true }
    ];
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
      ]
    }];
  }
};

export default nextConfig;
