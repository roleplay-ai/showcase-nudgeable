'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { formatBlogDate, type BlogPost } from '@/lib/blogs';

type Guide = { title: string; href?: string };
type Track = {
  n: string;
  color: 'yellow' | 'blue' | 'green' | 'orange' | 'purple' | 'red';
  icon: 'spark' | 'calendar' | 'chart' | 'workflow' | 'people' | 'shield';
  title: string;
  guides: Guide[];
  seeAll: string;
  note?: string;
};

const tracks: Track[] = [
  {
    n: 'Track 01', color: 'yellow', icon: 'spark', title: 'How GenAI Works',
    guides: [
      { title: 'How Generative AI Differs From Other AI', href: '/ai-academy/foundations/ai-foundations-genai-vs-other-ai.html' },
      { title: 'What Are Tokens and Why Do They Matter?', href: '/ai-academy/foundations/ai-foundations-tokens.html' },
      { title: 'What Is an AI Context Window?', href: '/ai-academy/foundations/ai-foundations-context-window.html' },
      { title: 'How AI Memory Works Across Conversations', href: '/ai-academy/foundations/ai-foundations-ai-memory.html' },
      { title: "AI Models vs Thinking Effort: What's the Difference?", href: '/ai-for-work/models-and-thinking-effort.html' },
      { title: 'When Should You Use a Smaller AI Model?', href: '/insights/blogs/when-should-you-use-a-lower-end-ai-model' },
      { title: 'Why the Same AI Model Can Suddenly Cost More', href: '/insights/blogs/claude-s-price-didn-t-change-but-your-api-bill-might' },
      { title: 'How AI Companies Make Money', href: '/ai-academy/foundations/ai-foundations-ai-economics.html' }
    ],
    seeAll: '/ai-academy/foundations/index.html'
  },
  {
    n: 'Track 02', color: 'blue', icon: 'calendar', title: 'AI for Everyday Work',
    guides: [
      { title: 'Browser, Desktop or Phone: Where Should You Use AI?', href: '/insights/blogs/where-should-you-run-claude-or-chatgpt-browser-desktop-app-or-phone' },
      { title: 'Chat vs Work: Which One Should You Use?', href: '/insights/blogs/when-should-you-use-chat-or-work' },
      { title: 'How AI Projects Keep Your Work and Context Together', href: '/ai-for-work/what-are-ai-projects.html' },
      { title: 'How AI Skills Save Reusable Ways of Working', href: '/ai-for-work/what-are-ai-skills.html' },
      { title: 'Which Work Should You Delegate to AI?' },
      { title: 'How to Keep Up With AI Without Following Everything' }
    ],
    seeAll: '/ai-for-work/index.html'
  },
  {
    n: 'Track 03', color: 'green', icon: 'chart', title: 'Data, Dashboards and Design',
    guides: [
      { title: 'Why AI Dashboards Are Harder to Share Than They Look', href: "/insights/blogs/you-built-a-dashboard-from-excel-with-ai-why-can-t-your-manager-use-it" },
      { title: 'What AI Can and Cannot Build Without Coding Knowledge', href: "/insights/blogs/why-you-can-t-build-a-proper-app-using-only-an-ai-chatbot-yet" },
      { title: 'How AI Generates Images and Video', href: '/ai-academy/foundations/ai-foundations-image-video.html' },
      { title: 'What Is Vibe Coding and Where Does It Work Well?', href: '/ai-for-work/what-is-vibe-coding.html' },
      { title: 'How Vibe Coding Builds Software From Plain English', href: '/ai-academy/foundations/ai-foundations-vibe-coding.html' }
    ],
    seeAll: '/ai-academy/index.html'
  },
  {
    n: 'Track 04', color: 'orange', icon: 'workflow', title: 'Workflow Automation',
    guides: [
      { title: 'How AI Connects to Your Apps', href: '/insights/blogs/apis-mcps-connectors-and-plugins-explained' },
      { title: 'What Is an API?', href: '/ai-academy/foundations/ai-foundations-api.html' },
      { title: 'How AI Uses External Tools', href: '/ai-academy/foundations/ai-foundations-tool-calling.html' },
      { title: 'What Companies Actually Build When They Create an AI Chatbot', href: '/insights/blogs/did-your-company-really-build-its-own-ai-chatbot-usually-one-of-four-things-happ' }
    ],
    seeAll: '/ai-academy/index.html'
  },
  {
    n: 'Track 05', color: 'purple', icon: 'people', title: 'Building AI Agents',
    guides: [
      { title: 'What Is an AI Agent and How Does It Work?', href: '/ai-academy/foundations/ai-foundations-ai-agents.html' },
      { title: 'What Is a Work Agent?', href: '/ai-for-work/what-is-a-work-agent.html' },
      { title: 'What Is a Coding Agent?', href: '/ai-for-work/what-is-a-coding-agent.html' },
      { title: 'How Agents Use Prompts, Context, Loops and Harnesses', href: '/insights/blogs/prompt-context-loop-and-harness-engineering-explained' }
    ],
    seeAll: '/ai-academy/foundations/index.html'
  },
  {
    n: 'Track 06', color: 'red', icon: 'shield', title: 'Governance and Data Security',
    guides: [
      { title: 'How Should We Think About Long-Term AI Risk?', href: '/insights/blogs/will-ai-kill-all-of-us-three-questions-no-one-can-answer-yet' },
      { title: 'What Changes When a Company Becomes AI-Native?', href: '/insights/blogs/what-makes-a-company-ai-native' },
      { title: 'How Should Companies Measure Employee AI Capability?' },
      { title: 'How Should Companies Measure Return on AI Investment?' }
    ],
    seeAll: '/ai-academy/index.html'
  }
];

