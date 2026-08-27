import type { CSSProperties } from 'react';
import { Icon } from './Icon';

export function AcademyPromo() {
  return <>
    <section className="academy-section">
      <div className="container academy-card">
        <div className="academy-grid">
          <div className="academy-copy">
            <span className="eyebrow light">Nudgeable AI Academy</span>
            <h2>Your team already has the tools. This is where they learn to use them.</h2>
            <p>A free, always-current guide to ChatGPT, Claude, Gemini and Copilot, feature by feature, in plain language.</p>
            <ul className="academy-points">
              <li>Every feature explained with a real workplace example</li>
              <li>The ideas underneath, so any new tool makes sense</li>
              <li>Updated as the assistants change, not once a year</li>
            </ul>
            <div className="button-row">
              <a className="button button-primary button-compact" href="/ai-academy/index.html">Open the Academy <Icon name="arrow" size={17} /></a>
              <a className="button button-ghost-dark button-compact" href="/ai-academy/news/index.html">See what&rsquo;s new</a>
            </div>
          </div>

          <a className="academy-shot" href="/ai-academy/index.html" aria-label="Open the Nudgeable AI Academy">
            <img
              src="/ai-academy/assets/preview-academy.jpg"
              alt="The Nudgeable AI Academy, showing guides for ChatGPT, Claude, Gemini and Copilot"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>

    <section className="academy-learn-section">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow">WHERE TO START</span>
          <h2>Pick the assistant you use. Or start with how any of it works.</h2>
          <p>Feature guides for every assistant, the foundations behind them, and a weekly round-up. Free and open, no sign-in.</p>
        </div>

        <div className="academy-tools">
          <a className="academy-tool" href="/ai-academy/chatgpt/index.html" style={{ '--ac': '#10A37F', '--ac-tint': '#E2F6EE' } as CSSProperties}>
            <span className="academy-tool-logo"><img src="/ai-academy/assets/logos/chatgpt.png" alt="ChatGPT" loading="lazy" /></span>
            <h3>ChatGPT</h3>
            <div className="academy-chips"><span>Work</span><span>Projects</span><span>Codex</span></div>
            <span className="academy-go">Open guide <Icon name="arrow" size={15} /></span>
          </a>

          <a className="academy-tool" href="/ai-academy/claude/index.html" style={{ '--ac': '#D97757', '--ac-tint': '#FCEBE1' } as CSSProperties}>
            <span className="academy-tool-logo"><img src="/ai-academy/assets/logos/claude.png" alt="Claude" loading="lazy" /></span>
            <h3>Claude</h3>
            <div className="academy-chips"><span>Cowork</span><span>Artifacts</span><span>Skills</span></div>
            <span className="academy-go">Open guide <Icon name="arrow" size={15} /></span>
          </a>

          <a className="academy-tool" href="/ai-academy/gemini/index.html" style={{ '--ac': '#4285F4', '--ac-tint': '#E3EDFD' } as CSSProperties}>
            <span className="academy-tool-logo"><img src="/ai-academy/assets/logos/gemini.svg" alt="Gemini" loading="lazy" /></span>
            <h3>Gemini</h3>
            <div className="academy-chips"><span>Spark</span><span>Gems</span><span>Deep Research</span></div>
            <span className="academy-go">Open guide <Icon name="arrow" size={15} /></span>
          </a>

          <a className="academy-tool" href="/ai-academy/copilot/index.html" style={{ '--ac': '#5B5FC7', '--ac-tint': '#ECEBFB' } as CSSProperties}>
            <span className="academy-tool-logo"><img src="/ai-academy/assets/logos/copilot.png" alt="Microsoft Copilot" loading="lazy" /></span>
            <h3>Copilot</h3>
            <div className="academy-chips"><span>Cowork</span><span>Work IQ</span><span>Notebooks</span></div>
            <span className="academy-go">Open guide <Icon name="arrow" size={15} /></span>
          </a>
        </div>

        <div className="academy-learn">
          <a className="academy-note" href="/ai-academy/foundations/index.html" style={{ '--ac': 'var(--yellow)', '--ac-bg': 'var(--yellow-soft)', '--ac-tag-ink': 'var(--ink)' } as CSSProperties}>
            <span className="academy-tag">Start here</span>
            <h3>AI Foundations</h3>
            <p>Ten short topics on how modern AI actually works, in a sensible order.</p>
            <ul className="academy-list">
              <li>Tokens, context windows and memory</li>
              <li>Tool calling, agents and where cost comes from</li>
            </ul>
            <span className="academy-go">Learn the basics <Icon name="arrow" size={15} /></span>
          </a>

          <a className="academy-note" href="/ai-academy/tips/index.html" style={{ '--ac': 'var(--purple)', '--ac-bg': 'var(--purple-soft)', '--ac-tag-ink': '#fff' } as CSSProperties}>
            <span className="academy-tag">Practise</span>
            <h3>AI Best Practices</h3>
            <p>Small habits that change the quality of an answer. Each takes a minute to read.</p>
            <ul className="academy-list">
              <li>What to put in a brief before you ask</li>
              <li>When to start fresh instead of pushing on</li>
            </ul>
            <span className="academy-go">Get more out of AI <Icon name="arrow" size={15} /></span>
          </a>

          <a className="academy-note" href="/ai-academy/news/index.html" style={{ '--ac': 'var(--green)', '--ac-bg': 'var(--green-soft)', '--ac-tag-ink': '#fff' } as CSSProperties}>
            <span className="academy-tag">Every week</span>
            <h3>What&rsquo;s New</h3>
            <p>The updates across the major assistants that change how you work.</p>
            <ul className="academy-list">
              <li>One short entry per update, no release-note noise</li>
              <li>Filter by tool, browse by month</li>
            </ul>
            <span className="academy-go">See the updates <Icon name="arrow" size={15} /></span>
          </a>
        </div>
      </div>
    </section>
  </>;
}
