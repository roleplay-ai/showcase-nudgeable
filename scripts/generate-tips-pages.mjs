#!/usr/bin/env node
/**
 * Generate individual AI Best Practices tip pages for SEO and sharing.
 * Run: node scripts/generate-tips-pages.mjs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TIPS_DIR = join(__dirname, '..', 'public', 'ai-academy', 'tips');

const colors = ['#FFCE00', '#F68A29', '#623CEA', '#23CE68', '#ED4551', '#3696FC'];

const notes = [
  {
    slug: 'give-context-before-you-ask',
    emoji: '🎯',
    title: 'Give the model context before you ask',
    situation: 'Most people type a task and hope the model fills in the rest correctly. It won\'t, not because it\'s careless, but because it has no idea who you are or what "good" looks like to you.',
    why: 'Without context, the model has to guess your audience, your standards, and your format, so it defaults to something generic. That gap is where most weak first drafts come from.',
    what: 'Two sentences of context, plus one real example of the output you want, changes the entire quality of what comes back. This costs you ten seconds. Skipping it costs you three rounds of corrections.',
    tryText: '"I\'m writing X for Y audience. Here\'s an example of the format I want: [paste example]."'
  },
  {
    slug: 'confidence-percentage-means-nothing',
    emoji: '🎲',
    title: 'That confidence percentage means nothing',
    situation: 'When an AI tells you it\'s "85% confident," it hasn\'t measured anything. It\'s producing a number that sounds precise because precise numbers sound trustworthy.',
    why: 'There\'s no calculation behind it. The model produces a plausible-sounding number the same way it produces a plausible-sounding sentence.',
    what: 'If you want to know how solid an answer is, ask a better question instead of a number.',
    tryText: '"Skip the confidence percentage. Tell me what would make this answer wrong."'
  },
  {
    slug: 'dont-trust-own-thinking-account',
    emoji: '🪞',
    title: 'Don\'t trust its account of its own thinking',
    situation: 'Ask an AI why it gave a certain answer, and it will tell you a story. The story sounds coherent. It\'s often wrong.',
    why: 'The model doesn\'t have access to its actual reasoning process, only to what a plausible explanation would look like after the fact.',
    what: 'If you need to know what really happened, look at the output itself, not the explanation attached to it.',
    tryText: '"Show me the actual data or steps you used, not just your summary of them."'
  },
  {
    slug: 'one-shot-vs-three-small-steps',
    emoji: '🪜',
    title: 'One shot rarely beats three small ones',
    situation: 'Ask for a finished document in a single prompt, and you\'ll usually get structure, content, and polish all fighting each other.',
    why: 'One-shot generation tries to solve outline, substance, and tone at the same time, and quality drops across all three.',
    what: 'Break it up. Outline first. Then draft. Then edit. Each stage is a chance to catch a problem before it compounds into the next one.',
    tryText: '"Give me just the outline first. We\'ll draft section by section after."'
  },
  {
    slug: 'not-every-task-best-model',
    emoji: '⚖️',
    title: 'Not every task deserves your best model',
    situation: 'Using your strongest model for a quick brainstorm is like hiring a surgeon to put on a bandage.',
    why: 'Not every task carries the same stakes, and using maximum power everywhere wastes time, money, and often speed.',
    what: 'Save the top-tier model for what actually carries risk: client work, analysis, anything with your name on it. Use something fast and cheap for the rest.',
    tryText: 'Switch models based on the task, not out of habit.'
  },
  {
    slug: 'let-it-say-i-dont-know',
    emoji: '🤷',
    title: 'Let it say "I don\'t know"',
    situation: 'Left unguided, an AI will guess rather than admit a gap, because guessing looks more helpful in the moment.',
    why: 'Models are trained to be helpful above all, and an unanswered question can read as a failure to be helpful, so they fill it anyway.',
    what: 'Tell it explicitly that "I don\'t know" is an acceptable answer, and you\'ll get fewer confident wrong answers and more honest ones.',
    tryText: '"If you\'re not sure, say so instead of guessing."'
  },
  {
    slug: 'replace-gut-feel-with-rubric',
    emoji: '📏',
    title: 'Replace "does this feel right" with a rubric',
    situation: 'Judging AI output by gut feel is inconsistent from one day to the next.',
    why: '"Good" is vague and shifts depending on your mood, your deadline, and how tired you are when you read it.',
    what: 'Before you review anything important, write down three or four things you\'re actually checking for. Score against those.',
    tryText: '"Score this against: accuracy, completeness, tone match, and clarity."'
  },
  {
    slug: 'save-prompts-that-worked',
    emoji: '🗂️',
    title: 'The prompt that worked once is worth saving',
    situation: 'Everyone rewrites the same instructions from scratch every week because the good version got lost in a chat that\'s now three days old.',
    why: 'Good prompts are rare and specific, but chat history isn\'t searchable the way a real document is, so the work quietly disappears.',
    what: 'Keep a running document of prompts that actually delivered, tagged by what they\'re for.',
    tryText: 'Start a doc titled "Prompts that worked" and add to it weekly.'
  },
  {
    slug: 'table-easier-than-paragraph',
    emoji: '📊',
    title: 'A table is easier to check than a paragraph',
    situation: 'When accuracy matters, ask for the answer in a format you can actually audit.',
    why: 'A paragraph hides its own errors inside flowing sentences, where a wrong fact reads just as smoothly as a right one.',
    what: 'A table with clear columns, like claim, source, and confidence, exposes errors immediately.',
    tryText: '"Give me this as a table with columns for claim, source, and confidence."'
  },
  {
    slug: 'long-confident-not-same-as-right',
    emoji: '🎈',
    title: 'Long and confident isn\'t the same as right',
    situation: 'A single detailed answer feels finished. It isn\'t verified.',
    why: 'Length creates an illusion of thoroughness that has nothing to do with accuracy.',
    what: 'Before you act on anything that matters, ask for the short version first, check if it holds up, then decide whether the long one is worth trusting.',
    tryText: '"Give me the short version first. If it still holds up, we\'ll expand it."'
  },
  {
    slug: 'say-it-before-you-type',
    emoji: '🎙️',
    title: 'Say it before you type it',
    situation: 'Typing a prompt forces you to compress your thinking before you\'ve finished having it.',
    why: 'Speech is faster and more natural than typing, so it captures the intent before you start editing yourself.',
    what: 'Talk it through first, then tighten the wording in text. This matters most for anything complicated.',
    tryText: 'Dictate your first attempt, then edit the transcript before sending it.'
  },
  {
    slug: 'make-model-show-assumptions',
    emoji: '🔍',
    title: 'Make the model show its assumptions',
    situation: 'Every ambiguous prompt gets resolved one way, silently, by whatever the model guesses you meant.',
    why: 'You don\'t find out the guess was wrong until you\'re looking at a finished output that missed the point.',
    what: 'Ask it to state its assumptions about scope and audience before it answers, and you catch the wrong guess early.',
    tryText: '"Before you answer, tell me what you\'re assuming about scope and audience."'
  },
  {
    slug: 'separate-instructions-from-content',
    emoji: '🧷',
    title: 'Your instructions and your content aren\'t the same thing',
    situation: 'Paste a document into a prompt without separating it from your actual task, and the model can lose track of which is which.',
    why: 'Instructions and material sit in the same block of text, so the model sometimes follows a line buried inside the pasted content instead of your actual task.',
    what: 'Label them clearly. One block for what you want done, one block for what it\'s working from.',
    tryText: 'TASK: [your instruction]. CONTENT TO USE: [pasted material].'
  },
  {
    slug: 'derailed-conversation-start-fresh',
    emoji: '🔄',
    title: 'A derailed conversation doesn\'t fix itself',
    situation: 'After enough back-and-forth edits, a chat can anchor on an earlier wrong direction and never fully shake it.',
    why: 'Each new message builds on everything before it, so an early misstep keeps resurfacing no matter how clearly you correct it.',
    what: 'When you notice this happening, don\'t keep pushing. Open a new chat and carry over your latest requirements.',
    tryText: 'Copy your latest requirements into a new chat instead of the tenth edit of the same one.'
  },
  {
    slug: 'use-the-app-not-browser',
    emoji: '📱',
    title: 'You\'re probably still using AI in a browser tab',
    situation: 'Most people never install the apps they\'re already paying for, and stay stuck opening a tab every time.',
    why: 'A browser tab is the default first touchpoint, so it becomes the only one, even after the apps exist.',
    what: 'The mobile and desktop apps let you work with AI while walking, commuting, or away from your desk, and voice mode makes dictating a prompt almost effortless.',
    tryText: 'Download the app you\'re already paying for and try voice mode once this week.'
  },
  {
    slug: 'check-data-training-settings',
    emoji: '🔒',
    title: 'Check whether your data is training the next model',
    situation: 'Most AI tools default to using your conversations to improve future versions, and this setting is rarely surfaced clearly.',
    why: 'Training on user data is the default because it improves the product for the company, not because it\'s what most people would choose if asked.',
    what: 'Look for it under account or privacy settings, usually something like "improve the model" or "data retention." Turn it off once.',
    tryText: 'Go to Settings, then Privacy, and turn off model training before you paste anything sensitive.'
  },
  {
    slug: 'ai-detection-built-in-check',
    emoji: '💧',
    title: 'Detection is moving from guesswork to a built-in check',
    situation: 'As AI writing gets harder to spot by reading alone, providers are building verification into the output itself.',
    why: 'Reading for tone and style is a losing game as models keep improving, so the more durable signal has to live in the file, not the reader\'s judgment.',
    what: 'Google\'s SynthID watermarks AI-generated images and audio. Claude embeds an invisible statistical pattern into text that a detector can check without changing how it reads.',
    tryText: 'If a tool offers a provenance or watermark check, use it instead of relying on instinct.'
  },
  {
    slug: 'ten-habits-ai-writing-gives-away',
    emoji: '🕵️',
    title: 'Ten habits that give AI writing away',
    situation: 'Language models lean on a small set of stylistic habits because they\'re trained to sound safe and impressive, and those habits repeat across outputs regardless of topic.',
    why: 'The habits come from training on what reads as polished and safe, so the same patterns surface again and again.',
    list: [
      'Overblown importance ("this marks a pivotal moment")',
      'Name dropping without context ("featured by Wired, Forbes and BBC")',
      'Commentary that sounds deep but says nothing ("this shows how layered the issue is")',
      'Sales language in neutral writing ("nestled in the heart of the city")',
      'Unnamed experts ("experts argue," "many believe")',
      'Dressed-up verbs ("serves as" instead of "is")',
      'Forced contrast ("not just a tool, but…")',
      'Everything arriving in threes',
      'Caveats nobody needed ("every situation is different")',
      'Chatbot phrasing itself ("unleash," "it\'s worth noting")'
    ],
    tryText: 'Read the piece once for content, then again just hunting for these ten patterns. Spot three or more, and treat it as a draft, not a finished answer.'
  }
];

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function metaBlock(title, description, path, ogType = 'article') {
  const t = esc(title);
  const d = esc(description);
  const p = esc(path);
  return `<link rel="canonical" href="${p}">
<link rel="icon" href="/icon.png" type="image/png" sizes="256x256">
<link rel="apple-touch-icon" href="/icon.png">
<meta property="og:site_name" content="Nudgeable">
<meta property="og:locale" content="en_US">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${p}">
<meta property="og:image" content="/ai-academy/assets/og-share.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Nudgeable AI Best Practices">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="/ai-academy/assets/og-share.png">
<meta name="theme-color" content="#FEFCFA">
<!-- academy-head-meta -->`;
}

function bodyBlock(note) {
  if (note.list) {
    return `<div class="section">
           <div class="section-flag flag-why">Why it happens</div>
           <p>${esc(note.why)}</p>
         </div>
         <div class="section">
           <ul>${note.list.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
         </div>`;
  }
  return `<div class="section"><p>${esc(note.situation)}</p></div>
         <div class="section">
           <div class="section-flag flag-why">Why it happens</div>
           <p>${esc(note.why)}</p>
         </div>
         <div class="section">
           <div class="section-flag flag-do">What to do</div>
           <p>${esc(note.what)}</p>
         </div>`;
}

function renderTipPage(note, index) {
  const pageTitle = `${note.title} · AI Best Practices`;
  const description = note.situation || note.why;
  const path = `/ai-academy/tips/${note.slug}.html`;
  const color = colors[index % colors.length];
  const prev = index > 0 ? notes[index - 1] : null;
  const next = index < notes.length - 1 ? notes[index + 1] : null;

  const prevLink = prev
    ? `<a href="${prev.slug}.html">← Previous</a>`
    : `<a class="disabled" aria-disabled="true">← Previous</a>`;
  const nextLink = next
    ? `<a href="${next.slug}.html">Next →</a>`
    : `<a class="disabled" aria-disabled="true">Next →</a>`;

  const dots = notes.map((_, idx) =>
    `<span class="${idx === index ? 'active' : ''}"></span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${metaBlock(pageTitle, description, path)}
<meta name="description" content="${esc(description)}" />
<title>${esc(pageTitle)}</title>
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="../assets/typography.css">
<link rel="stylesheet" href="../assets/standardize.css">
</head>
<body>

<header class="lab-topbar">
  <a class="lab-home" href="../index.html">&larr; Nudgeable AI Academy</a>
  <div class="crumb">AI Best Practices</div>
  <div class="top-note">Get more out of any assistant</div>
</header>

<div class="detail-wrap">
  <a class="back-link" href="index.html"><span class="arrow">←</span> Back to all notes</a>
  <article class="index-card">
    <div class="pin" style="background:${color}"></div>
    <div class="stamp-num">${note.emoji}</div>
    <h1>${esc(note.title)}</h1>
    ${bodyBlock(note)}
    <div class="section">
      <div class="try-box">${esc(note.tryText)}</div>
    </div>
  </article>
  <nav class="nav-buttons" aria-label="Adjacent notes">
    ${prevLink}
    ${nextLink}
  </nav>
  <div class="nav-footer">
    <div class="dots" aria-hidden="true">${dots}</div>
    <span>Nudgeable AI Best Practices</span>
  </div>
</div>

<script src="../assets/rail.js"></script>
</body>
</html>
`;
}

function renderIndexPage() {
  const cards = notes.map((note, i) => {
    const color = colors[i % colors.length];
    return `<a class="card" href="${note.slug}.html">
      <div class="tab" style="background:${color}"></div>
      <div class="num">${note.emoji}</div>
      <h3>${esc(note.title)}</h3>
      <span class="read-btn">Read this →</span>
    </a>`;
  }).join('\n    ');

  const path = '/ai-academy/tips/index.html';
  const title = 'AI Best Practices';
  const description = 'Small changes to how you ask, drawn from using these tools every day. Each note takes about a minute to read.';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${metaBlock(title, description, path, 'website')}
<meta name="description" content="${esc(description)}" />
<title>${title}</title>
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="../assets/typography.css">
<link rel="stylesheet" href="../assets/standardize.css">
</head>
<body>

<header class="lab-topbar">
  <a class="lab-home" href="../index.html">&larr; Nudgeable AI Academy</a>
  <div class="crumb">AI Best Practices</div>
  <div class="top-note">Get more out of any assistant</div>
</header>

<div class="wrap">
  <div class="hero">
    <div class="tape"></div>
    <div class="hero-label">AI Best Practices</div>
    <h1>Get more out of any assistant</h1>
    <p>Small changes to how you ask, drawn from using these tools every day. Each note takes about a minute to read.</p>
  </div>

  <div class="grid">
    ${cards}
  </div>
</div>

<script src="../assets/rail.js"></script>
</body>
</html>
`;
}

// Generate pages
writeFileSync(join(TIPS_DIR, 'index.html'), renderIndexPage(), 'utf8');
console.log('Wrote tips/index.html');

notes.forEach((note, i) => {
  const file = join(TIPS_DIR, `${note.slug}.html`);
  writeFileSync(file, renderTipPage(note, i), 'utf8');
  console.log(`Wrote tips/${note.slug}.html`);
});

// Export slugs for sitemap
const slugsPath = join(TIPS_DIR, 'slugs.json');
writeFileSync(slugsPath, JSON.stringify(notes.map(n => n.slug), null, 2), 'utf8');
console.log(`Generated ${notes.length + 1} pages`);
