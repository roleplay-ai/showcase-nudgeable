import { Icon } from '@/components/Icon';
import { formatBlogDate, type BlogPost } from '@/lib/blogs';

type Guide = { title: string; href: string };
type Track = {
  n: string;
  color: 'yellow' | 'blue' | 'green' | 'orange' | 'purple' | 'red';
  icon: 'spark' | 'calendar' | 'chart' | 'workflow' | 'people' | 'shield';
  title: string;
  topics: string[];
  guides: Guide[];
  seeAll: string;
  note?: string;
};

const tracks: Track[] = [
  {
    n: 'Track 01', color: 'yellow', icon: 'spark', title: 'How GenAI Works',
    topics: ['Models, tokens and context', 'Memory across conversations', 'Why answers vary between attempts'],
    guides: [
      { title: 'AI breaks text into smaller pieces before it processes it', href: '/ai-academy/foundations/ai-foundations-tokens.html' },
      { title: 'The context window is what the model can use for the current turn', href: '/ai-academy/foundations/ai-foundations-context-window.html' },
      { title: 'Memory is how an AI product carries information into future chats', href: '/ai-academy/foundations/ai-foundations-ai-memory.html' },
      { title: 'GenAI vs other AI: generation, prediction and rules', href: '/ai-academy/foundations/ai-foundations-genai-vs-other-ai.html' }
    ],
    seeAll: '/ai-academy/foundations/index.html'
  },
  {
    n: 'Track 02', color: 'blue', icon: 'calendar', title: 'AI for Everyday Work',
    topics: ['Asking well and checking the answer', 'Research, writing and meetings', 'All ChatGPT features for work'],
    guides: [
      { title: 'Give the model context before you ask', href: '/ai-academy/tips/give-context-before-you-ask.html' },
      { title: 'Say it before you type it', href: '/ai-academy/tips/say-it-before-you-type.html' },
      { title: "Your instructions and your content aren't the same thing", href: '/ai-academy/tips/separate-instructions-from-content.html' },
      { title: 'Work: all ChatGPT features in one place', href: '/ai-academy/chatgpt/work.html' }
    ],
    seeAll: '/ai-academy/tips/index.html'
  },
  {
    n: 'Track 03', color: 'green', icon: 'chart', title: 'Data, Dashboards and Design',
    topics: ['Reading a spreadsheet with AI', 'Charts from a raw file', 'Turning a report into slides'],
    guides: [
      { title: 'Analyse large data with Shortcut AI', href: '/ai-academy/tools/index.html#c-data-and-presentations' },
      { title: 'Build flowcharts with Napkin AI', href: '/ai-academy/tools/index.html#c-data-and-presentations' },
      { title: 'Build presentations with Gamma AI', href: '/ai-academy/tools/index.html#c-data-and-presentations' },
      { title: 'A table is easier to check than a paragraph', href: '/ai-academy/tips/table-easier-than-paragraph.html' }
    ],
    seeAll: '/ai-academy/tools/index.html#c-data-and-presentations'
  },
  {
    n: 'Track 04', color: 'orange', icon: 'workflow', title: 'Workflow Automation',
    topics: ['Connectors and plugins', 'Automating a weekly report', 'Where automation goes wrong'],
    guides: [
      { title: 'Build automations with Zapier', href: '/ai-academy/tools/index.html#c-agents-and-automation' },
      { title: 'Build a text based agent with Chatbase', href: '/ai-academy/tools/index.html#c-agents-and-automation' },
      { title: 'Build a website with Lovable', href: '/ai-academy/tools/index.html#c-agents-and-automation' },
      { title: 'Run open source models on your laptop with LM Studio', href: '/ai-academy/tools/index.html#c-agents-and-automation' }
    ],
    seeAll: '/ai-academy/tools/index.html#c-agents-and-automation'
  },
  {
    n: 'Track 05', color: 'purple', icon: 'people', title: 'Building AI Agents',
    topics: ['What an agent can run on its own', 'Tool calling, explained plainly', 'Try the interactive agent lab'],
    guides: [
      { title: 'An agent works toward a goal instead of waiting for every next prompt', href: '/ai-academy/foundations/ai-foundations-ai-agents.html' },
      { title: 'Tool calling lets AI get information or take action outside the chat', href: '/ai-academy/foundations/ai-foundations-tool-calling.html' },
      { title: 'Anatomy of an AI Agent System (interactive)', href: '/ai-academy/foundations/anatomy-of-ai-agent.html' },
      { title: 'Build a voice agent with Vapi', href: '/ai-academy/tools/index.html#c-agents-and-automation' }
    ],
    seeAll: '/ai-academy/foundations/index.html'
  },
  {
    n: 'Track 06', color: 'red', icon: 'shield', title: 'Governance and Data Security',
    topics: ['What company information can go where', 'Copyright and ownership', 'Human review that catches things'],
    guides: [
      { title: 'Check whether your data is training the next model', href: '/ai-academy/tips/check-data-training-settings.html' }
    ],
    seeAll: '/ai-academy/index.html',
    note: 'More governance guides are on the way.'
  }
];

