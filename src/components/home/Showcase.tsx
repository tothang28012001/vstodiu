'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Status } from '@/lib/types';
import { STATUS_META } from '@/lib/types';

/**
 * Only what the showcase needs. Assembled on the server so the whole content
 * layer — every stage, ending and system — stays out of the client bundle.
 */
export type ShowcaseItem = {
  slug: string;
  title: string;
  vi?: string;
  genre: string;
  accent: string;
  status: Status;
  shot: { src: string; note: string; fit: 'cover' | 'contain'; pixelated?: boolean };
};

const DOT: Record<Status, string> = {
  released: 'bg-status-released',
  production: 'bg-status-production',
  design: 'bg-status-design',
  concept: 'bg-status-concept',
  shelved: 'bg-status-shelved',
};

export function Showcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const game = items[active];

  return (
    <section
      aria-labelledby="showcase-heading"
      className="border-b border-line"
      style={{ '--accent': game.accent } as React.CSSProperties}
    >
      <div className="mx-auto max-w-shell px-5 py-12 md:px-8 md:py-14">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="showcase-heading" className="label">
            The games
          </h2>
          <Link
            href={`/works/${game.slug}`}
            className="link-draw font-mono text-[11px] uppercase tracking-label"
          >
            Read the breakdown →
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex flex-wrap gap-x-1 gap-y-2">
          {items.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.slug}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-2 rounded-sm px-3 py-2 transition-colors duration-200 ${
                  on ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[item.status]}`} />
                <span
                  className={`font-display text-[14px] font-medium tracking-display transition-colors md:text-[15px] ${
                    on ? 'text-fg-hi' : 'text-fg-lo group-hover:text-fg-hi'
                  }`}
                >
                  {item.vi ?? item.title}
                </span>
                <span
                  aria-hidden
                  className="ml-1 h-[2px] w-5 origin-left transition-transform duration-300 ease-out"
                  style={{ background: item.accent, transform: on ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </button>
            );
          })}
        </div>

        {/* The plate. Every shot is mounted and crossfaded, so switching never
            flashes an empty frame waiting on a fetch. */}
        <Link
          href={`/works/${game.slug}`}
          aria-label={`${game.vi ?? game.title} — read the breakdown`}
          className="group relative block aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-ink-850 sm:aspect-[2/1]"
        >
          {items.map((item, i) => (
            <div
              key={item.slug}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Image
                src={item.shot.src}
                alt={i === active ? `${item.title} — ${item.shot.note}` : ''}
                fill
                priority={i === 0}
                sizes="(max-width: 1320px) 100vw, 1320px"
                className={[
                  item.shot.fit === 'cover' ? 'object-cover' : 'object-contain p-6',
                  item.shot.pixelated ? 'pixelated' : '',
                  'transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]',
                ].join(' ')}
              />
            </div>
          ))}

          {/* Just enough gradient to keep the caption legible on any shot. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(8,9,11,0.88) 100%)' }}
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 p-5 md:p-7">
            <div>
              {game.vi && (
                <div lang="vi" className="mb-1 font-mono text-[11px] uppercase tracking-label text-fg-lo">
                  {game.vi}
                </div>
              )}
              <div
                className="font-display font-medium leading-none tracking-display text-fg-hi"
                style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.6rem)' }}
              >
                {game.title}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-label">
              <span style={{ color: game.accent }}>{STATUS_META[game.status].label}</span>
              <span className="text-fg-dim">{game.genre}</span>
            </div>
          </div>

          <span className="absolute right-4 top-4 rounded-sm bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-fg-lo backdrop-blur-sm">
            {game.shot.note}
          </span>
        </Link>
      </div>
    </section>
  );
}
