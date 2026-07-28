import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nudgeable',
    short_name: 'Nudgeable',
    description: 'Practical AI for Work training and products.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FEFCFA',
    theme_color: '#FFCE00',
    icons: [{ src: '/icon.png', sizes: '256x256', type: 'image/png' }]
  };
}
