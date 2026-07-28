import type { Metadata } from 'next';
import Image from 'next/image';
import { ButtonLink } from '@/components/ButtonLink';
import { CTA } from '@/components/CTA';
import { Icon } from '@/components/Icon';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Actions Engine',
  description: 'AI-generated workplace actions, behavioral nudges and application tracking after classroom training.',
  alternates: { canonical: '/nudgeengine' },
  openGraph: {
    title: 'Actions Engine',
    description: 'Turn classroom learning into personalized action, practice and measurable application.',
    url: '/nudgeengine',
    type: 'website'
  }
};

const process = [
  {
    number: '01',
    title: 'Action Planning',
    copy: 'AI generates personalized workplace actions from the classroom training.'
  },
  {
    number: '02',
    title: 'Practice',
    copy: 'Nudges arrive in the flow of work so participants take action over time.'
  },
  {
    number: '03',
    title: 'Track',
    copy: 'The admin dashboard shows participation, completion, validation and repetition.'
  }
];

const weeklyActions = [532, 501, 434, 488];
const onboardingPoints = [75, 140, 200, 270, 325, 380];
const funnelSteps = [
  ['Training', '100%'],
  ['Knowledge', '97%'],
  ['Intention', '89%'],
  ['Action', '78%'],
  ['Repetition', '61%']
] as const;

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="impact-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function ActionsEnginePage() {
  const linePoints = onboardingPoints.map((value, index) => `${18 + index * 40},${180 - value * .38}`).join(' ');

  return <>
    <section className="page-hero product-page-hero actions-page-hero">
      <div className="container page-hero-grid product-hero-grid actions-hero-grid">
        <div>
          <span className="eyebrow green-eyebrow">ACTIONS ENGINE</span>
          <h1>Turn training into action at work.</h1>
          <p>AI creates personalized action plans from training content, nudges employees during the flow of work and gives HR clear application data.</p>
          <div className="button-row">
            <ButtonLink href="/#contact">Request a demo</ButtonLink>
            <a className="button button-secondary" href="#actions-process">See how it works <Icon name="arrow" size={17}/></a>
          </div>
          <div className="actions-hero-metrics">
            <div><strong>1,245</strong><span>Participants</span></div>
            <div><strong>7,892</strong><span>Actions completed</span></div>
            <div><strong>72%</strong><span>Completion rate</span></div>
            <div><strong>3,421</strong><span>Habits acquired</span></div>
          </div>
        </div>
        <div className="product-hero-image actions-hero-image">
          <Image src="/assets/actions-engine.png" alt="Actions Engine participant practice plan" width={702} height={1426} priority/>
        </div>
      </div>
    </section>

    <section id="actions-process" className="soft-section compact-section">
      <div className="container">
        <SectionHeader eyebrow="HOW ACTIONS ENGINE WORKS" title="A three-step journey from learning to application." />
        <div className="actions-process-grid">
          {process.map((item, index) => <article key={item.title}>
            <div className="actions-step-icon"><span>{item.number}</span>{index === 0 ? <Icon name="check"/> : index === 1 ? <Icon name="calendar"/> : <Icon name="chart"/>}</div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="actions-impact-section compact-section">
      <div className="container">
        <SectionHeader
          eyebrow="REAL PROGRAM IMPACT"
          title="Application data across different capability programs."
          copy="Real programs. Real participation. Clear visibility into what stuck after the classroom."
        />
        <div className="actions-impact-grid">
          <article className="impact-program-card">
            <div className="impact-card-heading">
              <span className="impact-icon impact-icon-yellow"><Icon name="people" size={22}/></span>
              <div>
                <h3>Employee Well-Being Program</h3>
                <span className="impact-client">Fortune 500 US-based pharma giant</span>
              </div>
            </div>
            <div className="impact-metrics-row">
              <Metric label="Duration" value="12 weeks"/>
              <Metric label="Total users" value="450"/>
              <Metric label="Habits acquired" value="312"/>
            </div>
            <div className="impact-chart-panel">
              <div className="chart-title">Weekly actions</div>
              <div className="bar-chart" aria-label="Weekly actions: 532, 501, 434, 488">
                {weeklyActions.map((value, index) => (
                  <div className="bar-column" key={value}>
                    <span>{value}</span>
                    <i style={{height: `${value / 6}px`}}/>
                    <small>Week {index + 1}</small>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="impact-program-card">
            <div className="impact-card-heading">
              <span className="impact-icon impact-icon-blue"><Icon name="spark" size={22}/></span>
              <div>
                <h3>New Joiner Onboarding &amp; Skills Development</h3>
                <span className="impact-client">India-based tech GCC</span>
              </div>
            </div>
            <div className="impact-metrics-row">
              <Metric label="Duration" value="16 weeks"/>
              <Metric label="Total users" value="280"/>
              <Metric label="Behavior change" value="312"/>
            </div>
            <div className="impact-chart-panel">
              <div className="chart-title">Total actions successfully nudged</div>
              <div className="line-chart-wrap">
                <svg viewBox="0 0 240 190" role="img" aria-label="Rising actions over six weeks">
                  <line x1="18" y1="180" x2="225" y2="180" className="chart-axis"/>
                  <line x1="18" y1="20" x2="18" y2="180" className="chart-axis"/>
                  <polyline points={linePoints} className="chart-line"/>
                  {onboardingPoints.map((value, index) => (
                    <circle key={value} cx={18 + index * 40} cy={180 - value * .38} r="4.5" className="chart-point"/>
                  ))}
                </svg>
                <div className="week-labels">{onboardingPoints.map((_, index) => <span key={index}>W{index + 1}</span>)}</div>
              </div>
            </div>
          </article>

          <article className="impact-program-card">
            <div className="impact-card-heading">
              <span className="impact-icon impact-icon-green"><Icon name="shield" size={22}/></span>
              <div>
                <h3>People Leadership &amp; Psychological Safety</h3>
                <span className="impact-client">European financial services company</span>
              </div>
            </div>
            <div className="impact-metrics-row">
              <Metric label="Duration" value="20 weeks"/>
              <Metric label="Total users" value="125"/>
              <Metric label="Total actions" value="7,250"/>
            </div>
            <div className="impact-chart-panel">
              <div className="chart-title">Behavior change funnel</div>
              <div className="funnel-chart">
                {funnelSteps.map(([label, value], index) => (
                  <div key={label} className={`funnel-row f${index + 1}`}>
                    <span>{label}</span>
                    <i/>
                    <b>{value}</b>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="impact-program-card">
            <div className="impact-card-heading">
              <span className="impact-icon impact-icon-purple"><Icon name="chart" size={22}/></span>
              <div>
                <h3>Driving HR Competencies</h3>
                <span className="impact-client">Australian manufacturing conglomerate</span>
              </div>
            </div>
            <div className="impact-metrics-row">
              <Metric label="Duration" value="18 weeks"/>
              <Metric label="Total users" value="95"/>
              <Metric label="Total habits" value="69"/>
            </div>
            <div className="impact-chart-panel">
              <div className="chart-title">User engagement</div>
              <div className="donut-layout">
                <div className="engagement-donut" aria-label="70.6 percent consistently active, 17.6 percent sometimes active, 11.8 percent inactive"/>
                <div className="donut-legend">
                  <span className="green-dot"><b>70.6%</b> Consistently active</span>
                  <span className="yellow-dot"><b>17.6%</b> Sometimes active</span>
                  <span className="red-dot"><b>11.8%</b> Inactive users</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="soft-section compact-section">
      <div className="container">
        <SectionHeader eyebrow="WHERE IT CAN BE USED" title="For programs where application matters after the classroom." />
        <div className="use-case-chip-grid">
          {['People leadership', 'Psychological safety', 'Employee wellbeing', 'New joiner onboarding', 'HR competencies', 'Customer centricity'].map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>

    <CTA title="Extend training into the flow of work" copy="Share the program, audience and desired behaviors. We will show how Actions Engine can support application and measurement."/>
  </>;
}
