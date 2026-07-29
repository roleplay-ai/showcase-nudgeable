import Image from 'next/image';
import { aiTools } from '@/components/data';

type ToolId = 'copilot' | 'gemini' | 'claude' | 'chatgpt';

type WorkflowItem = {
  category: string;
  title: string;
  accent: 'presentations' | 'data' | 'email' | 'agents' | 'research' | 'skills';
  tools: ToolId[];
};

const workflows: WorkflowItem[] = [
  { category: 'Presentations', title: 'Turn a document into a presentation', accent: 'presentations', tools: ['copilot'] },
  { category: 'Data', title: 'Analyze a messy sales export', accent: 'data', tools: ['gemini'] },
  { category: 'Email & Tasks', title: 'Build an inbox triage workflow', accent: 'email', tools: ['claude'] },
  { category: 'Agents', title: 'Delegate a multi-step task safely', accent: 'agents', tools: ['chatgpt'] },
  { category: 'Research', title: 'Compare a market using cited sources', accent: 'research', tools: ['chatgpt'] },
  { category: 'Skills', title: 'Write instructions AI can follow repeatedly', accent: 'skills', tools: ['chatgpt', 'claude', 'gemini', 'copilot'] }
];

const toolLabels: Record<ToolId, string> = {
  copilot: 'Microsoft Copilot',
  gemini: 'Gemini',
  claude: 'Claude',
  chatgpt: 'ChatGPT'
};

const toolIcons: Record<ToolId, string> = {
  claude: aiTools.find((tool) => tool.name === 'Claude')?.iconSrc ?? '',
  chatgpt: aiTools.find((tool) => tool.name === 'ChatGPT')?.iconSrc ?? '',
  copilot: aiTools.find((tool) => tool.name === 'Copilot')?.iconSrc ?? '',
  gemini: aiTools.find((tool) => tool.name === 'Gemini')?.iconSrc ?? ''
};

function ToolIcon({ tool }: { tool: ToolId }) {
  return (
    <Image
      src={toolIcons[tool]}
      alt=""
      width={18}
      height={18}
      className="lab-workflow-tool-icon"
      unoptimized
    />
  );
}

function WorkflowCard({ workflow }: { workflow: WorkflowItem }) {
  return (
    <a
      className={`lab-workflow-card ${workflow.accent}`}
      href="https://work.nudgeable.app/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${workflow.title} using ${workflow.tools.map((tool) => toolLabels[tool]).join(', ')}`}
    >
      <span className="lab-workflow-category">{workflow.category}</span>
      <h4>{workflow.title}</h4>
      <div className="lab-workflow-footer">
        <span className="lab-workflow-logos" aria-label={workflow.tools.map((tool) => toolLabels[tool]).join(', ')}>
          {workflow.tools.map((tool) => (
            <span key={tool} className="lab-workflow-tool" title={toolLabels[tool]} aria-hidden={workflow.tools.length > 1}>
              <ToolIcon tool={tool} />
            </span>
          ))}
        </span>
        <span className="lab-workflow-arrow" aria-hidden="true">→</span>
      </div>
    </a>
  );
}

const workflowRows = [
  workflows.slice(0, 3),
  workflows.slice(3)
];

export function LabWorkflowCards() {
  return (
    <div className="lab-workflow-grid">
      {workflowRows.map((row, rowIndex) => (
        <div className={`lab-workflow-row ${rowIndex % 2 === 1 ? 'reverse' : ''}`} key={`workflow-row-${rowIndex}`}>
          <div className="lab-workflow-track">
            {[...row, ...row].map((workflow, itemIndex) => (
              <WorkflowCard key={`${rowIndex}-${workflow.title}-${itemIndex}`} workflow={workflow} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
