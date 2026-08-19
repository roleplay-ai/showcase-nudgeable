'use client';

import { useState } from 'react';
import { capabilityData, type CapabilityTeam } from './practice-lab-data';

const teams: CapabilityTeam[] = ['company', 'hr', 'sales', 'finance', 'ops'];

export function PracticeLabCapability() {
  const [team, setTeam] = useState<CapabilityTeam>('company');
  const data = capabilityData[team];

  return (
    <>
      <div className="pl-capability-tabs" aria-label="Capability dashboard team filter">
        {teams.map(key => (
          <button
            key={key}
            type="button"
            className={`pl-cap-tab${team === key ? ' active' : ''}`}
            onClick={() => setTeam(key)}
          >
            {capabilityData[key].label}
          </button>
        ))}
      </div>

      <div className="pl-cap-dashboard">
        <div className="pl-cap-stats">
          <div className="pl-cap-stat primary"><div className="pl-cap-label">AI capability index</div><div className="pl-cap-value">{data.index}</div><div className="pl-cap-sub">Composite view of practice and proficiency</div></div>
          <div className="pl-cap-stat"><div className="pl-cap-label">Active this month</div><div className="pl-cap-value">{data.active}</div><div className="pl-cap-sub">Employees who used the Practice Lab</div></div>
          <div className="pl-cap-stat"><div className="pl-cap-label">Avg. workflows completed</div><div className="pl-cap-value">{data.workflows}</div><div className="pl-cap-sub">Per active employee</div></div>
          <div className="pl-cap-stat"><div className="pl-cap-label">Weekly practice</div><div className="pl-cap-value">{data.weekly}</div><div className="pl-cap-sub">Employees returning each week</div></div>
        </div>

        <div className="pl-cap-main">
          <div className="pl-cap-panel">
            <h3>Capability by area</h3>
            <div className="pl-panel-sub">See where teams are becoming stronger and where more practice is needed.</div>
            <div className="pl-skill-list">
              {data.skills.map(([name, score]) => (
                <div className="pl-skill-row" key={name}>
                  <div className="pl-skill-name">{name}</div>
                  <div className="pl-skill-track"><div className="pl-skill-fill" style={{ width: `${score}%` }} /></div>
                  <div className="pl-skill-score">{score}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pl-cap-panel">
            <h3>Team view</h3>
            <div className="pl-panel-sub">Compare participation and capability across business groups.</div>
            <div className="pl-team-list">
              {data.teams.map(([name, sub, score]) => (
                <div className="pl-team-row" key={name}>
                  <div><strong>{name}</strong><span>{sub}</span></div>
                  <div className="pl-team-score">{score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pl-cap-foot">
          <strong>From training attendance to visible AI capability.</strong>
          <span>Use the data to target new workflows, refreshers and team-specific practice.</span>
        </div>
      </div>
    </>
  );
}
