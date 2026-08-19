'use client';

import { useState } from 'react';
import { journeyData, type JourneyKey } from './practice-lab-data';

const steps: { key: JourneyKey; num: string; title: string; copy: string }[] = [
  { key: 'learn', num: '01', title: 'Learn', copy: 'Understand AI concepts and the major enterprise tools.' },
  { key: 'apply', num: '02', title: 'Apply', copy: 'Use guided workflows for real work, not generic exercises.' },
  { key: 'current', num: '03', title: 'Stay current', copy: 'See the updates that matter without following AI all day.' }
];

export function PracticeLabJourney() {
  const [active, setActive] = useState<JourneyKey>('learn');
  const data = journeyData[active];

  return (
    <div className="pl-journey-grid">
      <div className="pl-journey-tabs">
        {steps.map(step => (
          <button
            key={step.key}
            type="button"
            className={`pl-journey-tab${active === step.key ? ' active' : ''}`}
            onClick={() => setActive(step.key)}
          >
            <span className="num">{step.num}</span>
            <strong>{step.title}</strong>
            <span>{step.copy}</span>
          </button>
        ))}
      </div>
      <div className="pl-journey-visual">
        <div className="pl-visual-content">
          <div className="pl-visual-label">{data.label}</div>
          <div className="pl-visual-title">{data.title}</div>
          <div className="pl-visual-cards">
            {data.cards.map(card => (
              <div className={`pl-visual-card ${card.tone}`} key={card.title}>
                <div className="pl-visual-icon">{card.icon}</div>
                <b>{card.title}</b>
                <span>{card.copy}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
