import type { Metadata } from 'next';
import Image from 'next/image';
import { ButtonLink } from '@/components/ButtonLink';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { LogoStrip } from '@/components/LogoStrip';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TestimonialGrid } from '@/components/TestimonialGrid';
import { YouTubeGrid } from '@/components/YouTubeGrid';
import { WorkflowVideoGrid } from '@/components/WorkflowVideoGrid';
import { aiTools } from '@/components/data';

const PRACTICE_LAB_DEMO_URL = process.env.NEXT_PUBLIC_PRACTICE_LAB_DEMO_URL || '#';

const workflows = [
  { category: 'Email & tasks', title: 'Build an inbox triage workflow', tool: 'Claude' },
  { category: 'Presentations', title: 'Turn a document into a presentation', tool: 'Copilot' },
  { category: 'Data', title: 'Analyze a messy sales export', tool: 'Gemini' },
  { category: 'Agents', title: 'Delegate a multi-step task safely', tool: 'AI Agents' },
  { category: 'Research', title: 'Compare a market using cited sources', tool: 'ChatGPT' },
  { category: 'Skills', title: 'Write instructions AI can follow repeatedly', tool: 'Any tool' }
];

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

export default function Home() {
  return <>
    <section className="home-hero home-hero-new">
      <div className="container home-hero-grid home-hero-grid-new">
        <div className="home-hero-copy">
          <span className="hero-kicker">AI FOR WORK FOR CORPORATE TEAMS</span>
          <h1>Practical AI for everyday work.</h1>
          <p>Hands-on masterclasses help non-technical employees use Claude, Copilot, Gemini, ChatGPT and AI agents for writing, research, data, presentations, automation and other real workplace tasks.</p>
          <div className="button-row hero-actions">
            <a className="button button-primary button-compact" href="#training">Explore AI training <Icon name="arrow" size={17}/></a>
            <a className="button button-secondary button-compact" href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">Open the Practice Lab <Icon name="arrow" size={17}/></a>
          </div>
          <div className="tool-row hero-tool-row">
            {aiTools.map(tool => <span className="tool-chip" key={tool.name}><b>{tool.mark}</b>{tool.name}</span>)}
          </div>
        </div>

        <div className="home-hero-product-image" aria-label="AI Practice Lab preview">
          <Image src="/assets/ai-practice-lab.png" alt="AI Practice Lab interface" width={2048} height={1176} priority/>
          <div className="hero-window-tag"><small>UPDATED WEEKLY</small><strong>100+ guided workflows</strong></div>
        </div>
      </div>
    </section>

    <div className="container"><LogoStrip/></div>

    <section id="training" className="training-proof-section">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow">GENAI MASTERCLASS</span>
          <h2>Hands-on AI training built around real work.</h2>
          <p>Employees practise on realistic tasks from their functions. The program can cover prompting, writing, research, presentations, data analysis, images, automation, AI agents and responsible use.</p>
        </div>
        <div className="metric-cards">
          <div><strong>40+</strong><span>Corporate cohorts</span></div>
          <div><strong>2,500+</strong><span>Professionals trained</span></div>
          <div><strong>100+</strong><span>Workflows in the Lab</span></div>
          <div><strong>18</strong><span>Work categories covered</span></div>
        </div>
        <div className="session-photo-row">
          <PhotoPlaceholder label="Session photo 01"/>
          <PhotoPlaceholder label="Session photo 02"/>
          <PhotoPlaceholder label="Session photo 03"/>
          <PhotoPlaceholder label="Session photo 04"/>
        </div>
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
            <div className="product-card-image lab-card-image"><Image src="/assets/ai-practice-lab.png" alt="AI Practice Lab" width={2048} height={1176}/></div>
            <span className="product-label">Open access</span>
            <h3>AI Practice Lab</h3>
            <p>Free AI for Work workflows and current content, with enterprise customization and reporting.</p>
            <ul><li>100+ guided workflows</li><li>Enterprise journeys and dashboard</li></ul>
            <a className="product-link" href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">Open the Practice Lab <Icon name="arrow" size={16}/></a>
          </article>

          <article className="product-detail-card coach">
            <div className="product-card-image coach-card-image"><Image src="/assets/ai-coach.png" alt="AI Coach roleplay interface" width={2048} height={1177}/></div>
            <span className="product-label">AI roleplays</span>
            <h3>AI Coach</h3>
            <p>Voice-based practice for sales and leadership conversations with objective feedback.</p>
            <ul><li>Customized scenarios</li><li>Conversation-linked assessment</li></ul>
            <ButtonLink href="/ai-role-play" variant="text">Explore AI Coach</ButtonLink>
          </article>

          <article className="product-detail-card nudge">
            <div className="product-card-image actions-card-image"><Image src="/assets/actions-engine.png" alt="Actions Engine participant interface" width={702} height={1426}/></div>
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
            <h2>Free for individuals. Built for enterprise teams.</h2>
            <p>Anyone can use the public Lab for practical AI workflows. Enterprise clients can add role-based journeys, customized workflows, curated updates and an admin dashboard.</p>
            <div className="button-row">
              <a className="button button-primary button-compact" href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">Open the Lab <Icon name="arrow" size={17}/></a>
              <a className="button button-ghost-dark button-compact" href="#contact">See the enterprise version <Icon name="arrow" size={17}/></a>
            </div>
          </div>
          <div className="lab-side-stack">
            <div className="ask-ai-card">
              <strong>Ask anything about AI tools</strong>
              <div className="ask-input">How is Claude different from ChatGPT?</div>
              <small>POPULAR QUESTIONS</small>
              <div className="ask-pills"><span>What can AI agents do?</span><span>Can AI analyze Excel files?</span><span>Which paid plan is worth it?</span></div>
            </div>
            <a className="lab-demo-card" href={PRACTICE_LAB_DEMO_URL} target={PRACTICE_LAB_DEMO_URL === '#' ? undefined : '_blank'} rel={PRACTICE_LAB_DEMO_URL === '#' ? undefined : 'noopener noreferrer'} aria-label="Watch the AI Practice Lab product demo">
              <div className="demo-play dark"><Icon name="play" size={18}/></div>
              <div><small>PRODUCT DEMO</small><strong>Insert a YouTube demo link here</strong></div>
            </a>
          </div>
        </div>
        <div className="lab-workflow-header"><div><small>USE THIS WEEK</small><h3>Practical workflows for common work tasks</h3></div><a href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">See the full library <Icon name="arrow" size={15}/></a></div>
        <div className="lab-workflow-grid">
          {workflows.map(item => <article key={item.title}>
            <span>{item.category}</span>
            <h4>{item.title}</h4>
            <div><small>{item.tool}</small><Icon name="arrow" size={14}/></div>
          </article>)}
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
          <div className="button-row"><ButtonLink href="/insights#shorts" variant="secondary">See all videos</ButtonLink><a className="button button-dark button-compact" href="https://www.youtube.com/playlist?list=PLX2kcOVk5064" target="_blank" rel="noopener noreferrer">Subscribe on YouTube <Icon name="arrow" size={17}/></a></div>
        </div>
        <YouTubeGrid limit={4}/>
      </div>
    </section>

    <section className="workflow-video-section">
      <div className="container">
        <div className="workflow-video-header"><div><span className="eyebrow">WORKFLOW EXPLAINERS</span><h2>See how the work gets done.</h2></div><a href="/insights#workflows">Explore more workflows <Icon name="arrow" size={15}/></a></div>
        <WorkflowVideoGrid limit={3}/>
      </div>
    </section>

    <section className="testimonial-section">
      <div className="container">
        <div className="section-intro"><span className="eyebrow">CLIENT FEEDBACK</span><h2>What clients say about the experience.</h2></div>
        <TestimonialGrid/>
      </div>
    </section>

    <section id="about" className="founder-section">
      <div className="container founder-home-grid">
        <div className="founder-image"><Image src="/brand/gaurav-patel.webp" alt="Gaurav Patel, founder and facilitator at Nudgeable" width={1200} height={1200} sizes="(max-width: 860px) 100vw, 42vw"/></div>
        <div>
          <span className="eyebrow">FOUNDER AND FACILITATOR</span>
          <h2>AI for Work, grounded in corporate reality.</h2>
          <p>Gaurav Patel combines 15+ years of corporate experience with behavioral science and daily hands-on work across leading AI tools. The sessions are built for employees who need practical outcomes, without requiring a technical background.</p>
          <p>The Practice Lab, AI Coach and Actions Engine are built in-house, keeping the training close to real implementation challenges.</p>
          <div className="founder-points"><span>40+ corporate cohorts</span><span>2,500+ professionals trained</span><span>XLRI alumnus</span><span>Author and product builder</span></div>
          <a className="button button-secondary" href="https://www.linkedin.com/in/gauravpatel25/ai" target="_blank" rel="noopener noreferrer">More about Gaurav <Icon name="arrow" size={17}/></a>
        </div>
      </div>
    </section>

    <section id="contact" className="contact-home-section">
      <div className="container contact-home-grid">
        <div><span className="eyebrow">CONTACT</span><h2>What should employees do better with AI?</h2><p>Share the audience, tools available and workplace outcomes that matter. The program can be designed around those realities.</p></div>
        <div className="contact-card"><ContactForm compact/></div>
      </div>
    </section>
  </>;
}
