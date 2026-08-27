'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

const nav = [
  { href: '/ai-role-play', label: 'AI Coach' },
  { href: '/nudgeengine', label: 'Actions Engine' }
];

const ACADEMY_URL = '/ai-academy/index.html';

const insightsLinks = [
  { href: '/insights', label: 'Videos' },
  { href: '/insights/blogs', label: 'Blogs' }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const insightsRef = useRef<HTMLDivElement>(null);
  const insightsActive = pathname === '/insights' || pathname.startsWith('/insights/');

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setInsightsOpen(false);
      }
    }
    function closeDropdowns(event: MouseEvent) {
      if (insightsRef.current && !insightsRef.current.contains(event.target as Node)) {
        setInsightsOpen(false);
      }
    }
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('mousedown', closeDropdowns);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('mousedown', closeDropdowns);
    };
  }, []);

  useEffect(() => {
    setInsightsOpen(false);
  }, [pathname]);

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
          <a href={ACADEMY_URL} className={pathname.startsWith('/ai-academy') ? 'active' : ''} onClick={closeMenus}>AI Academy</a>
          {nav.map(item =>
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className={pathname === item.href ? 'active' : ''} onClick={closeMenus}>{item.label}</Link>
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
  </>;
}
