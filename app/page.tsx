import type { Metadata } from 'next';
import Image from 'next/image';
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
    }
  ]
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }} />
    <section className="home-hero home-hero-new">
      <div className="container home-hero-grid home-hero-grid-new">
        <div className="home-hero-copy">
          <span className="hero-kicker">AI FOR WORK FOR CORPORATE TEAMS</span>
          <h1>
            <span className="hero-title-line">Enterprise AI</span>
            <span className="hero-title-line">adoption, built</span>
            <span className="hero-title-line">through practice.</span>
          </h1>
          <p>AI changes every week. Build lasting capability through hands-on training followed by continued practice with real business workflows in the AI Practice Lab.</p>
          <div className="button-row hero-actions">
            <a className="button button-primary button-compact" href="#training">Explore AI training <Icon name="arrow" size={17} /></a>
            <a className="button button-secondary button-compact" href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">Open AI Practice Lab <Icon name="arrow" size={17} /></a>
          </div>
          <div className="hero-tools">
            <div className="tool-row hero-tool-row">
              {aiTools.map(tool => <span className="tool-chip" key={tool.name}>
                <b>
                  {tool.iconSrc ? <Image src={tool.iconSrc} alt="" width={18} height={18} className="tool-chip-icon" unoptimized /> : tool.mark}
                </b>
                {tool.name}
              </span>)}
            </div>
            <div className="hero-tool-marquee" aria-label="More AI tools covered">
              <div className="hero-tool-marquee-track">
                {[...featuredAiTools, ...featuredAiTools].map((tool, index) => <span className="tool-chip" key={`${tool.name}-${index}`}>
                  <b>
                    {tool.iconSrc ? <Image src={tool.iconSrc} alt="" width={18} height={18} className="tool-chip-icon" unoptimized /> : tool.mark}
                  </b>
                  {tool.name}
                </span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="home-hero-product-image" aria-label="AI Practice Lab preview">
          <Image src="/assets/hero-practice-lab.jpg" alt="Facilitator presenting AI tools beside the AI Practice Lab interface with guided workflows" width={1024} height={768} priority />
        </div>
      </div>
    </section>

    <div className="container"><LogoStrip /></div>

    <section id="training" className="training-proof-section">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow">GENAI MASTERCLASS</span>
          <h2>Hands-on AI training built around real work.</h2>
          <p>Employees practise on realistic tasks from their functions. The program can cover prompting, writing, research, presentations, data analysis, images, automation, AI agents and responsible use.</p>
        </div>
        <div className="metric-cards">
          <div><AnimatedStat value={40} suffix="+" /><span>Corporate cohorts</span></div>
          <div><AnimatedStat value={2500} suffix="+" /><span>Professionals trained</span></div>
          <div><AnimatedStat value={100} suffix="+" /><span>Workflows in the Lab</span></div>
          <div><AnimatedStat value={18} /><span>Work categories covered</span></div>
        </div>
        <SessionPhotoRow />
      </div>
    </section>

    <section className="product-section">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow">BUILT AROUND PRACTICE</span>
          <h2>Products that help people practise and apply.</h2>
        </div>
        <div className="product-detail-grid compact-product-grid">
          <article className="product-detail-card lab">
            <ProductDemoLink videoId={practiceLabDemoId} label="AI Practice Lab" />
            <span className="product-label">Open access</span>
            <h3>AI Practice Lab</h3>
            <p>Free AI for Work workflows and current content, with enterprise customization and reporting.</p>
            <ul><li>100+ guided workflows</li><li>Enterprise journeys and dashboard</li></ul>
            <a className="product-link" href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">Open the Practice Lab <Icon name="arrow" size={16} /></a>
          </article>

          <article className="product-detail-card coach">
            <ProductDemoLink videoId={aiCoachDemoId} label="AI Coach" />
            <span className="product-label">AI roleplays</span>
            <h3>AI Coach</h3>
            <p>Voice-based practice for sales and leadership conversations with objective feedback.</p>
            <ul><li>Customized scenarios</li><li>Conversation-linked assessment</li></ul>
            <ButtonLink href="/ai-role-play" variant="text">Explore AI Coach</ButtonLink>
          </article>

          <article className="product-detail-card nudge">
            <ProductDemoLink videoId={actionsEngineDemoId} label="Actions Engine" />
            <span className="product-label">Training application</span>
            <h3>Actions Engine</h3>
            <p>Personalized actions, workplace nudges and application data after classroom training.</p>
            <ul><li>Practice in the flow of work</li><li>Admin dashboard and habit data</li></ul>
            <ButtonLink href="/nudgeengine" variant="text">Explore Actions Engine</ButtonLink>
          </article>
        </div>
      </div>
    </section>

    <section className="lab-showcase-section">
      <div className="container lab-showcase-card">
        <div className="lab-showcase-top">
          <div className="lab-showcase-copy">
            <span className="eyebrow light">AI PRACTICE LAB</span>
            <h2>Workshop that sparks it. Practice Lab that makes it stick.</h2>
            <p>100+ guided AI workflows for real work tasks. Stay current with AI — without the noise. Get your AI application queries resolved by our Trained AI</p>
            <div className="button-row">
              <a className="button button-primary button-compact" href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">Open the Lab <Icon name="arrow" size={17} /></a>
              <a className="button button-ghost-dark button-compact" href={PRACTICE_LAB_DEMO_URL} target="_blank" rel="noopener noreferrer">Watch the demo <Icon name="play" size={17} /></a>
            </div>
          </div>
          <div className="lab-side-stack">
            <div className="lab-showcase-image">
              <Image src="/assets/ai-practice-lab-full.png" alt="AI Practice Lab interface" width={1024} height={631} />
            </div>

          </div>
        </div>
        <div className="lab-workflow-header"><div><small>USE THIS WEEK</small><h3>Practical workflows for common work tasks</h3></div><a href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">See the full library <Icon name="arrow" size={15} /></a></div>
        <LabWorkflowCards />
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
      <div className="container founder-home-grid">
        <div className="founder-image"><Image src="/brand/gaurav-patel.webp" alt="Gaurav Patel, founder and facilitator at Nudgeable" width={1200} height={1200} sizes="(max-width: 860px) 100vw, 42vw" /></div>
        <div>
          <span className="eyebrow">FOUNDER AND FACILITATOR</span>
          <h2>AI for Work, grounded in corporate reality.</h2>
          <p>Gaurav Patel designs practical AI training across industries and business functions. Each session is customized around how participants actually work, the tools they use and the outcomes they need.</p>
          <p>The training draws on daily use of leading AI tools and first-hand experience building the Practice Lab, AI Coach and Actions Engine. This brings real product development and implementation knowledge into every session.</p>
          <div className="founder-points"><span>40+ corporate cohorts</span><span>2,500+ professionals trained</span><span>B.E. in IT and MBA from XLRI</span><span>15+ years across India, Singapore and London</span></div>
          <a className="button button-secondary" href="https://www.linkedin.com/in/gauravpatel25/ai" target="_blank" rel="noopener noreferrer">More about Gaurav <Icon name="arrow" size={17} /></a>
        </div>
      </div>
    </section>

    <section id="contact" className="contact-home-section">
      <div className="container contact-home-grid">
        <div><span className="eyebrow">CONTACT</span><h2>What should employees do better with AI?</h2><p>Share the audience, tools available and workplace outcomes that matter. The program can be designed around those realities.</p></div>
        <div className="contact-card"><ContactForm compact /></div>
      </div>
    </section>
  </>;
}
