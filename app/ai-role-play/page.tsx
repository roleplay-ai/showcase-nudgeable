import type { Metadata } from 'next';
import Image from 'next/image';
import { ButtonLink } from '@/components/ButtonLink';
import { CTA } from '@/components/CTA';
import { Icon } from '@/components/Icon';
import { LogoStrip } from '@/components/LogoStrip';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'AI Coach for Sales and Leadership',
  description: 'Customized AI voice roleplays for sales and leadership practice with objective, conversation-linked feedback.',
  alternates: { canonical: '/ai-role-play' },
  openGraph: {
    title: 'AI Coach for Sales and Leadership',
    description: 'Customized AI voice roleplays with objective, conversation-linked feedback.',
    url: '/ai-role-play',
    type: 'website'
  }
};

// Replace these two values with your final YouTube demo URLs.
const SALES_DEMO_URL = process.env.NEXT_PUBLIC_SALES_COACH_DEMO_URL || '#sales-demo';
const LEADERSHIP_DEMO_URL = process.env.NEXT_PUBLIC_LEADERSHIP_COACH_DEMO_URL || '#leadership-demo';

const coachUseCases = [
  {
    id: 'sales-demo',
    title: 'AI Sales Coach',
    subtitle: 'Practice objections before they are real',
    demoUrl: SALES_DEMO_URL,
    demoLabel: 'Add sales demo link',
    bullets: ['Onboard new sales reps faster', 'Improve pitches and objection handling', 'Assess and certify sales readiness']
  },
  {
    id: 'leadership-demo',
    title: 'AI Leadership Coach',
    subtitle: 'Practice feedback, conflict and motivation',
    demoUrl: LEADERSHIP_DEMO_URL,
    demoLabel: 'Add leadership demo link',
    bullets: ['Apply leadership frameworks to real situations', 'Practise difficult conversations', 'Build confidence in first-time managers']
  }
];

const steps = [
  {
    number: '01',
    title: 'Scenario',
    copy: 'Scenarios built around your reality.',
    detail: 'Designed using client expertise, workplace context and behavioral science.',
    image: '/assets/coach-scenario.png',
    alt: 'Scenario design for AI Coach'
  },
  {
    number: '02',
    title: 'Roleplay',
    copy: 'Voice practice in English and Hindi.',
    detail: 'Employees rehearse realistic conversations with human-sounding AI characters.',
    image: '/assets/coach-roleplay.png',
    alt: 'Voice roleplay experience in AI Coach'
  },
  {
    number: '03',
    title: 'Insights',
    copy: 'Feedback linked to the conversation.',
    detail: 'Reports show what worked, what to improve and relevant learning resources.',
    image: '/assets/coach-insights.png',
    alt: 'AI Coach assessment and insights report'
  }
];

export default function AICoachPage() {
  return <>
    <section className="page-hero product-page-hero coach-page-hero">
      <div className="container page-hero-grid product-hero-grid">
        <div>
          <span className="eyebrow purple-eyebrow">AI COACH</span>
          <h1>Practice critical conversations with AI.</h1>
          <p>Employees rehearse real sales and leadership conversations with AI, then receive objective feedback linked to what they actually said.</p>
          <div className="button-row">
            <ButtonLink href="/#contact">Request a demo</ButtonLink>
            <a className="button button-secondary" href="#coach-use-cases">See the use cases <Icon name="arrow" size={17}/></a>
          </div>
          <div className="hero-proof-row coach-proof-row">
            <span><Icon name="voice" size={17}/> Natural voice practice</span>
            <span><Icon name="shield" size={17}/> Customized scenarios</span>
            <span><Icon name="chart" size={17}/> Objective assessment</span>
          </div>
        </div>
        <div className="product-hero-image coach-hero-image">
          <Image src="/assets/ai-coach.png" alt="AI Coach roleplay interface" width={2048} height={1177} priority/>
        </div>
      </div>
      <div className="container"><LogoStrip/></div>
    </section>

    <section id="coach-use-cases" className="soft-section">
      <div className="container">
        <SectionHeader eyebrow="SALES AND LEADERSHIP" title="Two practice environments for critical conversations." />
        <div className="coach-use-case-grid">
          {coachUseCases.map((item, index) => <article className={`coach-use-case-card ${index === 1 ? 'leadership' : 'sales'}`} key={item.title} id={item.id}>
            <div className="coach-demo-slot">
              <span className="demo-slot-label">DEMO VIDEO</span>
              <div className="demo-slot-icon"><Icon name="play" size={24}/></div>
              <strong>{item.demoLabel}</strong>
              <small>Add the final YouTube demo URL before launch</small>
            </div>
            <div className="coach-use-copy">
              <span className="eyebrow">{item.title}</span>
              <h2>{item.subtitle}</h2>
              <div className="check-list compact-check-list">
                {item.bullets.map(x => <div className="check-item" key={x}><span><Icon name="check" size={15}/></span><span>{x}</span></div>)}
              </div>
              <a className="button button-secondary button-compact" href={item.demoUrl}>Watch demo <Icon name="play" size={15}/></a>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section id="how-it-works">
      <div className="container">
        <SectionHeader eyebrow="HOW AI COACH WORKS" title="From real scenarios to useful feedback." />
        <div className="coach-step-stack">
          {steps.map((step, index) => <article className={`coach-step-card ${index % 2 ? 'reverse' : ''}`} key={step.title}>
            <div className="coach-step-copy">
              <span>{step.number}</span>
              <small>{step.title}</small>
              <h2>{step.copy}</h2><p>{step.detail}</p>
            </div>
            <div className="coach-step-image">
              <Image src={step.image} alt={step.alt} width={1225} height={574}/>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="soft-section compact-section">
      <div className="container">
        <SectionHeader eyebrow="WHERE IT CAN BE USED" title="Built around the conversations your teams face." />
        <div className="use-case-chip-grid">
          {['Sales onboarding', 'Dealer conversations', 'Leadership feedback', 'Customer service', 'New manager onboarding', 'Assessment and certification'].map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>

    <CTA title="Create an AI roleplay for a real workplace conversation" copy="Share the audience, scenario and behaviors to assess. We will design a pilot around the real situation."/>
  </>;
}
