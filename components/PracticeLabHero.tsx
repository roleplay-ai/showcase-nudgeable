'use client';

import Image from 'next/image';
import { useState } from 'react';

type PanelKey = 'ask' | 'workflow' | 'news';

export function PracticeLabHero() {
  const [openPanel, setOpenPanel] = useState<PanelKey | null>(null);

  function toggle(panel: PanelKey) {
    setOpenPanel(current => (current === panel ? null : panel));
  }

  return (
    <div className="pl-hero-product" aria-label="Interactive AI Practice Lab preview">
      <div className="pl-product-window">
        <div className="pl-window-bar">
          <span className="pl-window-title">AI Practice Lab</span>
          <span className="pl-window-user"><span className="pl-avatar">G</span> Welcome back</span>
        </div>
        <div className="pl-screenshot-stage">
          <Image className="pl-hero-screenshot" src="/ai-practice-lab/hero-screenshot.png" alt="AI Practice Lab product screenshot" width={2048} height={1176} priority />

          <button type="button" className={`pl-hotspot flow${openPanel === 'workflow' ? ' active' : ''}`} onClick={() => toggle('workflow')}>
            <small>EXPLORE</small>100+ guided<br />workflows
          </button>
          <button type="button" className={`pl-hotspot ask${openPanel === 'ask' ? ' active' : ''}`} onClick={() => toggle('ask')}>
            <small>ASK NUDGE AI</small>Which AI tool<br />should I use?
          </button>
          <button type="button" className={`pl-hotspot news${openPanel === 'news' ? ' active' : ''}`} onClick={() => toggle('news')}>
            <small>UPDATED WEEKLY</small>New models and<br />features
          </button>

          <div className={`pl-product-panel${openPanel === 'ask' ? ' open' : ''}`}>
            <div className="pl-panel-head"><strong>Ask Nudge AI</strong><button type="button" className="pl-panel-close" aria-label="Close" onClick={() => setOpenPanel(null)}>×</button></div>
            <div className="pl-chat-box user">I have 5,000 survey comments. Which AI tool should I use to find the main themes?</div>
            <div className="pl-chat-box ai"><strong>Start with Claude or ChatGPT.</strong><br />Upload the file, ask for a first-pass theme map, then validate the highest-frequency themes against the source comments.</div>
            <div className="pl-panel-chips"><span className="pl-panel-chip">Compare tools</span><span className="pl-panel-chip">Recommend a workflow</span><span className="pl-panel-chip">Explain a feature</span></div>
          </div>

          <div className={`pl-product-panel${openPanel === 'workflow' ? ' open' : ''}`}>
            <div className="pl-panel-head"><strong>Popular workflows</strong><button type="button" className="pl-panel-close" aria-label="Close" onClick={() => setOpenPanel(null)}>×</button></div>
            <div className="pl-mini-workflow-grid">
              <div className="pl-mini-workflow">Analyze an Excel file<span>Data analysis</span></div>
              <div className="pl-mini-workflow">Build a presentation<span>Presentations</span></div>
              <div className="pl-mini-workflow">Research a market<span>Deep research</span></div>
              <div className="pl-mini-workflow">Automate a task<span>Automation</span></div>
              <div className="pl-mini-workflow">Build a simple app<span>Vibe coding</span></div>
              <div className="pl-mini-workflow">Create an AI agent<span>Agents</span></div>
            </div>
          </div>

          <div className={`pl-product-panel${openPanel === 'news' ? ' open' : ''}`}>
            <div className="pl-panel-head"><strong>What changed this week</strong><button type="button" className="pl-panel-close" aria-label="Close" onClick={() => setOpenPanel(null)}>×</button></div>
            <div className="pl-news-list">
              <div className="pl-news-item"><span className="pl-news-badge">NEW</span><div><strong>Claude adds a new workplace capability</strong><span>What changed, why it matters, and how to use it.</span></div></div>
              <div className="pl-news-item"><span className="pl-news-badge">NEW</span><div><strong>ChatGPT expands work automation</strong><span>A practical explanation for enterprise users.</span></div></div>
              <div className="pl-news-item"><span className="pl-news-badge">NEW</span><div><strong>Gemini updates its productivity tools</strong><span>See the workflows that become possible.</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
