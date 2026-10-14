import type { SiteSettings } from '@/content';
import { Brand } from './Brand';

export function Footer({ settings, showCopyright = false }: { settings: SiteSettings; showCopyright?: boolean }) {
  return (
    <footer>
      <Brand />
      <span>{settings.location}</span>
      {showCopyright && <span>{settings.copyright}</span>}
    </footer>
  );
}
