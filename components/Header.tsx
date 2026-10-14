'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/content';
import { Brand } from './Brand';
import { Icon } from './Icon';

/** Top bar; below 760px the toggle reveals the nav and support link beneath it. */
export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className={open ? 'topbar menu-open' : 'topbar'}>
      <Brand />
      <nav className="nav" aria-label="Primary navigation">
        {settings.nav.map((link) => (
          <Link key={link.href} href={link.href} onClick={close}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href={settings.supportLink.href} className="support-link" onClick={close}>
        {settings.supportLink.label}{' '}
        <span>
          <Icon name="arrow-up-right-01" />
        </span>
      </Link>
      <button
        className="menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? 'cancel-01' : 'menu-01'} />
      </button>
    </header>
  );
}
