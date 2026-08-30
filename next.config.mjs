/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      { pathname: '/**' }
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: '*.supabase.co' }
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
      { source: '/blogs', destination: '/insights/blogs', permanent: true },
      { source: '/blog', destination: '/insights/blogs', permanent: true },
      { source: '/insights/how-ritz-carlton-hardwired-customer-centricity', destination: '/insights/blogs/how-ritz-carlton-turns-customer-centricity-into-everyday-actions', permanent: true },
      { source: '/insights/the-need-for-freedom-in-the-workplace', destination: '/insights/blogs/why-telling-people-what-to-do-can-make-them-resist', permanent: true },
      { source: '/practice-lab', destination: 'https://work.nudgeable.app/', permanent: true },
      { source: '/ai-practice-lab', destination: 'https://work.nudgeable.app/', permanent: true },
      { source: '/ai-academy', destination: '/ai-academy/index.html', permanent: false },
      { source: '/ai-academy/', destination: '/ai-academy/index.html', permanent: false },
      { source: '/ai-training', destination: '/#training', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      // Retired Wix/legacy URLs → homepage
      { source: '/usecases', destination: '/', permanent: true },
      { source: '/training', destination: '/', permanent: true },
      { source: '/ai-mastery-course', destination: '/', permanent: true },
      { source: '/insights/7-powerful-levers-for-driving-culture-change-in-an-organization', destination: '/', permanent: true },
      { source: '/insights/how-nudgeable-ai-roleplays-work', destination: '/', permanent: true },
      { source: '/insights/the-role-of-self-identity-in-goal-setting', destination: '/', permanent: true },
      { source: '/insights/-are-all-ai-chatbots-starting-to-feel-the-same', destination: '/', permanent: true },
      { source: '/insights/-are-all-ai-chatbots-starting-to-feel-the-same%3F', destination: '/', permanent: true },
      { source: '/insights/the-psychological-forces-behind-digital-presenteeism', destination: '/', permanent: true },
      { source: '/insights/the-impact-of-ai-on-our-self-perception', destination: '/', permanent: true },
      { source: '/insights/comparison-of-feedback-frameworks', destination: '/', permanent: true },
      { source: '/insights/comparison-of-feedback-frameworks%C2%A0', destination: '/', permanent: true },
      { source: '/insights/similaritybiastobuildtrust', destination: '/', permanent: true },
      { source: '/insights/when-incentives-backfire', destination: '/', permanent: true },
      { source: '/insights/the-science-of-unpredictable-rewards', destination: '/', permanent: true }
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
