import Link from 'next/link';
import { studio } from '@/content/studio';
import { games } from '@/content/games';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink-950">
      <div className="mx-auto max-w-shell px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-lg tracking-display text-fg-hi">{studio.name}</div>
            <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-fg-lo">{studio.line}</p>
          </div>

          <nav aria-label="Works">
            <div className="label mb-3">Works</div>
            <ul className="space-y-1.5">
              {games.map((g) => (
                <li key={g.slug}>
                  <Link href={`/works/${g.slug}`} className="link-quiet text-[13px]">
                    {g.subtitle ?? g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="label mb-3">Contact</div>
            <ul className="space-y-1.5 text-[13px]">
              <li>
                <a href={`mailto:${studio.contact.email}`} className="link-quiet break-all">
                  {studio.contact.email}
                </a>
              </li>
              <li>
                <a href={studio.contact.itch} target="_blank" rel="noreferrer" className="link-quiet">
                  itch.io / {studio.contact.itchHandle} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-label text-fg-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {studio.name}</span>
          <span>Status and percentages are self-reported and kept current.</span>
        </div>
      </div>
    </footer>
  );
}