const assistants = [
  { name: 'ChatGPT', logo: '/ai-academy/assets/logos/chatgpt.png', tagline: 'Work · Projects · Skills · Codex', href: '/ai-academy/chatgpt/index.html' },
  { name: 'Claude', logo: '/ai-academy/assets/logos/claude.png', tagline: 'Cowork · Artifacts · Skills · Projects', href: '/ai-academy/claude/index.html' },
  { name: 'Gemini', logo: '/ai-academy/assets/logos/gemini.svg', tagline: 'Spark · Gems · Notebook', href: '/ai-academy/gemini/index.html' },
  { name: 'Microsoft Copilot', logo: '/ai-academy/assets/logos/copilot.png', tagline: 'Cowork · Work IQ · Notebooks', href: '/ai-academy/copilot/index.html' }
];

function TrackCard({ track }: { track: Track }) {
  const [open, setOpen] = useState(false);
  const topics = track.guides.filter((guide) => guide.href).slice(0, 3);
  const topicTitles = new Set(topics.map((topic) => topic.title));
  const remaining = track.guides.filter((guide) => !topicTitles.has(guide.title));
  const visible = open ? track.guides : topics;

  return (
    <div className="aca2-card" data-color={track.color}>
      <div className="aca2-card-head">
        <div className="aca2-card-top">
          <span className="aca2-ico"><Icon name={track.icon} size={19} /></span>
          <span className="aca2-badge">Guides</span>
        </div>
        <span className="aca2-track-no">{track.n}</span>
        <h3>{track.title}</h3>
      </div>
      <ul className="aca2-guides">
        {visible.map((guide) => (
          <li key={guide.title} className={guide.href ? undefined : 'soon'}>
            {guide.href ? (
              <a href={guide.href}>{guide.title}</a>
            ) : (
              <span>{guide.title}<em>Coming soon</em></span>
            )}
          </li>
        ))}
      </ul>
      {remaining.length > 0 && (
        <button type="button" className={`aca2-toggle${open ? ' open' : ''}`} onClick={() => setOpen((value) => !value)}>
          <Icon name="chevron" size={14} />
          <span>{open ? 'Hide full list' : 'Show full list'}</span>
        </button>
      )}
      {track.note && <p className="aca2-note-inline">{track.note}</p>}
      <a className="aca2-all" href={track.seeAll}>See all guides &rarr;</a>
    </div>
  );
}

type AcademyPromoProps = {
  featuredPost?: BlogPost;
  otherPosts?: BlogPost[];
};

export function AcademyPromo({ featuredPost, otherPosts = [] }: AcademyPromoProps) {
  return (
    <section className="academy-promo aca2" id="academy">
      <div className="container">

        <div className="aca2-compact">
          <span className="eyebrow">Nudgeable AI Academy</span>
          <div className="aca2-compact-top">
            <div className="section-intro">
              <h2 className="aca2-claim">AI capability that continues after the workshop.</h2>
              <p className="aca2-sub">Practical guides and current AI updates help your team apply what they learned to everyday work.</p>
            </div>
            <a className="button button-primary button-compact" href="/ai-academy/index.html">Open the AI Academy <Icon name="arrow" size={17} /></a>
          </div>
          <div className="aca2-chain">
            <div className="aca2-phase"><span className="aca2-when">In the workshop</span><h4>Practise on real tasks</h4></div>
            <div className="aca2-phase"><span className="aca2-when">Back at work</span><h4>Apply with practical guides</h4></div>
            <div className="aca2-phase"><span className="aca2-when">As AI changes</span><h4>Keep capability current</h4></div>
          </div>
        </div>

        <div className="aca2-label"><span>The same six tracks, carried on</span><span className="aca2-label-hint">Open a track to see the guides inside</span></div>
        <div className="aca2-cards">
          {tracks.map((track) => <TrackCard track={track} key={track.n} />)}
        </div>

        {featuredPost && (
          <div className="aca2-feature">
            <div className="aca2-fbar"><div className="aca2-fbar-l"><span className="aca2-star">&#9733;</span><b>Featured from the blog</b></div><span className="aca2-fbar-r">Practical guidance from Insights</span></div>
            <div className="aca2-fgrid">
              <div className="aca2-read">
                <div className="aca2-read-track">{featuredPost.category}</div>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.excerpt}</p>
                <div className="aca2-read-meta">{featuredPost.author} &middot; {formatBlogDate(featuredPost.publishedAt)}</div>
                <a className="tlink-academy" href={`/insights/blogs/${featuredPost.slug}`}>Read the full article <Icon name="arrow" size={14} /></a>
              </div>
              {otherPosts.length > 0 && (
                <div className="aca2-also">
                  <div className="aca2-also-h">More from the blog</div>
                  <ul className="aca2-also-l">
                    {otherPosts.map((post) => (
                      <li key={post.slug}><a href={`/insights/blogs/${post.slug}`}>{post.title}<small>{post.category}</small></a></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="aca2-strip">
          {assistants.map((tool) => (
            <a className="aca2-tool" href={tool.href} key={tool.name}>
              <img src={tool.logo} alt={tool.name} />
              <span><b>{tool.name}</b><span>{tool.tagline}</span></span>
            </a>
          ))}
        </div>

        <div className="aca2-foot">
          <a className="button button-primary button-compact" href="/ai-academy/index.html">Open the AI Academy <Icon name="arrow" size={17} /></a>

        </div>

      </div>
    </section>
  );
}
