import type { Metadata } from 'next';
import Image from 'next/image';
import { AcademyPromo } from '@/components/AcademyPromo';
import { AnimatedStat } from '@/components/AnimatedStat';
import { ButtonLink } from '@/components/ButtonLink';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { LogoStrip } from '@/components/LogoStrip';
import { ProductDemoLink } from '@/components/ProductDemoLink';
import { SessionPhotoRow } from '@/components/SessionPhotoRow';
import { TestimonialGrid } from '@/components/TestimonialGrid';
import { YouTubeGrid } from '@/components/YouTubeGrid';
import { LabWorkflowCards } from '@/components/LabWorkflowCards';
import { WorkflowVideoGrid } from '@/components/WorkflowVideoGrid';
import { aiTools, featuredAiTools } from '@/components/data';

const PRACTICE_LAB_DEMO_URL = process.env.NEXT_PUBLIC_PRACTICE_LAB_DEMO_URL || 'https://youtu.be/OJADHikd8BM?si=koQJaqmdxLmjXFnO';
const AI_COACH_DEMO_URL = process.env.NEXT_PUBLIC_AI_COACH_DEMO_URL || 'https://youtu.be/mBlYRcCmp_s?si=XiovLO33ovNB0Upz';
const ACTIONS_ENGINE_DEMO_URL = process.env.NEXT_PUBLIC_ACTIONS_ENGINE_DEMO_URL || 'https://youtu.be/uOwDFQIvd4Q?si=DXfNYOojFOqjkf-F';

function getYouTubeVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '');
    return url.searchParams.get('v') || url.pathname.split('/embed/')[1] || '';
  } catch {
    return '';
  }
}

const practiceLabDemoId = getYouTubeVideoId(PRACTICE_LAB_DEMO_URL) || 'OJADHikd8BM';
const aiCoachDemoId = getYouTubeVideoId(AI_COACH_DEMO_URL) || 'mBlYRcCmp_s';
const actionsEngineDemoId = getYouTubeVideoId(ACTIONS_ENGINE_DEMO_URL) || 'uOwDFQIvd4Q';


export const metadata: Metadata = {
  title: 'Practical AI for Work',
  description: 'Hands-on corporate AI training for non-technical employees, supported by AI Practice Lab workflows, AI Coach roleplays and the Actions Engine.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Nudgeable | Practical AI for Work',
    description: 'Hands-on corporate AI training and practical workplace AI products.',
    url: '/',
    type: 'website'
  }
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai';

const servicesStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'AI Practice Lab',
      url: 'https://work.nudgeable.app/',
      description: 'Free AI for Work workflows and current content, with enterprise customization and reporting.',
      provider: { '@id': `${siteUrl}/#organization` }
    },
    {
      '@type': 'Service',
      name: 'AI Coach',
      url: `${siteUrl}/ai-role-play`,
      description: 'Voice-based practice for sales and leadership conversations with objective, conversation-linked feedback.',
      provider: { '@id': `${siteUrl}/#organization` }
    },
    {
      '@type': 'Service',
      name: 'Actions Engine',
      url: `${siteUrl}/nudgeengine`,
      description: 'Personalized actions, workplace nudges and application data after classroom training.',
      provider: { '@id': `${siteUrl}/#organization` }
    },
    {
      '@type': 'Service',
      name: 'Nudgeable AI Academy',
      url: `${siteUrl}/ai-academy/index.html`,
      description: 'Free, always-current feature guides for ChatGPT, Claude, Gemini and Copilot, plus the AI foundations behind them.',
      provider: { '@id': `${siteUrl}/#organization` }
    }
  ]
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }} />
    <section className="home-hero home-hero-new">
      <div className="container home-hero-grid home-hero-grid-new">
        <div className="home-hero-copy">
          <span className="eyebrow">AI for Work for Corporate Teams</span>
          <h1>Build practical AI capability that lasts.</h1>
          <p>Hands-on workshops help employees use AI on real work. The Nudgeable AI Academy gives them practical workflows, clear explainers and weekly updates as the tools change.</p>
          <div className="button-row hero-actions">
            <a className="button button-primary button-compact" href="#training">Explore the Workshops <Icon name="arrow" size={17} /></a>
            <a className="button button-secondary button-compact" href="/ai-academy/index.html">See the AI Academy <Icon name="arrow" size={17} /></a>
          </div>
        </div>

        <div className="home-hero-product-image hero-visual" aria-label="AI Practice Lab preview">
          <Image src="/assets/hero-practice-lab.jpg" alt="Facilitator presenting AI tools alongside the Nudgeable AI Academy" width={1024} height={768} priority />
          <a className="hero-note-card" href="/ai-academy/index.html">
            <div><strong>Workshop + Nudgeable AI Academy</strong><br /><span>Hands-on learning supported by workflows, guides and weekly updates.</span></div>
            <strong>Explore <Icon name="arrow" size={15} /></strong>
          </a>
        </div>
      </div>
    </section>

    <div className="container"><LogoStrip /></div>

    <section id="training" className="training-proof-section">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow">CORPORATE AI WORKSHOPS</span>
          <h2>Hands-on AI training built around real work.</h2>
          <p>Employees practise with realistic activities from their own functions. The agenda is customized around their roles, available AI tools and business priorities.</p>
        </div>

        <div className="card-grid topic-grid">
          <div className="info-card"><div className="icon-box"><Icon name="spark" size={22} /></div><h3>How GenAI Works</h3><p>Models, context, hallucinations, research modes and why the quality of AI output changes.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="calendar" size={22} /></div><h3>AI for Everyday Work</h3><p>Research, writing, meetings, presentations and workflows connected to participants&rsquo; roles.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="chart" size={22} /></div><h3>Data, Dashboards and Design</h3><p>Analyse files, identify insights, create charts and turn findings into clear visual outputs.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="workflow" size={22} /></div><h3>Workflow Automation</h3><p>Connect steps, tools and information to reduce repetitive work and manual handovers.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="people" size={22} /></div><h3>Building AI Agents</h3><p>Understand agent systems and build practical agents using no-code or coding tools.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="shield" size={22} /></div><h3>Governance and Data Security</h3><p>Protect company information, verify output and manage permissions, copyright and human review.</p></div>
        </div>

        <div className="format-bar">
          <div><strong>Designed around your team</strong><p>Half-day Masterclass &middot; One-day Workshop &middot; Multi-session Program &middot; Leadership Session</p></div>
          <a className="button button-primary button-compact" href="#contact">Discuss a Program <Icon name="arrow" size={17} /></a>
        </div>

        <h3 className="proof-title">Built across functions, levels and industries.</h3>
        <div className="proof-band">
          <div className="proof-item"><AnimatedStat value={45} suffix="+" /><b>Corporate cohorts</b><span>Customized AI programs</span></div>
          <div className="proof-item"><AnimatedStat value={2500} suffix="+" /><b>Professionals trained</b><span>From employees to senior leaders</span></div>
          <div className="proof-item"><AnimatedStat value={10} suffix="+" /><b>Business functions</b><span>HR, Finance, Sales, Marketing and more</span></div>
          <div className="proof-item"><AnimatedStat value={8} /><b>Industries</b><span>Pharma, retail, finance, manufacturing and more</span></div>
        </div>

        <SessionPhotoRow />
      </div>
    </section>
    <AcademyPromo />



    <section className="shorts-section">
      <div className="container">
        <div className="shorts-heading-row">
          <div className="section-intro">
            <span className="eyebrow">WATCH</span>
            <h2>Short videos on AI changes that affect work.</h2>
            <p>New videos are added every week, focused on what changes for employees and organizations.</p>
          </div>
          <div className="button-row"><ButtonLink href="/insights#shorts" variant="secondary">See all videos</ButtonLink><a className="button button-dark button-compact" href="https://www.youtube.com/playlist?list=PLX2kcOVk5064" target="_blank" rel="noopener noreferrer">Subscribe on YouTube <Icon name="arrow" size={17} /></a></div>
        </div>
        <YouTubeGrid limit={4} />
      </div>
    </section>

    <section className="workflow-video-section">
      <div className="container">
        <div className="workflow-video-header"><div><span className="eyebrow">WORKFLOW EXPLAINERS</span><h2>See how the work gets done.</h2></div><a href="/insights#workflows">Explore more workflows <Icon name="arrow" size={15} /></a></div>
        <WorkflowVideoGrid limit={3} />
      </div>
    </section>



    <section className="testimonial-section">
      <div className="container">
        <div className="section-intro"><span className="eyebrow">CLIENT FEEDBACK</span><h2>What clients say about the experience.</h2></div>

        <TestimonialGrid />
      </div>
    </section>

    <section id="about" className="founder-section">
      <div className="container founder-panel">
        <div className="founder-photo"><Image src="/brand/gaurav-patel.webp" alt="Gaurav Patel, founder and facilitator at Nudgeable" width={900} height={1080} sizes="(max-width: 860px) 100vw, 34vw" /></div>
        <div className="founder-copy">
          <span className="eyebrow">Founder and Facilitator</span>
          <h2>AI for Work, grounded in corporate reality.</h2>
          <p>Gaurav Patel designs practical AI training across industries and business functions. Each session is customized around how participants actually work, the tools they use and the outcomes they need.</p>
          <p>The training draws on daily use of leading AI tools and first-hand experience building the Practice Lab, AI Coach and Actions Engine. This brings real product development and implementation knowledge into every session.</p>
          <div className="founder-points"><span>45+ corporate cohorts</span><span>2,500+ professionals trained</span><span>B.E. in IT and MBA from XLRI</span><span>15+ years across India, Singapore and London</span></div>
          <a className="button button-ghost-dark" href="https://www.linkedin.com/in/gauravpatel25/ai" target="_blank" rel="noopener noreferrer">More about Gaurav <Icon name="arrow" size={17} /></a>
        </div>
      </div>
    </section>

    <section id="contact" className="contact-home-section">
      <div className="container contact-home-grid">
        <div className="contact-copy"><span className="eyebrow">Contact</span><h2>What should employees do better with AI?</h2><p>Share the audience, tools available and workplace outcomes that matter. The program can be designed around those realities.</p></div>
        <div className="contact-card"><ContactForm compact /></div>
      </div>
    </section>
  </>;
}
