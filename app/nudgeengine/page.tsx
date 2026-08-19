import type { Metadata } from 'next';
import { Fragment } from 'react';
import { ButtonLink } from '@/components/ButtonLink';
import { Icon } from '@/components/Icon';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Nudge Engine',
  description: 'Nudge Engine turns training into personalized workplace actions and makes application measurable.',
  alternates: { canonical: '/nudgeengine' },
  openGraph: {
    title: 'Nudge Engine | From Training to Application',
    description: 'Nudge Engine turns training into personalized workplace actions and makes application measurable.',
    url: '/nudgeengine',
    type: 'website'
  }
};

const barriers = [
  { icon: '↗', title: 'No immediate reward', copy: 'The benefit of applying learning comes later, while the effort is required now.' },
  { icon: '⏱', title: 'No reminders', copy: 'Training ends, work resumes, and the intended action quickly drops out of attention.' },
  { icon: '2', title: 'No human accountability', copy: 'Once the program ends, few people know whether the participant actually followed through.' },
  { icon: '✓', title: 'No action plan', copy: 'People may know what to change without deciding the specific action, frequency or duration.' }
];

const principles = [
  { title: 'Pre-commitment', copy: 'Participants actively choose the actions they will take.' },
  { title: 'Implementation intentions', copy: 'They decide the frequency and duration of their commitment.' },
  { title: 'Timely nudges', copy: 'Actions are brought back into attention during the flow of work.' },
  { title: 'Commitment devices', copy: 'Missed commitments affect a visible Commitment Score.' },
  { title: 'Social accountability', copy: 'A Commitment Buddy and the training cohort make progress visible to peers.' },
  { title: 'Immediate reinforcement', copy: 'Completed actions add to collective progress and unlock meaningful rewards.' }
];

const compareRows = [
  { label: 'Focus', lms: { title: 'Learning', copy: 'Content, courses and completion.' }, nudge: { title: 'Application', copy: 'Specific workplace actions after training.' } },
  { label: 'Design', lms: { title: 'Program-led', copy: 'The learning journey is defined by the program.' }, nudge: { title: 'Customized', copy: 'AI creates actions using training, company and participant context.' } },
  { label: 'Motivation', lms: { title: 'Learning engagement', copy: 'Engagement is centered on the learning experience.' }, nudge: { title: 'Behavioral science', copy: 'Nudges, commitment devices, human accountability and immediate reinforcement.' } },
  { label: 'Measures', lms: { title: 'Attendance & completion', copy: 'Visibility into learning activity.' }, nudge: { title: 'Application', copy: 'Actions committed, actions completed and application over time.' } }
];

const journey = [
  { num: '01', chip: 'AI PERSONALIZED', title: 'Personalize', copy: 'AI uses the training content, company context and participant’s development plan to create relevant workplace actions.' },
  { num: '02', chip: 'ACTIVE CHOICE', title: 'Commit', copy: 'Participants choose their actions, whether to practice daily or weekly, and how long they want to continue.' },
  { num: '03', chip: 'FLOW OF WORK', title: 'Nudge', copy: 'Actions return at the chosen time. Participants confirm completion in one click.' },
  { num: '04', chip: 'HUMAN ACCOUNTABILITY', title: 'Stay accountable', copy: 'A Commitment Buddy sees progress and can encourage them. The training cohort adds shared accountability beyond HR or the manager.' },
  { num: '05', chip: 'IMMEDIATE REWARD', title: 'Create impact', copy: 'Completed actions add to the cohort’s Action Bank, unlocking social-impact milestones such as planting trees, funding meals or supporting education.' }
];

const HERO_VIDEO_URL = 'https://youtu.be/uOwDFQIvd4Q?si=DXfNYOojFOqjkf-F';

function getYouTubeVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '');
    return url.searchParams.get('v') || url.pathname.split('/embed/')[1] || '';
  } catch {
    return '';
  }
}

const heroVideoId = getYouTubeVideoId(HERO_VIDEO_URL) || 'uOwDFQIvd4Q';

const weeklyApplication = [58, 74, 68, 83, 78, 88];
const cohorts = [
  { label: 'Cohort 03', value: 76 },
  { label: 'Cohort 02', value: 68 },
  { label: 'Cohort 01', value: 63 }
];

