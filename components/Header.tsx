'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

const PRACTICE_LAB_URL = 'https://work.nudgeable.app/';

const nav = [
  { href: PRACTICE_LAB_URL, label: 'AI Practice Lab', external: true },
  { href: '/ai-role-play', label: 'AI Coach' },
  { href: '/nudgeengine', label: 'Actions Engine' }
];

const insightsLinks = [
  { href: '/insights', label: 'Videos' },
  { href: '/insights/blogs', label: 'Blogs' }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [leavingToLab, setLeavingToLab] = useState(false);
  const hideLoaderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const insightsActive = pathname === '/insights' || pathname.startsWith('/insights/');

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setInsightsOpen(false);
        setLeavingToLab(false);
      }
    }
    function closeInsights(event: MouseEvent) {
      if (insightsRef.current && !insightsRef.current.contains(event.target as Node)) {
        setInsightsOpen(false);
      }
    }
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('mousedown', closeInsights);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('mousedown', closeInsights);
    };
  }, []);

  useEffect(() => {
    setInsightsOpen(false);
  }, [pathname]);

  useEffect(() => () => {
    if (hideLoaderTimer.current) clearTimeout(hideLoaderTimer.current);
  }, []);

  function openPracticeLab() {
    setOpen(false);
    setInsightsOpen(false);
    setLeavingToLab(true);
    if (hideLoaderTimer.current) clearTimeout(hideLoaderTimer.current);
    hideLoaderTimer.current = setTimeout(() => setLeavingToLab(false), 1800);
  }

  function closeMenus() {
    setOpen(false);
    setInsightsOpen(false);
  }

  return <>
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={closeMenus} aria-label="Nudgeable home">
          <Image src="/brand/nudgeable-black.png" alt="Nudgeable" width={704} height={149} priority sizes="170px" />
        </Link>
        <button
          className="menu-button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(value => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav id="primary-navigation" className={open ? 'main-nav open' : 'main-nav'} aria-label="Primary navigation">
          {nav.map(item => item.external
            ? <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={openPracticeLab}>{item.label}</a>
            : <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className={pathname === item.href ? 'active' : ''} onClick={closeMenus}>{item.label}</Link>
          )}
          <div ref={insightsRef} className={`nav-dropdown${insightsOpen ? ' open' : ''}${insightsActive ? ' active' : ''}`}>
            <button
              type="button"
              className="nav-dropdown-toggle"
              aria-expanded={insightsOpen}
              aria-haspopup="true"
              aria-controls="insights-menu"
              onClick={() => setInsightsOpen(value => !value)}
            >
              Insights
              <Icon name="chevron" size={16} />
            </button>
            <div id="insights-menu" className="nav-dropdown-menu" role="menu">
              {insightsLinks.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={pathname === item.href ? 'active' : ''}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
    {leavingToLab && (
      <div className="external-app-loader" role="status" aria-live="polite" aria-label="Opening AI Practice Lab">
        <div className="external-app-loader-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        <p>Opening AI Practice Lab…</p>
      </div>
    )}
  </>;
}
