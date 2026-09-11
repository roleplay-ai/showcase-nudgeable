import type { Metadata } from 'next';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Site analytics',
  robots: { index: false, follow: false }
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
