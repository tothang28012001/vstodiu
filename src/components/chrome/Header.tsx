import Link from 'next/link';
import { studio } from '@/content/studio';

const NAV = [
  { href: '/', label: 'Slate' },
  { href: '/about', label: 'Studio' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-900/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-shell items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 transition-opacity hover:opacity-80"
          aria-label={`${studio.name} — home`}
        >
          <span className="font-display text-[15px] font-medium tracking-display text-fg-hi">
            {studio.name}
          </span>
          <span className="label hidden sm:inline">Production slate</span>
        </Link>

        <nav className="flex items-center gap-6">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="link-quiet font-mono text-[11px] uppercase tracking-label">
              {item.label}
            </Link>
          ))}
          <a
            href={studio.contact.itch}
            target="_blank"
            rel="noreferrer"
            className="link-quiet font-mono text-[11px] uppercase tracking-label"
          >
            itch ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
