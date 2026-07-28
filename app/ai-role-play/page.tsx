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

const SALES_DEMO_URL = 'https://www.youtube.com/watch?v=-y5uJ_2ACcM';
const LEADERSHIP_DEMO_URL = 'https://www.youtube.com/watch?v=GBWzcb101HQ';
const COACH_STEP_IMAGE_VERSION = '20260728';

function getYouTubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    const videoId = url.searchParams.get('v');

    if (!videoId) {
      return null;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

const coachUseCases = [
  {
    id: 'sales-demo',
    title: 'AI Sales Coach',
    subtitle: 'Practice objections before they are real',
    demoUrl: SALES_DEMO_URL,
    embedUrl: getYouTubeEmbedUrl(SALES_DEMO_URL),
    demoLabel: 'AI Sales Coach demo',
    bullets: ['Onboard new sales reps faster', 'Improve pitches and objection handling', 'Assess and certify sales readiness']
  },
  {
    id: 'leadership-demo',
    title: 'AI Leadership Coach',
    subtitle: 'Practice feedback, conflict and motivation',
    demoUrl: LEADERSHIP_DEMO_URL,
    embedUrl: getYouTubeEmbedUrl(LEADERSHIP_DEMO_URL),
    demoLabel: 'AI Leadership Coach demo',
    bullets: ['Apply leadership frameworks to real situations', 'Practise difficult conversations', 'Build confidence in first-time managers']
  }
];

const steps = [
  {
    id: 'scenario',
    title: 'Scenario',
    label: 'SCENARIO',
    icon: 'book',
    theme: 'purple',
    copy: 'Realistic scenarios built on deep expertise',
    bullets: [
      'Custom-built with workplace context, behavioral science and subject-matter expertise.',
      'Each scenario is refined, tested and designed around the conversations your teams face.',
      'From scenarios to scoring rubrics, every detail is tailored to your environment.'
    ],
    href: '/#contact',
    image: `/assets/coach-scenario.png?v=${COACH_STEP_IMAGE_VERSION}`,
    alt: 'Scenario design for AI Coach'
  },
  {
    id: 'roleplay',
    title: 'Roleplay',
    label: 'ROLEPLAY',
    icon: 'voice',
    theme: 'green',
    copy: 'Practice that mirrors your reality',
    bullets: [
      'Human-sounding voices support realistic sales and leadership practice.',
      'Real conversations feel natural, with nuanced prompts and believable responses.',
      'Advanced voice models create immersive rehearsal before high-stakes conversations.'
    ],
    href: '/#contact',
    image: `/assets/coach-roleplay.png?v=${COACH_STEP_IMAGE_VERSION}`,
    alt: 'Voice roleplay experience in AI Coach'
  },
  {
    id: 'insights',
    title: 'Insights',
    label: 'INSIGHTS',
    icon: 'chart',
    theme: 'yellow',
    copy: 'Feedback that drives growth',
    bullets: [
      'Every insight and score is grounded in what was actually said during the conversation.',
      'Teams can see what worked, what to improve and which alternatives to practise next.',
      'Actionable learning resources help employees improve right away.'
    ],
    href: '/#contact',
    image: `/assets/coach-insights.png?v=${COACH_STEP_IMAGE_VERSION}`,
    alt: 'AI Coach assessment and insights report'
  }
] as const;

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
          <Image src="/assets/ai-coach-hero.png" alt="AI Coach roleplay interface showing a live practice conversation and feedback flow" width={1384} height={978} priority/>
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
              {item.embedUrl ? (
                <iframe
                  src={item.embedUrl}
                  title={item.demoLabel}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <>
                  <span className="demo-slot-label">DEMO VIDEO</span>
                  <div className="demo-slot-icon"><Icon name="play" size={24}/></div>
                  <strong>{item.demoLabel}</strong>
                  <small>Video unavailable</small>
                </>
              )}
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
          {steps.map(step => <article className={`coach-step-card ${step.theme}`} key={step.id}>
            <div className="coach-step-copy">
              <div className={`coach-step-label ${step.theme}`}>
                <span className="coach-step-icon"><Icon name={step.icon} size={18}/></span>
                <small>{step.label}</small>
              </div>
              <h2>{step.copy}</h2>
              <div className="coach-step-points">
                {step.bullets.map(point => <div className="coach-step-point" key={point}>
                  <span><Icon name="arrow" size={14}/></span>
                  <p>{point}</p>
                </div>)}
              </div>
              <a className="button button-secondary button-compact coach-step-link" href={step.href}>Learn more</a>
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
