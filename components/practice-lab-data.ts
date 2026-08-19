export type JourneyKey = 'learn' | 'apply' | 'current';

export const journeyData: Record<JourneyKey, {
  label: string;
  title: string;
  cards: { icon: string; title: string; copy: string; tone: string }[];
}> = {
  learn: {
    label: 'LEARN',
    title: 'Build the foundations that stay useful as AI changes.',
    cards: [
      { icon: '✦', title: 'How AI works', copy: 'Tokens, context and hallucinations', tone: 'pl-tone-yellow' },
      { icon: '◎', title: 'Major AI tools', copy: 'Claude, ChatGPT, Gemini and Copilot', tone: 'pl-tone-purple' },
      { icon: '◫', title: 'Projects & Skills', copy: 'Reusable context, instructions and workflows', tone: 'pl-tone-blue' },
      { icon: '⌕', title: 'Research', copy: 'Web search, deep research and sources', tone: 'pl-tone-green' },
      { icon: '⚡', title: 'Agents & automation', copy: 'Tools, actions and multi-step work', tone: 'pl-tone-orange' },
      { icon: '</>', title: 'Vibe coding', copy: 'Build simple tools without starting from code', tone: 'pl-tone-pink' }
    ]
  },
  apply: {
    label: 'APPLY',
    title: 'Turn AI knowledge into practical work.',
    cards: [
      { icon: '⌕', title: 'Research', copy: 'Compare markets and build source-backed briefs', tone: 'pl-tone-blue' },
      { icon: '▤', title: 'Presentations', copy: 'Move from source material to a slide storyline', tone: 'pl-tone-purple' },
      { icon: '▥', title: 'Data analysis', copy: 'Clean, analyse and explain a dataset', tone: 'pl-tone-green' },
      { icon: '⚡', title: 'Automation', copy: 'Turn repeated work into a reusable workflow', tone: 'pl-tone-orange' },
      { icon: '</>', title: 'Build', copy: 'Create calculators, dashboards and simple apps', tone: 'pl-tone-pink' },
      { icon: '✎', title: 'Everyday work', copy: 'Draft, summarize, prepare and communicate faster', tone: 'pl-tone-yellow' }
    ]
  },
  current: {
    label: 'STAY CURRENT',
    title: 'Keep up with the changes that actually matter for work.',
    cards: [
      { icon: '↻', title: 'Weekly updates', copy: 'Important model and product changes', tone: 'pl-tone-yellow' },
      { icon: 'NEW', title: 'New models', copy: 'Understand what changed and who should care', tone: 'pl-tone-purple' },
      { icon: '✦', title: 'Feature explainers', copy: 'See where a new capability fits into work', tone: 'pl-tone-blue' },
      { icon: '→', title: 'What you can do', copy: 'Turn updates into practical new workflows', tone: 'pl-tone-green' },
      { icon: '◈', title: 'Beyond chatbots', copy: 'Agents, voice, avatars and open-source AI', tone: 'pl-tone-orange' },
      { icon: '?', title: 'Ask AI', copy: 'Get help choosing the right tool or capability', tone: 'pl-tone-pink' }
    ]
  }
};

export type WorkflowCategory = 'research' | 'presentations' | 'data' | 'build' | 'automation';

export interface WorkflowCard {
  category: WorkflowCategory;
  categoryLabel: string;
  featured?: boolean;
  tint: string;
  icon: string;
  title: string;
  cardCopy: string;
  desc: string;
}

