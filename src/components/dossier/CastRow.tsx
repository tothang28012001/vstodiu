'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CastMember } from '@/lib/types';
import { ModelCard } from './ModelCard';

/**
 * Horizontal, snap-scrolling rail for a cast or an arsenal.
 *
 * Long lists read better sideways than as a tall grid — the reader stays in one
 * place and the section keeps a fixed height on the page. Native scrolling does
 * the work, so touch, trackpad, shift-wheel and keyboard all behave; the arrows
 * are an affordance for mouse users and hide when there is nothing to scroll.
 */
export function CastRow({ items }: { items: CastMember[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (dir: -1 | 1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const showArrows = !(atStart && atEnd);

  return (
    <div className="relative">
      <ul
        ref={rail}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((m) => (
          <li key={m.slug} className="w-[240px] shrink-0 snap-start sm:w-[264px]">
            <ModelCard member={m} />
          </li>
        ))}
      </ul>

      {showArrows && (
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Scroll left"
            className="rounded-sm border border-line bg-ink-850 px-3 py-1.5 font-mono text-[12px] text-fg-lo transition-colors hover:border-line-strong hover:text-fg-hi disabled:opacity-30 disabled:hover:border-line disabled:hover:text-fg-lo"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Scroll right"
            className="rounded-sm border border-line bg-ink-850 px-3 py-1.5 font-mono text-[12px] text-fg-lo transition-colors hover:border-line-strong hover:text-fg-hi disabled:opacity-30 disabled:hover:border-line disabled:hover:text-fg-lo"
          >
            →
          </button>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-label text-fg-dim">
            {items.length} · drag or scroll
          </span>
        </div>
      )}
    </div>
  );
}
