'use client';

import { useState } from 'react';
import type { Beat } from '@/lib/types';
import { Reveal } from '@/components/motion/Reveal';

const TAG =
  'pointer-events-none absolute rounded-sm border border-line bg-ink-950/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-fg-lo backdrop-blur-sm';

/**
 * The concept frame carries the story; the built shot sits in the corner as an
 * inset. Clicking the inset swaps them, so a reader can always see how far the
 * real thing is from the picture that explains it.
 */
function BeatFrame({ beat }: { beat: Beat }) {
  const [builtFirst, setBuiltFirst] = useState(false);
  const canSwap = Boolean(beat.built);
  const main = builtFirst && beat.built
    ? { src: beat.built, label: beat.builtLabel ?? 'Built' }
    : { src: beat.board, label: beat.boardLabel };
  const inset = builtFirst
    ? { src: beat.board, label: beat.boardLabel }
    : beat.built
      ? { src: beat.built, label: beat.builtLabel ?? 'Built' }
      : null;

  return (
    <figure className="relative overflow-hidden rounded border border-line bg-ink-850">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={main.src} alt={`${beat.title} — ${main.label}`} loading="lazy" className="w-full" />
      <span className={`${TAG} left-2 top-2`}>{main.label}</span>

      {beat.sides && (
        <>
          <span className={`${TAG} bottom-2 left-2 text-fg-hi`}>{beat.sides[0]}</span>
          <span className={`${TAG} bottom-2 left-[calc(50%+0.5rem)] text-fg-hi`}>{beat.sides[1]}</span>
        </>
      )}

      {canSwap && inset && (
        <button
          type="button"
          onClick={() => setBuiltFirst((v) => !v)}
          aria-label={`Show the ${inset.label.toLowerCase()} version`}
          className="group absolute right-2 top-2 w-[28%] max-w-[220px] overflow-hidden rounded-sm border border-line-strong bg-ink-950 shadow-lg transition-transform duration-300 hover:scale-[1.04]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={inset.src} alt="" loading="lazy" className="w-full" />
          <span className="block bg-ink-950/90 px-1.5 py-0.5 text-left font-mono text-[9px] uppercase tracking-label text-fg-lo group-hover:text-fg-hi">
            {inset.label} ↔
          </span>
        </button>
      )}
    </figure>
  );
}

export function StoryBeats({ items }: { items: Beat[] }) {
  return (
    <ol>
      {items.map((beat, i) => {
        const newChapter = i === 0 || items[i - 1].chapter !== beat.chapter;
        return (
          <Reveal as="li" y={18} key={beat.board} className={newChapter && i > 0 ? 'mt-12' : 'mt-6'}>
            {newChapter && (
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-label" style={{ color: 'var(--accent)' }}>
                  {beat.chapter}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
            )}
            <div className="grid items-center gap-4 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:gap-8">
              <BeatFrame beat={beat} />
              <div>
                <h3 className="font-display text-[18px] font-medium leading-snug tracking-display text-fg-hi md:text-[20px]">
                  {beat.title}
                </h3>
                <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-fg-lo">{beat.caption}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