export default function NudgeEnginePage() {
  return <>
    <section className="ne-hero">
      <div className="container ne-hero-grid">
        <div className="ne-hero-copy">
          <p className="eyebrow">Awareness <svg className="ne-not-equal-sign" viewBox="0 0 28 20" aria-label="is not equal to" role="img"><path d="M3 6h22M3 14h22M9 18L19 2" /></svg> Application</p>
          <h1>Training is completed. But how much gets <span className="ne-hero-highlight">applied?</span></h1>
          <p>Organizations invest heavily in training, but much of the learning never becomes consistent workplace action. Nudge Engine helps people apply learning at work and makes that application measurable.</p>
          <div className="button-row">
            <a className="button button-primary" href="#ne-how">See the application journey</a>
          </div>
          <p className="ne-hero-note">Designed for the application phase that begins when participants leave the training room.</p>
        </div>
        <a className="ne-hero-video" href={HERO_VIDEO_URL} target="_blank" rel="noopener noreferrer" aria-label="Watch Actions Engine demo">
          <div className="ne-hero-video-frame">
            <img src={`https://i.ytimg.com/vi/${heroVideoId}/hqdefault.jpg`} alt="" />
            <span className="demo-play" aria-hidden="true"><Icon name="play" size={18} /></span>
          </div>
        </a>
      </div>
    </section>

    <section id="ne-why">
      <div className="container">
        <SectionHeader
          eyebrow="Why it happens"
          title="The application gap is a behavioral problem."
          copy="People can leave training knowing exactly what they should do and still struggle to follow through once everyday work takes over."
        />
        <div className="ne-barriers">
          {barriers.map(item => <article className="ne-barrier" key={item.title}>
            <div className="ne-barrier-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>)}
        </div>
        <div className="ne-problem-line">These are follow-through problems. The post-training journey needs to make action easier to plan, remember and sustain.</div>
      </div>
    </section>

    <section id="ne-science" className="ne-science">
      <div className="container ne-science-layout">
        <div className="ne-science-statement">
          <p className="eyebrow light">Beyond an LMS</p>
          <h2>Designed around how people actually follow through.</h2>
          <p>Learning platforms manage content and completion. Nudge Engine is an Action Management Platform built for the application phase, using behavioral science to shape how commitments are made and sustained.</p>
          <span className="ne-platform-pill">Behavioral science + action management</span>
        </div>
        <div className="ne-principles">
          {principles.map((item, index) => <article className="ne-principle" key={item.title}>
            <div className="ne-principle-index">{String(index + 1).padStart(2, '0')}</div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="ne-compare">
      <div className="container">
        <SectionHeader
          eyebrow="LMS vs Nudge Engine"
          title="Extend the journey from learning to workplace application."
          copy="Your LMS manages the learning experience. Nudge Engine focuses on what participants actually do after the training."
        />
        <div className="ne-compare-table" role="table" aria-label="LMS and Nudge Engine comparison">
          <div className="ne-compare-cell ne-compare-head label" />
          <div className="ne-compare-cell ne-compare-head lms">Your LMS</div>
          <div className="ne-compare-cell ne-compare-head nudge">Nudge Engine</div>

          {compareRows.map(row => <Fragment key={row.label}>
            <div className="ne-compare-cell ne-compare-label">{row.label}</div>
            <div className="ne-compare-cell ne-compare-value"><strong>{row.lms.title}</strong><span>{row.lms.copy}</span></div>
            <div className="ne-compare-cell ne-compare-value nudge"><strong>{row.nudge.title}</strong><span>{row.nudge.copy}</span></div>
          </Fragment>)}
        </div>
      </div>
    </section>

    <section id="ne-how">
      <div className="container">
        <SectionHeader
          eyebrow="How Nudge Engine works"
          title="From training content to everyday workplace actions."
          copy="The application journey starts with what was taught, adapts to the individual, and keeps the commitment alive after the training ends."
        />
        <div className="ne-journey">
          {journey.map(step => <article className="ne-step" key={step.num}>
            <div className="ne-step-num">{step.num}</div>
            <span className="ne-step-chip">{step.chip}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>)}
        </div>
        <div className="ne-voluntary"><span className="ne-voluntary-badge">VOLUNTARY</span><p>Participants choose what they commit to and how they want to apply it. Accountability strengthens a commitment they have made themselves.</p></div>
      </div>
    </section>

    <section id="ne-measure" className="ne-measure">
      <div className="container">
        <div className="ne-measure-header">
          <div>
            <p className="eyebrow">Measurable application</p>
            <h2>See what happened after the training.</h2>
          </div>
          <p>HR gets an application dashboard for each training program and batch, moving the conversation from attendance to workplace action.</p>
        </div>

        <div className="ne-dashboard-shell" aria-label="Illustrative training application dashboard">
          <div className="ne-dashboard-top">
            <div className="ne-dashboard-title"><strong>Training Application Dashboard</strong><span>Leadership Essentials · Cohort 03</span></div>
            <div className="ne-filter">Training program ▾</div>
          </div>
          <div className="ne-metrics">
            <div className="ne-metric"><span>Participants</span><strong>120</strong></div>
            <div className="ne-metric"><span>Actions committed</span><strong>684</strong></div>
            <div className="ne-metric"><span>Actions completed</span><strong>521</strong></div>
            <div className="ne-metric highlight"><span>Application rate</span><strong>76%</strong></div>
          </div>
          <div className="ne-dashboard-bottom">
            <div className="ne-chart-card">
              <div className="ne-chart-title">Application over time</div>
              <div className="ne-chart" aria-label="Illustrative six week application chart">
                {weeklyApplication.map((value, index) => <div className="ne-week" key={index}>
                  <div className="ne-bar" style={{ height: `${value}%` }} />
                  <span>W{index + 1}</span>
                </div>)}
              </div>
            </div>
            <div className="ne-cohort-card">
              <div className="ne-cohort-title">Application by cohort</div>
              {cohorts.map(cohort => <div className="ne-cohort-row" key={cohort.label}>
                <div className="ne-cohort-label"><span>{cohort.label}</span><span>{cohort.value}%</span></div>
                <div className="ne-track"><div className="ne-fill" style={{ width: `${cohort.value}%` }} /></div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="ne-closing">
      <div className="container">
        <div className="ne-closing-card">
          <h2>Move the conversation from <span className="ne-closing-highlight">“Did they attend?”</span> to <span className="ne-closing-highlight">“Did they apply it?”</span></h2>
          <ButtonLink href="/#contact">Request a demo</ButtonLink>
        </div>
      </div>
    </section>
  </>;
}
