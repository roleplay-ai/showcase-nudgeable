export type ClientLogo = {
  name: string;
  src: string;
};

export const clientLogos: ClientLogo[] = [
  { name: 'Flipkart', src: '/logos/flipkart-verified.png' },
  { name: 'Myntra', src: '/logos/myntra-verified.svg' },
  { name: 'Roche', src: '/logos/roche-verified.svg' },
  { name: 'Genentech', src: '/logos/genentech-verified.svg' },
  { name: 'Cimpress', src: '/logos/cimpress-verified.svg' },
  { name: 'IQVIA', src: '/logos/iqvia-verified.svg' },
  { name: 'L&T Finance', src: '/logos/lt-finance-verified.png' },
  { name: 'Cosmos Films', src: '/logos/cosmos-films-verified.webp' },
  { name: 'MullenLowe Lintas Group', src: '/logos/mllg-verified.png' },
  { name: 'Philip Morris International', src: '/logos/ipm-verified.svg' },
  { name: 'Boehringer Ingelheim', src: '/logos/boehringer-ingelheim-verified.svg' }
];

export type SessionPhoto = {
  alt: string;
  src: string;
};

export const sessionPhotos: SessionPhoto[] = [
  { alt: 'AI training session for fashion ecommerce teams', src: '/sessions/fashion-ecommerce.png' },
  { alt: 'AI training session for finance teams', src: '/sessions/finance-team.png' },
  { alt: 'AI training session for senior leadership', src: '/sessions/senior-leadership.png' },
  { alt: 'AI training session for customer experience teams', src: '/sessions/customer-experience.png' }
];

export const aiTools = [
  { name: 'Claude', mark: '✦' },
  { name: 'Copilot', mark: '◇' },
  { name: 'Gemini', mark: '✧' },
  { name: 'ChatGPT', mark: '◉' },
  { name: 'AI Agents', mark: '↗' }
];

export const fallbackVideos = [
  {
    id: 'video-1',
    title: 'Why using AI in Hindi can cost you more?',
    category: 'AI for Work',
    duration: '1:47',
    thumbnail: '/shorts/short-1.jpg'
  },
  {
    id: 'video-2',
    title: 'I tested Claude, ChatGPT and Gemini to send emails automatically',
    category: 'AI Workflows',
    duration: '2:17',
    thumbnail: '/shorts/short-2.jpg'
  },
  {
    id: 'video-3',
    title: 'I found a loophole in Amazon’s Rufus AI',
    category: 'AI Agents',
    duration: '1:52',
    thumbnail: '/shorts/short-3.jpg'
  },
  {
    id: 'video-4',
    title: 'Why does every major AI chatbot cost $20?',
    category: 'AI Explained',
    duration: '1:54',
    thumbnail: '/shorts/short-4.jpg'
  }
];

export const testimonials = [
  {
    quote: 'Add an approved client testimonial about the practical value of the AI for Work masterclass.',
    name: 'Client name',
    role: 'Role and organization'
  },
  {
    quote: 'Add an approved testimonial about how clearly the workshop connected AI tools to everyday work.',
    name: 'Client name',
    role: 'Role and organization'
  },
  {
    quote: 'Add an approved testimonial about continued practice, customized workflows or measurable adoption.',
    name: 'Client name',
    role: 'Role and organization'
  }
];
