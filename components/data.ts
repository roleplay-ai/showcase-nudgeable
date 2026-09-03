export type ClientLogo = {
  name: string;
  src: string;
  size?: 'smaller' | 'small' | 'medium' | 'large' | 'larger';
};

export const clientLogos: ClientLogo[] = [
  { name: 'Flipkart', src: '/logos/flipkart.png', size: 'large' },
  { name: 'Myntra', src: '/logos/myntra-verified.svg', size: 'small' },
  { name: 'Atomberg', src: '/logos/atomberg.png', size: 'large' },
  { name: 'Roche', src: '/logos/roche-verified.svg', size: 'smaller' },
  { name: 'Genentech', src: '/logos/genentech-verified.svg', size: 'small' },
  { name: 'Cimpress', src: '/logos/cimpress-verified.svg', size: 'smaller' },
  { name: 'IQVIA', src: '/logos/iqvia-verified.svg', size: 'smaller' },
  { name: 'Lactalis', src: '/logos/lactalis.png', size: 'small' },
  { name: 'L&T Finance', src: '/logos/lt-finance.png', size: 'larger' },
  { name: 'Cosmos Films', src: '/logos/cosmos-films-verified.webp', size: 'smaller' },
  { name: 'MullenLowe Lintas Group', src: '/logos/mllg.png', size: 'small' },
  { name: 'Philip Morris International', src: '/logos/ipm.png', size: 'large' },
  { name: 'Boehringer Ingelheim', src: '/logos/boehringer-ingelheim-verified.svg', size: 'smaller' },
  { name: 'Amherst', src: '/logos/amherst.webp', size: 'large' },
  { name: 'Reliance Retail', src: '/logos/reliance-retail.png', size: 'large' }
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
  { name: 'ChatGPT', iconSrc: '/tool-icons/chatgpt.png' }
];

/** Featured stack tools shown on the Practice Lab login marquee. */
export const featuredAiTools: AiTool[] = [
  { name: 'Botpress', iconSrc: '/tool-icons/botpress.png' },
  { name: 'Chatbase', iconSrc: '/tool-icons/chatbase.png' },
  { name: 'Codex', iconSrc: '/tool-icons/codex.png' },
  { name: 'ElevenLabs', iconSrc: '/tool-icons/elevenlabs.jpeg' },
  { name: 'Gamma AI', iconSrc: '/tool-icons/gamma-ai.png' },
  { name: 'Google AI Studio', iconSrc: '/tool-icons/google-ai-studio.png' },
  { name: 'Google Work Studio', iconSrc: '/tool-icons/google-work-studio.png' },
  { name: 'Heygen', iconSrc: '/tool-icons/heygen.png' },
  { name: 'Kling AI', iconSrc: '/tool-icons/kling-ai.png' },
  { name: 'LM Studio', iconSrc: '/tool-icons/lm-studio.png' },
  { name: 'Lovable', iconSrc: '/tool-icons/lovable.png' },
  { name: 'Napkin AI', iconSrc: '/tool-icons/napkin-ai.png' },
  { name: 'Notebook LM', iconSrc: '/tool-icons/notebook-lm.jpeg' },
  { name: 'Notion', iconSrc: '/tool-icons/notion.png' },
  { name: 'Perplexity', iconSrc: '/tool-icons/perplexity.jpeg' },
  { name: 'Shortcut AI', iconSrc: '/tool-icons/shortcut-ai.png' },
  { name: 'Vapi', iconSrc: '/tool-icons/vapi.png' },
  { name: 'VoiceFlow', iconSrc: '/tool-icons/voiceflow.jpeg' },
  { name: 'Wispr Flow', iconSrc: '/tool-icons/wispr-flow.png' }
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
