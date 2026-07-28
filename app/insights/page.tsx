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
    type: 'website'
  }
};

export default function InsightsPage() {
  return <InsightsVideoLibrary />;
}
