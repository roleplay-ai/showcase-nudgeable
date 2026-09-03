import type { CSSProperties } from 'react';

export function AcademyPromo() {
  return (
    <section className="academy-promo">
      <div className="container">

        <section className="academy-banner">
          <div className="academy-banner-copy">
            <div className="eyebrow light academy-banner-eyebrow">Practical AI for work</div>
            <h2>Nudgeable AI Academy</h2>
            <p className="academy-banner-lead">Every assistant explained feature by feature, in plain language, with the ideas underneath that make all of them easier to use.</p>
            <div className="academy-banner-actions">
              <a className="button button-primary" href="/ai-academy/index.html">Access AI Academy</a>
            </div>
          </div>

          <div className="academy-banner-marks" aria-hidden="true">
            <span><img src="/ai-academy/assets/logos/chatgpt.png" alt="" /></span>
            <span><img src="/ai-academy/assets/logos/claude.png" alt="" /></span>
            <span><img src="/ai-academy/assets/logos/gemini.svg" alt="" /></span>
            <span><img src="/ai-academy/assets/logos/copilot.png" alt="" /></span>
          </div>
        </section>

        <section className="academy-light">
          <div className="academy-head">
            <div className="eyebrow">Where to start</div>
            <h2>Pick the assistant you use. Or start with how any of it works.</h2>
            <p>Feature guides for every assistant, the foundations behind them, and a weekly round-up. Free and open, no sign-in.</p>
          </div>

          <div className="academy-ai-grid" id="academy-assistants">
            <a className="academy-ai-card" href="/ai-academy/chatgpt/index.html" style={{ '--tint': '#E2F6EE', '--brand': '#10A37F', '--edge': '#B6E3D4', '--glow': 'rgba(16,163,127,.20)', '--name': '#0B6E56' } as CSSProperties}>
              <span className="academy-ai-updated">Updated Sep 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/chatgpt.png" alt="ChatGPT logo" /></span>
              <h3>ChatGPT</h3>
              <div className="academy-chips"><span>Work</span><span>Projects</span><span>Skills</span><span>Codex</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>

            <a className="academy-ai-card" href="/ai-academy/claude/index.html" style={{ '--tint': '#FCEBE1', '--brand': '#D97757', '--edge': '#F0C7B2', '--glow': 'rgba(217,119,87,.22)', '--name': '#A9502F' } as CSSProperties}>
              <span className="academy-ai-updated">Updated Sep 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/claude.png" alt="Claude logo" /></span>
              <h3>Claude</h3>
              <div className="academy-chips"><span>Cowork</span><span>Artifacts</span><span>Skills</span><span>Projects</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>

            <a className="academy-ai-card" href="/ai-academy/gemini/index.html" style={{ '--tint': '#E3EDFD', '--brand': '#4285F4', '--edge': '#B9D0F8', '--glow': 'rgba(66,133,244,.20)', '--name': '#1A56C4' } as CSSProperties}>
              <span className="academy-ai-updated">Updated Sep 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/gemini.svg" alt="Gemini logo" /></span>
              <h3>Gemini</h3>
              <div className="academy-chips"><span>Spark</span><span>Gems</span><span>Notebook</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>

            <a className="academy-ai-card" href="/ai-academy/copilot/index.html" style={{ '--tint': '#ECEBFB', '--brand': '#5B5FC7', '--edge': '#C6C5EE', '--glow': 'rgba(91,95,199,.22)', '--name': '#43469E' } as CSSProperties}>
              <span className="academy-ai-updated">Updated Sep 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/copilot.png" alt="Copilot logo" /></span>
              <h3>Microsoft Copilot</h3>
              <div className="academy-chips"><span>Cowork</span><span>Work IQ</span><span>Notebooks</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>
          </div>

          <div className="academy-central-head">
            <h2>Learn and keep up</h2>
            <a className="academy-browse-link" href="/ai-academy/index.html">Browse the Academy &rarr;</a>
          </div>
          <div className="academy-central-grid" aria-label="AI Academy resources">
            <a className="academy-central-card" href="/ai-academy/foundations/index.html">
              <div className="academy-central-top">
                <span className="academy-central-eyebrow">Start here</span>
                <span className="academy-central-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13" cy="12" r="5" />
                    <circle cx="35" cy="12" r="5" />
                    <circle cx="24" cy="35" r="5" />
                    <path d="M17 15.5 21 30M31 15.5 27 30M18 12h12" />
                  </svg>
                </span>
              </div>
              <div className="academy-central-body">
                <h3>AI Foundations</h3>
                <p className="academy-central-desc">Understand how AI assistants work and what happens when you use them.</p>
                <ul className="academy-central-points">
                  <li>Learn the key concepts behind AI</li>
                  <li>Understand how its main features work</li>
                  <li>Know what affects the quality of its answers</li>
                </ul>
                <span className="academy-central-btn">Learn &rarr;</span>
              </div>
            </a>

            <a className="academy-central-card academy-central-card--practice" href="/ai-academy/tips/index.html">
              <div className="academy-central-top">
                <span className="academy-central-eyebrow">Practise</span>
                <span className="academy-central-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 12h20M10 24h20M10 36h14" />
                    <path d="m35 30 3 3 6-8" />
                    <circle cx="38" cy="12" r="3" />
                  </svg>
                </span>
              </div>
              <div className="academy-central-body">
                <h3>AI Best Practices</h3>
                <p className="academy-central-desc">Small habits that improve the quality and reliability of AI responses.</p>
                <ul className="academy-central-points">
                  <li>Give AI the right context and instructions</li>
                  <li>Know when to continue, restart or change approach</li>
                  <li>Review and improve weak or incomplete answers</li>
                </ul>
                <span className="academy-central-btn">Read this &rarr;</span>
              </div>
            </a>

            <a className="academy-central-card academy-central-card--updates" href="/ai-academy/news/index.html">
              <div className="academy-central-top">
                <span className="academy-central-eyebrow">Every week</span>
                <span className="academy-central-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="7" y="10" width="34" height="31" rx="5" />
                    <path d="M15 6v8M33 6v8M7 20h34" />
                    <path d="m17 30 5 5 10-11" />
                  </svg>
                </span>
              </div>
              <div className="academy-central-body">
                <h3>What&rsquo;s New</h3>
                <p className="academy-central-desc">Important updates across the major AI assistants, added every week.</p>
                <ul className="academy-central-points">
                  <li>One short entry per update, without release-note noise</li>
                  <li>Understand what changed and why it matters</li>
                  <li>Filter by assistant or browse by month</li>
                </ul>
                <span className="academy-central-btn">See updates &rarr;</span>
              </div>
            </a>
          </div>

          <div className="academy-row-head">
            <h3>Beyond the assistants</h3>
            <a className="academy-see-all" href="/ai-academy/tools/index.html">See all tools &rarr;</a>
          </div>
          <a className="academy-tools-strip" href="/ai-academy/tools/index.html">
            <span className="academy-tools-icons">
              <img src="/ai-academy/assets/logos/tools/lovable.png" alt="Lovable" />
              <img src="/ai-academy/assets/logos/tools/gamma.png" alt="Gamma AI" />
              <img src="/ai-academy/assets/logos/tools/napkin.png" alt="Napkin AI" />
              <img src="/ai-academy/assets/logos/tools/heygen.png" alt="HeyGen" />
              <img src="/ai-academy/assets/logos/tools/kling.png" alt="Kling" />
              <img src="/ai-academy/assets/logos/tools/elevenlabs.png" alt="ElevenLabs" />
              <img src="/ai-academy/assets/logos/tools/lmstudio.png" alt="LM Studio" />
              <img src="/ai-academy/assets/logos/tools/shortcut.png" alt="Shortcut AI" />
              <span className="more">+7</span>
            </span>
            <span className="academy-tools-go"><span className="academy-nud-btn violet">Watch the walkthroughs &rarr;</span></span>
          </a>
        </section>

      </div>
    </section>
  );
}