const assistants = [
  { name: 'ChatGPT', logo: '/ai-academy/assets/logos/chatgpt.png', tagline: 'Work · Projects · Skills · Codex', href: '/ai-academy/chatgpt/index.html' },
  { name: 'Claude', logo: '/ai-academy/assets/logos/claude.png', tagline: 'Cowork · Artifacts · Skills · Projects', href: '/ai-academy/claude/index.html' },
  { name: 'Gemini', logo: '/ai-academy/assets/logos/gemini.svg', tagline: 'Spark · Gems · Notebook', href: '/ai-academy/gemini/index.html' },
  { name: 'Microsoft Copilot', logo: '/ai-academy/assets/logos/copilot.png', tagline: 'Cowork · Work IQ · Notebooks', href: '/ai-academy/copilot/index.html' }
];

type AcademyPromoProps = {
  featuredPost?: BlogPost;
  otherPosts?: BlogPost[];
};

export function AcademyPromo({ featuredPost, otherPosts = [] }: AcademyPromoProps) {
  return (
    <section className="academy-promo aca2" id="academy">
      <div className="container">

        <div className="aca2-head">
          <div className="section-intro">
            <span className="eyebrow">Nudgeable AI Academy</span>
            <h2 className="aca2-claim">Continuous AI capability building, after the workshop.</h2>
            <p className="aca2-sub">The Academy carries the same six learning tracks into day-to-day work, with practical guides that evolve as the tools change.</p>
          </div>
          <div className="aca2-live" aria-label="What the Academy provides">
            <div className="aca2-live-row"><span className="aca2-live-dot" /><span>Practical guides, written and kept current</span></div>
            <div className="aca2-live-row"><span className="aca2-live-dot" /><span>New guidance as AI tools change</span></div>
            <div className="aca2-stamp"><span className="aca2-pulse" />Updated regularly</div>
          </div>
        </div>

        <div className="aca2-link">
          <h3>The workshop and the Academy are the same program.</h3>
          <div className="aca2-chain">
            <div className="aca2-phase"><span className="aca2-when">On the day</span><h4>The workshop</h4><p>People practise on their own live tasks, in their own function, with help in the room.</p></div>
            <div className="aca2-phase"><span className="aca2-when">Back at work</span><h4>We come back</h4><p>What changed in the tools, and the real problems your team hit trying to automate their work.</p></div>
            <div className="aca2-phase"><span className="aca2-when">Any day after</span><h4>The Academy</h4><p>The same learning tracks remain available, with guidance kept current as the tools change.</p></div>
          </div>
        </div>

        <div className="aca2-label"><span>The same six tracks, carried on</span><span className="aca2-label-hint">Open a track to see the guides inside</span></div>
        <div className="aca2-cards">
          {tracks.map((track) => (
            <details className="aca2-card" data-color={track.color} key={track.n}>
              <summary>
                <div className="aca2-card-top">
                  <span className="aca2-ico"><Icon name={track.icon} size={19} /></span>
                  <span className="aca2-badge">Guides</span>
                </div>
                <span className="aca2-track-no">{track.n}</span>
                <h3>{track.title}</h3>
                <ul className="aca2-topics">
                  {track.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
                <span className="aca2-toggle">
                  <Icon name="chevron" size={14} />
                  <span className="off">Show guide list</span>
                  <span className="on">Hide guides</span>
                </span>
              </summary>
              <ul className="aca2-guides">
                {track.guides.map((guide) => (
                  <li key={guide.title}><a href={guide.href}>{guide.title}</a></li>
                ))}
              </ul>
              {track.note && <p className="aca2-note-inline">{track.note}</p>}
              <a className="aca2-all" href={track.seeAll}>See all guides &rarr;</a>
            </details>
          ))}
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
