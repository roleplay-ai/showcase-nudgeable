'use client';

import { useState, type CSSProperties } from 'react';
import { Icon } from './Icon';
import { SectionHeader } from './SectionHeader';
import { workflowCards, workflowFilters, type WorkflowCard } from './practice-lab-data';

const PRACTICE_LAB_URL = 'https://work.nudgeable.app/';

export function PracticeLabWorkflows() {
  const [filter, setFilter] = useState<'all' | WorkflowCard['category']>('all');
  const [selected, setSelected] = useState<WorkflowCard | null>(null);

  const visibleCards = workflowCards.filter(card => (filter === 'all' ? card.featured : card.category === filter));

  return (
    <>
      <div className="pl-workflow-top">
        <SectionHeader eyebrow="Practical application" title="Start with the work, not the tool." copy="Choose a category to explore six practical workflows employees can use on real work." />
        <div className="pl-workflow-filters">
          {workflowFilters.map(item => (
            <button
              key={item.key}
              type="button"
              className={`pl-filter-btn${filter === item.key ? ' active' : ''}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pl-workflow-grid">
        {visibleCards.map(card => (
          <article
            key={card.title}
            className="pl-workflow-card"
            style={{ '--pl-card-tint': card.tint } as CSSProperties}
            onClick={() => setSelected(card)}
          >
            <div className="pl-workflow-icon">{card.icon}</div>
            <span className="pl-workflow-type">{card.categoryLabel}</span>
            <h3>{card.title}</h3>
            <p>{card.cardCopy}</p>
          </article>
        ))}
      </div>

      <div className={`pl-workflow-modal${selected ? ' open' : ''}`} aria-hidden={!selected} onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
        <div className="pl-modal-card">
          <button type="button" className="pl-modal-close" aria-label="Close" onClick={() => setSelected(null)}>×</button>
          <span className="pl-modal-label">{selected?.categoryLabel ?? 'Workflow'}</span>
          <h3>{selected?.title}</h3>
          <p>{selected?.desc}</p>
          <a className="button button-primary" href={PRACTICE_LAB_URL} target="_blank" rel="noopener noreferrer">Explore in Practice Lab <Icon name="arrow" size={17} /></a>
        </div>
      </div>
    </>
  );
}
