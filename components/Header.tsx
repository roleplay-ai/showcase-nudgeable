'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

const nav = [
  { href: 'https://ai.nudgeable.app/', label: 'Practice Lab', external: true },
  { href: '/ai-role-play', label: 'AI Coach' },
  { href: '/nudgeengine', label: 'Actions Engine' },
  { href: '/insights', label: 'Insights' }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return <header className="site-header">
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
          ? <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{item.label}</a>
          : <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className={pathname === item.href ? 'active' : ''} onClick={() => setOpen(false)}>{item.label}</Link>
        )}
      </nav>
    </div>
  </header>;
}
