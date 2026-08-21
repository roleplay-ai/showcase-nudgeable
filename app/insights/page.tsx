import type { Metadata } from 'next';
import { InsightsVideoLibrary } from '@/components/InsightsVideoLibrary';

export const metadata: Metadata = {
  title: 'AI Insights and Workflows',
  description: 'Short AI for Work videos and step-by-step workflow explainers for Claude, Copilot, Gemini, ChatGPT and AI agents.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'AI Insights and Workflows',
    description: 'Short AI for Work videos and step-by-step workflow explainers.',
    url: '/insights',
    type: 'website',
    images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Insights and Workflows',
    description: 'Short AI for Work videos and step-by-step workflow explainers.',
    images: ['/assets/og-default.png']
  }
};

export default function InsightsPage() {
  return <InsightsVideoLibrary />;
}
