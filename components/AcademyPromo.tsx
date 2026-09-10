import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icon';

export function AcademyPromo() {
  return (
    <section className="academy-promo">
      <div className="container">

        <section className="academy-lead">
          <div className="academy-lead-copy">
            <div className="eyebrow light">Practical AI for Work</div>
            <h2>Nudgeable AI Academy</h2>
            <p>Every assistant explained feature by feature, in plain language, with the ideas underneath that make all of them easier to use.</p>
            <div className="academy-lead-actions">
              <a className="button button-primary button-compact" href="/ai-academy/index.html">Access AI Academy <Icon name="arrow" size={17} /></a>
            </div>
          </div>
          <div className="academy-categories" aria-label="Content inside the AI Academy">
            <a className="academy-category" href="/ai-academy/tools/index.html"><span className="academy-category-icon" style={{ '--category-color': '#ffce00' } as CSSProperties}>↗</span><strong>AI Workflows</strong></a>
            <a className="academy-category" href="/ai-academy/news/index.html"><span className="academy-category-icon" style={{ '--category-color': '#23ce68' } as CSSProperties}>●</span><strong>AI News</strong></a>
            <a className="academy-category" href="/ai-academy/tips/index.html"><span className="academy-category-icon" style={{ '--category-color': '#f68a29' } as CSSProperties}>✓</span><strong>Best Practices</strong></a>
            <a className="academy-category" href="/ai-academy/index.html"><span className="academy-category-icon" style={{ '--category-color': '#3696fc' } as CSSProperties}>▤</span><strong>Enterprise AI Guides</strong></a>
            <a className="academy-category" href="/ai-academy/foundations/index.html"><span className="academy-category-icon" style={{ '--category-color': '#b7a4ff' } as CSSProperties}>◎</span><strong>AI Foundations</strong></a>
            <a className="academy-category" href="/ai-academy/tools/index.html"><span className="academy-category-icon" style={{ '--category-color': '#ed4551' } as CSSProperties}>✦</span><strong>Tool Walkthroughs</strong></a>
          </div>
        </section>

        <div className="academy-subhead"><h3>Explore your AI assistant</h3><span>Compact guides covering the features people use inside the four major workplace assistants.</span></div>
        <div className="assistant-grid" id="academy-assistants">
          <a className="assistant-card chatgpt" href="/ai-academy/chatgpt/index.html">
            <div className="assistant-top"><span className="assistant-logo"><img src="/ai-academy/assets/logos/chatgpt.png" alt="ChatGPT logo" /></span><span className="assistant-arrow"><Icon name="arrow" size={14} /></span></div>
            <h3>ChatGPT</h3>
            <p>Work · Projects · Skills · Codex</p>
            <b>View guide</b>
          </a>
          <a className="assistant-card claude" href="/ai-academy/claude/index.html">
            <div className="assistant-top"><span className="assistant-logo"><img src="/ai-academy/assets/logos/claude.png" alt="Claude logo" /></span><span className="assistant-arrow"><Icon name="arrow" size={14} /></span></div>
            <h3>Claude</h3>
            <p>Cowork · Artifacts · Skills · Projects</p>
            <b>View guide</b>
          </a>
          <a className="assistant-card gemini" href="/ai-academy/gemini/index.html">
            <div className="assistant-top"><span className="assistant-logo"><img src="/ai-academy/assets/logos/gemini.svg" alt="Gemini logo" /></span><span className="assistant-arrow"><Icon name="arrow" size={14} /></span></div>
            <h3>Gemini</h3>
            <p>Spark · Gems · Notebook</p>
            <b>View guide</b>
          </a>
          <a className="assistant-card copilot" href="/ai-academy/copilot/index.html">
            <div className="assistant-top"><span className="assistant-logo"><img src="/ai-academy/assets/logos/copilot.png" alt="Microsoft Copilot logo" /></span><span className="assistant-arrow"><Icon name="arrow" size={14} /></span></div>
            <h3>Microsoft Copilot</h3>
            <p>Cowork · Work IQ · Notebooks</p>
            <b>View guide</b>
          </a>
        </div>

        <div className="academy-subhead"><h3>Learn and keep up</h3><span>Foundational knowledge, practical habits and a clear view of what changed this week.</span></div>
        <div className="learn-grid">
          <a className="learn-card foundation" href="/ai-academy/foundations/index.html">
            <div className="learn-card-top">
              <span className="icon-box">
                <svg className="learn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M8 4v16M11 8h5M11 12h5" /></svg>
              </span>
              <span className="learn-badge">Start here</span>
            </div>
            <h3>AI Foundations</h3>
            <p>Understand models, tokens, context, hallucinations, memory, tools and agents.</p>
            <b>Start learning <Icon name="arrow" size={14} /></b>
          </a>
          <a className="learn-card practice" href="/ai-academy/tips/index.html">
            <div className="learn-card-top">
              <span className="icon-box">
                <svg className="learn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h11M8 12h11M8 19h11" /><path d="m3 5 1 1 2-2M3 12l1 1 2-2M3 19l1 1 2-2" /></svg>
              </span>
              <span className="learn-badge">Practise</span>
            </div>
            <h3>AI Best Practices</h3>
            <p>Give AI better context, improve weak output and check important work.</p>
            <b>Read the notes <Icon name="arrow" size={14} /></b>
          </a>
          <a className="learn-card news" href="/ai-academy/news/index.html">
            <div className="learn-card-top">
              <span className="icon-box">
                <svg className="learn-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M7 14h4M7 17h8" /></svg>
              </span>
              <span className="learn-badge">Every week</span>
            </div>
            <h3>What&rsquo;s New in AI</h3>
            <p>Follow important changes across major AI assistants, explained every week.</p>
            <b>See the updates <Icon name="arrow" size={14} /></b>
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

        <div className="academy-subhead"><h3>Try it yourself</h3><span>Two interactive labs that show how much work people can now hand over or build with AI.</span></div>
        <div className="feature-grid">
          <a className="feature-card agent" href="/ai-academy/foundations/anatomy-of-ai-agent.html">
            <div><span className="tag">Interactive explainer</span><h3>How AI Agents Work</h3><p>See how instructions, models, context, tools, memory, feedback, evaluation and the agent harness work together.</p></div>
            <span className="feature-link">Explore the agent <Icon name="arrow" size={14} /></span>
          </a>
          <a className="feature-card vibe" href="/ai-academy/foundations/vibe-coding-simulation.html">
            <div><span className="tag">Build with AI</span><h3>Vibe Coding</h3><p>Learn how to create working websites and apps by describing, testing and improving what you want.</p></div>
            <span className="feature-link">See how it works <Icon name="arrow" size={14} /></span>
          </a>
        </div>

      </div>
    </section>
  );
}
