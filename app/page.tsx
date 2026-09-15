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
import { aiTools, featuredAiTools } from '@/components/data';
import { listPublishedPosts } from '@/lib/blogs';

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

export default async function Home() {
  const publishedPosts = await listPublishedPosts();
  const featuredPost = publishedPosts.find(post => post.featured) || publishedPosts[0];
  const otherPosts = publishedPosts.filter(post => post.slug !== featuredPost?.slug).slice(0, 3);

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

        <div className="hero-split" aria-label="Workshop photo alongside the Nudgeable AI Academy">
          <div className="hero-split-photo">
            <Image src="/assets/hero-practice-lab.jpg" alt="Facilitator presenting AI tools alongside the Nudgeable AI Academy" width={1024} height={768} priority />
          </div>
          <div className="hero-split-card">
            <div className="hero-split-card-top">
              <span className="hero-split-card-label">Nudgeable AI Academy</span>
              <span className="hero-split-card-live"><i /> Kept current</span>
            </div>
            <h2>Keep building AI capability after the workshop.</h2>
            <p>Practical guidance your team can return to as their work&mdash;and the tools&mdash;change.</p>
            <ul className="hero-split-card-list">
              <li><span className="hero-split-card-icon"><Icon name="book" size={14} /></span>Practical workflows and guides</li>
              <li><span className="hero-split-card-icon"><Icon name="spark" size={14} /></span>AI tool updates every week</li>
              <li><span className="hero-split-card-icon"><Icon name="check" size={14} /></span>Guidance that stays current</li>
            </ul>
            <a className="hero-split-card-link" href="/ai-academy/index.html">See how learning continues <Icon name="arrow" size={14} /></a>
          </div>
        </div>
      </div>
    </section>

    <div className="container"><LogoStrip /></div>

    <section id="training" className="training-proof-section">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow">CORPORATE AI WORKSHOPS</span>
          <h2>Hands-on AI training built around real work.</h2>
          <p>Six tracks. A program usually draws on three or four of them, chosen after we see how the team works.</p>
        </div>

        <div className="card-grid topic-grid">
          <div className="info-card"><div className="icon-box"><Icon name="spark" size={22} /></div><span className="info-card-track">Track 01</span><h3>How GenAI Works</h3><p>Models, context, hallucinations, research modes and why the quality of AI output changes.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="calendar" size={22} /></div><span className="info-card-track">Track 02</span><h3>AI for Everyday Work</h3><p>Research, writing, meetings, presentations and workflows connected to participants&rsquo; roles.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="chart" size={22} /></div><span className="info-card-track">Track 03</span><h3>Data, Dashboards and Design</h3><p>Analyse files, identify insights, create charts and turn findings into clear visual outputs.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="workflow" size={22} /></div><span className="info-card-track">Track 04</span><h3>Workflow Automation</h3><p>Connect steps, tools and information to reduce repetitive work and manual handovers.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="people" size={22} /></div><span className="info-card-track">Track 05</span><h3>Building AI Agents</h3><p>Understand agent systems and build practical agents using no-code or coding tools.</p></div>
          <div className="info-card"><div className="icon-box"><Icon name="shield" size={22} /></div><span className="info-card-track">Track 06</span><h3>Governance and Data Security</h3><p>Protect company information, verify output and manage permissions, copyright and human review.</p></div>
        </div>

        <div className="format-bar">
          <div><strong>Designed around your team</strong><p>Half-day Masterclass &middot; One-day Workshop &middot; Multi-session Program &middot; Leadership Session</p></div>
          <a className="button button-primary button-compact" href="#contact">Discuss a Program <Icon name="arrow" size={17} /></a>
        </div>
      </div>
    </section>

    <section id="method" className="method-section">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow">HOW A PROGRAM GETS BUILT</span>
          <h2>Every team ends up somewhere different.<br />The way we get there is the same.</h2>
          <p>Nothing here is a fixed curriculum. This is the sequence we run with every client, from a 40-person function to a leadership group of eight.</p>
        </div>
        <div className="method-steps">
          <div className="method-step">
            <span className="method-step-n">STEP 01</span>
            <span className="method-step-e" aria-hidden="true">🔍</span>
            <h3>We look at your work</h3>
            <p>We meet your team lead and a few people who do the job. We check how much AI they already use, what you expect AI to change, and which chatbots and tools you are licensed for.</p>
          </div>
          <div className="method-step">
            <span className="method-step-n">STEP 02</span>
            <span className="method-step-e" aria-hidden="true">🛠️</span>
            <h3>Your people learn by doing</h3>
            <p>The workshop runs on your live tasks, not on sample data. Everyone practises in the room, with help when something does not behave.</p>
          </div>
          <div className="method-step">
            <span className="method-step-n">STEP 03</span>
            <span className="method-step-e" aria-hidden="true">🔄</span>
            <h3>We come back every month</h3>
            <p>AI changes every month, so we do too. We share what is new and fix the real problems your team hit when they tried to automate their own work.</p>
          </div>
          <div className="method-step">
            <span className="method-step-n">STEP 04</span>
            <span className="method-step-e" aria-hidden="true">📚</span>
            <h3>AI Academy keeps it going</h3>
            <p>Everyone keeps access after the program ends. The guides stay current as the tools change, so learning does not stop at the workshop.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="proof-section">
      <div className="container">

        <div className="section-intro">
          <span className="eyebrow">TRACK RECORD</span>
          <h2 className="proof-title">Built across functions, levels and industries.</h2>
        </div>
        <div className="proof-band">
          <div className="proof-item"><AnimatedStat value={45} suffix="+" /><b>Corporate cohorts</b><span>Customized AI programs</span></div>
          <div className="proof-item"><AnimatedStat value={2500} suffix="+" /><b>Professionals trained</b><span>From employees to senior leaders</span></div>
          <div className="proof-item"><AnimatedStat value={10} suffix="+" /><b>Business functions</b><span>HR, Finance, Sales, Marketing and more</span></div>
          <div className="proof-item"><AnimatedStat value={8} /><b>Industries</b><span>Pharma, retail, finance, manufacturing and more</span></div>
        </div>

        <SessionPhotoRow />
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

    <AcademyPromo featuredPost={featuredPost} otherPosts={otherPosts} />

    <section id="contact" className="contact-home-section">
      <div className="container contact-home-grid">
        <div className="contact-copy"><span className="eyebrow">Contact</span><h2>What should employees do better with AI?</h2><p>Share the audience, tools available and workplace outcomes that matter. The program can be designed around those realities.</p></div>
        <div className="contact-card"><ContactForm compact /></div>
      </div>
    </section>
  </>;
}
