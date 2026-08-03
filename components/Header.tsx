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
  { href: '/nudgeengine', label: 'Actions Engine' },
  { href: '/insights', label: 'Insights' }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [leavingToLab, setLeavingToLab] = useState(false);
  const hideLoaderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setLeavingToLab(false);
      }
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => () => {
    if (hideLoaderTimer.current) clearTimeout(hideLoaderTimer.current);
  }, []);

  function openPracticeLab() {
    setOpen(false);
    setLeavingToLab(true);
    if (hideLoaderTimer.current) clearTimeout(hideLoaderTimer.current);
    // New tab keeps this page open — clear the overlay after a short handoff.
    hideLoaderTimer.current = setTimeout(() => setLeavingToLab(false), 1800);
  }

  return <>
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Nudgeable home">
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
            : <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className={pathname === item.href ? 'active' : ''} onClick={() => setOpen(false)}>{item.label}</Link>
          )}
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
