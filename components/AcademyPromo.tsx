import type { CSSProperties } from 'react';

export function AcademyPromo() {
  return (
    <section className="academy-promo">
      <div className="container">

        <section className="academy-banner">
          <div className="academy-banner-copy">
            <div className="academy-banner-eyebrow">Practical AI for work</div>
            <h2>Nudgeable AI Academy</h2>
            <p className="academy-banner-lead">Every assistant explained feature by feature, in plain language, with the ideas underneath that make all of them easier to use.</p>
            <div className="academy-banner-actions">
              <a className="academy-btn" href="#academy-assistants">Pick your assistant &rarr;</a>
              <a className="academy-btn academy-btn-ghost" href="/ai-academy/foundations/index.html">Start with the basics</a>
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
              <span className="academy-ai-updated">Updated Aug 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/chatgpt.png" alt="ChatGPT logo" /></span>
              <h3>ChatGPT</h3>
              <div className="academy-chips"><span>Work</span><span>Projects</span><span>Skills</span><span>Codex</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>

            <a className="academy-ai-card" href="/ai-academy/claude/index.html" style={{ '--tint': '#FCEBE1', '--brand': '#D97757', '--edge': '#F0C7B2', '--glow': 'rgba(217,119,87,.22)', '--name': '#A9502F' } as CSSProperties}>
              <span className="academy-ai-updated">Updated Aug 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/claude.png" alt="Claude logo" /></span>
              <h3>Claude</h3>
              <div className="academy-chips"><span>Cowork</span><span>Artifacts</span><span>Skills</span><span>Projects</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>

            <a className="academy-ai-card" href="/ai-academy/gemini/index.html" style={{ '--tint': '#E3EDFD', '--brand': '#4285F4', '--edge': '#B9D0F8', '--glow': 'rgba(66,133,244,.20)', '--name': '#1A56C4' } as CSSProperties}>
              <span className="academy-ai-updated">Updated Aug 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/gemini.svg" alt="Gemini logo" /></span>
              <h3>Gemini</h3>
              <div className="academy-chips"><span>Spark</span><span>Gems</span><span>Notebook</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>

            <a className="academy-ai-card" href="/ai-academy/copilot/index.html" style={{ '--tint': '#ECEBFB', '--brand': '#5B5FC7', '--edge': '#C6C5EE', '--glow': 'rgba(91,95,199,.22)', '--name': '#43469E' } as CSSProperties}>
              <span className="academy-ai-updated">Updated Aug 2026</span>
              <span className="academy-ai-mark"><img src="/ai-academy/assets/logos/copilot.png" alt="Copilot logo" /></span>
              <h3>Microsoft Copilot</h3>
              <div className="academy-chips"><span>Cowork</span><span>Work IQ</span><span>Notebooks</span><span className="more">and more</span></div>
              <span className="academy-nud-btn ink">Know more &rarr;</span>
            </a>
          </div>

          <div className="academy-row-head">
            <h3>Learn and keep up</h3>
            <a className="academy-see-all" href="/ai-academy/index.html">Browse the Academy &rarr;</a>
          </div>
          <div className="academy-learn">
            <a className="academy-ln-card" href="/ai-academy/foundations/index.html" style={{ '--c': '#FFCE00', '--bg': '#FFFDF5' } as CSSProperties}>
              <span className="academy-tag">Start here</span>
              <h3>AI Foundations</h3>
              <p>Ten short topics on how modern AI actually works, in a sensible order.</p>
              <ul className="academy-ln-list">
                <li>Tokens, context windows and memory</li>
                <li>Tool calling, agents and where cost comes from</li>
              </ul>
              <span className="academy-nud-btn violet">Learn &rarr;</span>
            </a>
            <a className="academy-ln-card" href="/ai-academy/tips/index.html" style={{ '--c': '#623CEA', '--tagink': '#fff', '--bg': '#FBFAFF' } as CSSProperties}>
              <span className="academy-tag">Practise</span>
              <h3>AI Best Practices</h3>
              <p>Small habits that change the quality of an answer. Each takes a minute to read.</p>
              <ul className="academy-ln-list">
                <li>What to put in a brief before you ask</li>
                <li>When to start fresh instead of pushing on</li>
              </ul>
              <span className="academy-nud-btn">Read this &rarr;</span>
            </a>
            <a className="academy-ln-card" href="/ai-academy/news/index.html" style={{ '--c': '#23CE68', '--tagink': '#fff', '--bg': '#F8FDFA' } as CSSProperties}>
              <span className="academy-tag">Every week</span>
              <h3>What&rsquo;s New</h3>
              <p>The updates across the major assistants that change how you work.</p>
              <ul className="academy-ln-list">
                <li>One short entry per update, no release-note noise</li>
                <li>Filter by tool, browse by month</li>
              </ul>
              <span className="academy-nud-btn ink">See updates &rarr;</span>
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
