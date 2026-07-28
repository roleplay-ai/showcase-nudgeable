export type ClientLogo = {
  name: string;
  src: string;
};

export const clientLogos: ClientLogo[] = [
  { name: 'Flipkart', src: '/logos/flipkart.png' },
  { name: 'Myntra', src: '/logos/myntra-verified.svg' },
  { name: 'Atomberg', src: '/logos/atomberg.png' },
  { name: 'Roche', src: '/logos/roche-verified.svg' },
  { name: 'Genentech', src: '/logos/genentech-verified.svg' },
  { name: 'Cimpress', src: '/logos/cimpress-verified.svg' },
  { name: 'IQVIA', src: '/logos/iqvia-verified.svg' },
  { name: 'Lactalis', src: '/logos/lactalis.png' },
  { name: 'L&T Finance', src: '/logos/lt-finance.png' },
  { name: 'Cosmos Films', src: '/logos/cosmos-films-verified.webp' },
  { name: 'MullenLowe Lintas Group', src: '/logos/mllg.png' },
  { name: 'Philip Morris International', src: '/logos/ipm.png' },
  { name: 'Boehringer Ingelheim', src: '/logos/boehringer-ingelheim-verified.svg' }
];

export type SessionPhoto = {
  alt: string;
  src: string;
};

export const sessionPhotos: SessionPhoto[] = [
  { alt: 'AI training session for fashion ecommerce teams', src: '/sessions/fashion-ecommerce.png' },
  { alt: 'AI training session for HR teams', src: '/sessions/hr-team.png' },
  { alt: 'AI training session for finance teams', src: '/sessions/finance-team.png' },
  { alt: 'AI training session for manufacturing teams', src: '/sessions/manufacturing-team.png' },
  { alt: 'AI training session for senior leadership', src: '/sessions/senior-leadership.png' },
  { alt: 'AI training session for customer experience teams', src: '/sessions/customer-experience.png' }
];

export type AiTool = {
  name: string;
  iconSrc?: string;
  mark?: string;
};

export const aiTools: AiTool[] = [
  { name: 'Claude', iconSrc: '/tool-icons/claude.png' },
  { name: 'Copilot', iconSrc: '/tool-icons/copilot.png' },
  { name: 'Gemini', iconSrc: '/tool-icons/gemini.png' },
  { name: 'ChatGPT', iconSrc: '/tool-icons/chatgpt.png' },
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

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: 'Our team went from using AI for basic emails to building their own workflows. The workshop was tailored to our industry and roles, not generic theory.',
    name: 'Mohan Monteiro',
    role: 'HR Head @ HOH',
    avatarSrc: '/testimonials/mohan-monteiro.png'
  },
  {
    quote: 'What surprised us was how practical it was. People were solving real work problems during the session itself. We saw adoption jump within weeks.',
    name: 'Garima Pant',
    role: 'CHRO @ MLLG',
    avatarSrc: '/testimonials/garima-pant.png'
  },
  {
    quote: 'The workshop simplified complex concepts and showcased practical tools that can power everyday work, from samples of prompt engineering to problem solving.',
    name: 'Shraddha Mudaliar',
    role: 'L&D @ Myntra',
    avatarSrc: '/testimonials/shraddha-mudaliar.png'
  }
];