export const workflowCards: WorkflowCard[] = [
  // Research
  { category: 'research', categoryLabel: 'Research', featured: true, tint: '#EAF5FF', icon: '⌕', title: 'Compare a market using cited sources', cardCopy: 'Move from a broad question to evidence-backed findings.', desc: 'Structure the research, gather evidence, compare the market and turn the findings into a usable recommendation.' },
  { category: 'research', categoryLabel: 'Research', tint: '#E9FFF2', icon: '◎', title: 'Build a competitor intelligence brief', cardCopy: 'Track competitors and summarize the changes that matter.', desc: 'Collect current competitor information, compare positioning and summarize meaningful changes with sources.' },
  { category: 'research', categoryLabel: 'Research', tint: '#F1ECFF', icon: '↗', title: 'Research a new industry quickly', cardCopy: 'Build a useful first view without reading dozens of tabs.', desc: 'Create a structured industry scan covering market size, players, trends, risks and credible sources.' },
  { category: 'research', categoryLabel: 'Research', tint: '#FDE4CC', icon: '✓', title: 'Find evidence for a recommendation', cardCopy: 'Strengthen an argument with credible, traceable sources.', desc: 'Turn a recommendation into research questions, search for evidence and build a source-backed argument.' },
  { category: 'research', categoryLabel: 'Research', tint: '#FFECEF', icon: '≡', title: 'Summarize a long report with citations', cardCopy: 'Get the important findings without losing source context.', desc: 'Extract the key findings, preserve the source context and create a concise summary with citations.' },
  { category: 'research', categoryLabel: 'Research', tint: '#FFF6CF', icon: '◫', title: 'Prepare for an important client meeting', cardCopy: 'Arrive with context, recent developments and sharper questions.', desc: 'Research the company, recent developments, likely priorities and useful conversation angles before the meeting.' },
  // Presentations
  { category: 'presentations', categoryLabel: 'Presentations', featured: true, tint: '#F1ECFF', icon: '▤', title: 'Turn a document into a presentation', cardCopy: 'Move from source material to a clear slide storyline.', desc: 'Extract the narrative, propose the slide structure, generate the first draft and refine the story for the audience.' },
  { category: 'presentations', categoryLabel: 'Presentations', tint: '#EAF5FF', icon: '▣', title: 'Create an executive summary deck', cardCopy: 'Condense detail into the few slides leaders need.', desc: 'Reduce a detailed document into a short senior-leadership deck with key decisions and implications.' },
  { category: 'presentations', categoryLabel: 'Presentations', tint: '#FFF6CF', icon: '↝', title: 'Improve a weak presentation storyline', cardCopy: 'Fix the logic before spending time polishing slides.', desc: 'Review the current deck, identify gaps in logic and restructure it into a stronger narrative.' },
  { category: 'presentations', categoryLabel: 'Presentations', tint: '#FDE4CC', icon: '◆', title: 'Turn analysis into decision slides', cardCopy: 'Move from findings to implications and decisions.', desc: 'Translate analysis into implications, recommendations and clear decision points for a business audience.' },
  { category: 'presentations', categoryLabel: 'Presentations', tint: '#E9FFF2', icon: '✎', title: 'Create speaker notes for a deck', cardCopy: 'Add useful context without reading the slide aloud.', desc: 'Generate concise speaker notes that add context without repeating what is already visible on the slide.' },
  { category: 'presentations', categoryLabel: 'Presentations', tint: '#FFECEF', icon: '⇄', title: 'Adapt a deck for a new audience', cardCopy: 'Reuse the content while changing what the audience needs.', desc: 'Reframe the same presentation for a different audience by changing emphasis, examples and level of detail.' },
  // Data
  { category: 'data', categoryLabel: 'Data', featured: true, tint: '#E9FFF2', icon: '▥', title: 'Analyze a messy sales export', cardCopy: 'Clean the file and surface the findings that matter.', desc: 'Clean the file, identify patterns, investigate anomalies and produce a concise summary with an editable chart or table.' },
  { category: 'data', categoryLabel: 'Data', tint: '#EAF5FF', icon: '◌', title: 'Find patterns in survey comments', cardCopy: 'Turn thousands of comments into themes you can use.', desc: 'Cluster open-text responses into themes, quantify them and surface representative comments.' },
  { category: 'data', categoryLabel: 'Data', tint: '#FFF6CF', icon: '↟', title: 'Explain a dashboard in plain English', cardCopy: 'Translate metrics into a concise business explanation.', desc: 'Interpret the key movements, anomalies and business implications from a dashboard or report.' },
  { category: 'data', categoryLabel: 'Data', tint: '#FDE4CC', icon: '⌗', title: 'Clean and standardize an Excel file', cardCopy: 'Fix common data-quality issues before analysis starts.', desc: 'Identify inconsistent formats, missing values, duplicates and obvious data-quality issues before analysis.' },
  { category: 'data', categoryLabel: 'Data', tint: '#F1ECFF', icon: '▟', title: 'Create an editable chart from raw data', cardCopy: 'Turn a table into a clear visual you can still edit.', desc: 'Choose an appropriate chart, generate it and keep the underlying data editable for further analysis.' },
  { category: 'data', categoryLabel: 'Data', tint: '#FFECEF', icon: '⇆', title: 'Compare two datasets', cardCopy: 'Identify what changed and where to investigate further.', desc: 'Align two datasets, identify material changes and explain the likely reasons behind them.' },
  // Build
  { category: 'build', categoryLabel: 'Build', featured: true, tint: '#FDE4CC', icon: '</>', title: 'Build a simple internal web app', cardCopy: 'Turn a business idea into a working interface.', desc: 'Describe the user, inputs and outputs, generate the interface, test the logic and iterate without starting from code.' },
  { category: 'build', categoryLabel: 'Build', tint: '#EAF5FF', icon: '＋', title: 'Create an interactive calculator', cardCopy: 'Turn business rules into a simple usable tool.', desc: 'Define the inputs, business rules and outputs, then build and test a working calculator.' },
  { category: 'build', categoryLabel: 'Build', tint: '#F1ECFF', icon: '▦', title: 'Prototype an internal dashboard', cardCopy: 'Make the idea tangible before development begins.', desc: 'Create a lightweight dashboard concept with metrics, filters and interactions before involving development.' },
  { category: 'build', categoryLabel: 'Build', tint: '#E9FFF2', icon: '✦', title: 'Create a reusable AI skill', cardCopy: 'Turn a repeated prompt into a reusable capability.', desc: 'Package instructions, examples and supporting resources into a reusable workflow for repeated tasks.' },
  { category: 'build', categoryLabel: 'Build', tint: '#FFF6CF', icon: 'AI', title: 'Build a custom AI assistant', cardCopy: 'Create a focused assistant around a recurring need.', desc: 'Define its job, instructions, knowledge, boundaries and test cases before sharing it with others.' },
  { category: 'build', categoryLabel: 'Build', tint: '#FFECEF', icon: '◈', title: 'Turn a process into an AI agent', cardCopy: 'Move from a manual process to delegated AI work.', desc: 'Map the process, identify tools and approvals, then design an agent that can execute the multi-step task safely.' },
  // Automation
  { category: 'automation', categoryLabel: 'Automation', featured: true, tint: '#FFECEF', icon: '⚡', title: 'Automate a repetitive task', cardCopy: 'Map the steps and build a repeatable AI-assisted flow.', desc: 'Map the manual steps, identify the right tool or agent, define approvals and build a repeatable workflow.' },
  { category: 'automation', categoryLabel: 'Automation', featured: true, tint: '#FFF6CF', icon: '→', title: 'Delegate a multi-step task safely', cardCopy: 'Give the agent a goal while keeping human control.', desc: 'Define the goal, provide context, set boundaries, specify tools and add a human approval point before final action.' },
  { category: 'automation', categoryLabel: 'Automation', tint: '#EAF5FF', icon: '↻', title: 'Create a recurring research update', cardCopy: 'Get the same useful scan without repeating the setup.', desc: 'Define the topic, trusted sources, frequency and output format for a scheduled research summary.' },
  { category: 'automation', categoryLabel: 'Automation', tint: '#E9FFF2', icon: '✓', title: 'Automate meeting follow-up', cardCopy: 'Convert notes into actions and follow-up faster.', desc: 'Turn meeting notes into decisions, actions, owners and a follow-up message with review before sending.' },
  { category: 'automation', categoryLabel: 'Automation', tint: '#F1ECFF', icon: '▤', title: 'Create a document processing workflow', cardCopy: 'Handle repeated document work with a consistent flow.', desc: 'Extract key information from repeated documents, validate it and route the output into a structured format.' },
  { category: 'automation', categoryLabel: 'Automation', tint: '#FDE4CC', icon: '◎', title: 'Build a human approval flow', cardCopy: 'Automate the work while keeping important decisions controlled.', desc: 'Let AI prepare or execute parts of the task while keeping critical decisions with a human reviewer.' }
];

