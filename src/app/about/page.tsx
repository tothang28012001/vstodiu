import type { Metadata } from 'next';
import Link from 'next/link';
import { studio } from '@/content/studio';
import { games } from '@/content/games';
import { progressOf } from '@/lib/types';
import { StatusChip } from '@/components/slate/StatusChip';

export const metadata: Metadata = {
  title: 'Studio',
  description: studio.line,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-shell px-5 pb-14 pt-14 md:px-8 md:pb-16 md:pt-20">
          <div className="label mb-6">Studio</div>
          <h1
            className="max-w-[18ch] font-display font-medium leading-[1.02] tracking-display text-fg-hi"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {studio.line}
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
            <div className="max-w-prose space-y-5">
              {studio.intro.map((p) => (
                <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-fg">
                  {p}
                </p>
              ))}
            </div>

            <dl className="h-fit border-t border-line">
              {studio.practice.map((row) => (
                <div key={row.k} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="label pt-0.5">{row.k}</dt>
                  <dd className="text-[14px] leading-relaxed text-fg">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-16">
        <div className="label mb-6">At a glance</div>
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {games.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/works/${g.slug}`}
                style={{ '--accent': g.accent } as React.CSSProperties}
                className="flex h-full flex-col gap-3 bg-ink-900 p-5 transition-colors hover:bg-ink-850"
              >
                <StatusChip status={g.status} />
                <div className="font-display text-[17px] font-medium leading-snug tracking-display text-fg-hi">
                  {g.subtitle ?? g.title}
                </div>
                <p className="text-[13px] leading-relaxed text-fg-lo">{g.genre}</p>
                <div className="tnum mt-auto pt-3 font-mono text-[11px] text-fg-dim">
                  {progressOf(g)}% · {g.engine.split(' · ')[0]}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-shell px-5 pb-6 md:px-8">
        <div className="rule pt-10">
          <div className="label mb-4">Contact</div>
          <p className="max-w-prose text-[15px] leading-relaxed text-fg">
            Open to studio work, contract gameplay and technical art, and collaboration on anything in
            the slate.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[13px]">
            <a href={`mailto:${studio.contact.email}`} className="link-draw">
              {studio.contact.email}
            </a>
            <a href={studio.contact.itch} target="_blank" rel="noreferrer" className="link-draw">
              itch.io / {studio.contact.itchHandle} ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
