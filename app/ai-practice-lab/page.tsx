import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { PracticeLabCapability } from '@/components/PracticeLabCapability';
import { PracticeLabHero } from '@/components/PracticeLabHero';
import { PracticeLabJourney } from '@/components/PracticeLabJourney';
import { PracticeLabWorkflows } from '@/components/PracticeLabWorkflows';
import { SectionHeader } from '@/components/SectionHeader';

const PRACTICE_LAB_URL = 'https://work.nudgeable.app/';
const PRACTICE_LAB_DEMO_URL = process.env.NEXT_PUBLIC_PRACTICE_LAB_DEMO_URL || 'https://youtu.be/OJADHikd8BM?si=koQJaqmdxLmjXFnO';

function getYouTubeVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '');
    return url.searchParams.get('v') || url.pathname.split('/embed/')[1] || '';
  } catch {
    return '';
  }
}

const demoVideoId = getYouTubeVideoId(PRACTICE_LAB_DEMO_URL) || 'OJADHikd8BM';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai';

export const metadata: Metadata = {
  title: 'AI Practice Lab',
  description: 'Nudgeable AI Practice Lab helps enterprise teams continue practising, applying and staying current with AI after training.',
  alternates: { canonical: '/ai-practice-lab' },
  openGraph: {
    title: 'AI Practice Lab | Nudgeable',
    description: 'Nudgeable AI Practice Lab helps enterprise teams continue practising, applying and staying current with AI after training.',
    url: '/ai-practice-lab',
    type: 'website'
  }
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Practice Lab',
  url: PRACTICE_LAB_URL,
  description: 'Free AI for Work workflows and current content, with enterprise customization and reporting.',
  provider: { '@id': `${siteUrl}/#organization` }
};

const problems = [
  { icon: '↻', title: 'AI keeps changing', copy: 'New models and features arrive faster than the training calendar can keep up.' },
  { icon: '✓', title: 'Application is harder', copy: 'Employees need practical ways to use AI on the work already in front of them.' },
  { icon: '?', title: 'Too many tools', copy: 'People need help deciding what to use, when to use it, and where each tool is stronger.' }
];

export default function AiPracticeLabPage() {
  return <div className="pl-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

    <header className="pl-hero">
      <div className="container pl-hero-grid">
        <div className="pl-hero-copy">
          <span className="eyebrow">AI for work for corporate teams</span>
          <h1>AI capability, built through continued practice.</h1>
          <p className="lead">AI changes every week. The Practice Lab helps employees keep learning, applying and staying current after the workshop, with practical workflows and guidance in one place.</p>
          <div className="button-row pl-hero-actions">
            <a className="button button-primary" href={PRACTICE_LAB_URL} target="_blank" rel="noopener noreferrer">Explore Practice Lab <Icon name="arrow" size={17} /></a>
            <a className="button button-secondary" href="#demo">Watch the demo <Icon name="play" size={17} /></a>
          </div>
          <div className="pl-tool-pills" aria-label="Supported enterprise AI tools">
            <span className="pl-tool-pill"><span className="pl-tool-dot claude">C</span>Claude</span>
            <span className="pl-tool-pill"><span className="pl-tool-dot copilot">Co</span>Copilot</span>
            <span className="pl-tool-pill"><span className="pl-tool-dot gemini">G</span>Gemini</span>
            <span className="pl-tool-pill"><span className="pl-tool-dot chatgpt">AI</span>ChatGPT</span>
          </div>
        </div>

        <PracticeLabHero />
      </div>
    </header>

    <section id="demo" className="pl-demo-section">
      <div className="container pl-demo-grid">
        <div className="pl-demo-copy">
          <span className="eyebrow">See it in action</span>
          <h2>See the Practice Lab in two minutes.</h2>
          <p>See how employees explore AI tools, practise with guided workflows built around real work, and stay current after training ends.</p>
          <div className="pl-demo-points">
            <div className="pl-demo-point"><b>1</b><span>See how employees explore AI tools and concepts.</span></div>
            <div className="pl-demo-point"><b>2</b><span>See practical workflows built around real work.</span></div>
            <div className="pl-demo-point"><b>3</b><span>See how the Lab keeps users current after training.</span></div>
          </div>
        </div>
        <div className="pl-video-shell">
          <div className="pl-video-frame">
            <iframe src={`https://www.youtube-nocookie.com/embed/${demoVideoId}?rel=0`} title="AI Practice Lab Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
      </div>
    </section>

    <section id="why">
      <div className="container">
        <SectionHeader eyebrow="Why it exists" title="One-time training leaves three practical gaps." />
        <div className="pl-problem-grid">
          {problems.map(item => <article className="pl-problem-card" key={item.title}>
            <div className="pl-problem-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="how" className="pl-journey-section">
      <div className="container">
        <SectionHeader eyebrow="How the Practice Lab helps" title="Learn. Apply. Stay current." copy="Click each step to see how the experience changes." />
        <PracticeLabJourney />
      </div>
    </section>

    <section id="workflows" className="pl-workflow-section">
      <div className="container">
        <PracticeLabWorkflows />
      </div>
    </section>

    <section id="capability" className="pl-capability-section">
      <div className="container">
        <div className="pl-capability-head">
          <SectionHeader eyebrow="Measure capability" title="See how AI capability is building across the organization." />
          <p className="pl-capability-note">Move beyond attendance. Track continued practice, capability by skill area, and participation across teams as employees use the Practice Lab.</p>
        </div>
        <PracticeLabCapability />
      </div>
    </section>

    <section className="pl-cta-section">
      <div className="container pl-cta-grid">
        <div>
          <span className="eyebrow light">For enterprise teams</span>
          <h2>Training starts the capability. Practice keeps it growing.</h2>
          <p>Give employees one place to keep practising, applying and staying current as AI changes.</p>
          <div className="button-row">
            <a className="button button-primary" href={PRACTICE_LAB_URL} target="_blank" rel="noopener noreferrer">Explore Practice Lab <Icon name="arrow" size={17} /></a>
            <a className="button button-ghost-dark" href="mailto:team@nudgeable.ai">Talk to us</a>
          </div>
        </div>
        <aside className="pl-cta-box">
          <strong>Enterprise options</strong>
          <div className="pl-cta-item">Company and role-specific workflows</div>
          <div className="pl-cta-item">Curated capability journeys</div>
          <div className="pl-cta-item">Engagement and progress visibility</div>
        </aside>
      </div>
    </section>
  </div>;
}