export const workflowFilters: { key: 'all' | WorkflowCategory; label: string }[] = [
  { key: 'all', label: 'Featured' },
  { key: 'research', label: 'Research' },
  { key: 'presentations', label: 'Presentations' },
  { key: 'data', label: 'Data' },
  { key: 'build', label: 'Build' },
  { key: 'automation', label: 'Automation' }
];

export type CapabilityTeam = 'company' | 'hr' | 'sales' | 'finance' | 'ops';

export const capabilityData: Record<CapabilityTeam, {
  label: string;
  index: number;
  active: string;
  workflows: string;
  weekly: string;
  skills: [string, number][];
  teams: [string, string, number][];
}> = {
  company: { label: 'All company', index: 72, active: '68%', workflows: '8.4', weekly: '61%',
    skills: [['AI fundamentals', 84], ['Research', 78], ['Tool fluency', 71], ['Data analysis', 64], ['Building with AI', 55], ['Automation', 47]],
    teams: [['HR', '76 capability · 79% active', 76], ['Sales', '73 capability · 72% active', 73], ['Finance', '68 capability · 64% active', 68], ['Operations', '62 capability · 57% active', 62]] },
  hr: { label: 'HR', index: 76, active: '79%', workflows: '10.2', weekly: '72%',
    skills: [['AI fundamentals', 89], ['Research', 82], ['Tool fluency', 77], ['Data analysis', 58], ['Building with AI', 61], ['Automation', 52]],
    teams: [['HRBP', '81 capability · 86% active', 81], ['L&D', '79 capability · 84% active', 79], ['Talent', '74 capability · 77% active', 74], ['People Ops', '69 capability · 68% active', 69]] },
  sales: { label: 'Sales', index: 73, active: '72%', workflows: '9.1', weekly: '65%',
    skills: [['AI fundamentals', 80], ['Research', 85], ['Tool fluency', 74], ['Data analysis', 63], ['Building with AI', 50], ['Automation', 49]],
    teams: [['Enterprise Sales', '79 capability · 81% active', 79], ['Key Accounts', '74 capability · 73% active', 74], ['Inside Sales', '70 capability · 69% active', 70], ['Sales Ops', '67 capability · 63% active', 67]] },
  finance: { label: 'Finance', index: 68, active: '64%', workflows: '7.6', weekly: '57%',
    skills: [['AI fundamentals', 82], ['Research', 70], ['Tool fluency', 66], ['Data analysis', 79], ['Building with AI', 44], ['Automation', 42]],
    teams: [['FP&A', '74 capability · 71% active', 74], ['Commercial Finance', '70 capability · 66% active', 70], ['Controllership', '65 capability · 60% active', 65], ['Shared Services', '60 capability · 54% active', 60]] },
  ops: { label: 'Operations', index: 62, active: '57%', workflows: '6.4', weekly: '49%',
    skills: [['AI fundamentals', 74], ['Research', 61], ['Tool fluency', 59], ['Data analysis', 60], ['Building with AI', 48], ['Automation', 53]],
    teams: [['Customer Ops', '68 capability · 64% active', 68], ['Supply', '64 capability · 59% active', 64], ['Service Ops', '60 capability · 55% active', 60], ['Admin Ops', '55 capability · 49% active', 55]] }
};
