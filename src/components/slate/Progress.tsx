'use client';

import { useEffect, useRef, useState } from 'react';
import type { Track } from '@/lib/types';

/**
 * Fills from zero the first time it scrolls into view, so a percentage reads as
 * a measurement being taken rather than a static bar. Snaps straight to its
 * value under reduced motion, and if IntersectionObserver is missing.
 */
export function ProgressBar({
  pct,
  accent,
  className = '',
  delay = 0,
}: {
  pct: number;
  accent?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setFilled(true);
      return;
    }


    // Failsafe. A working observer always delivers an initial callback — even
    // for an element that is off-screen, with isIntersecting false. If nothing
    // arrives at all the observer is not running, and content must not stay
    // invisible, so show it. (Genuinely hidden tabs freeze observers too; those
    // resume on their own when the tab is looked at, and this costs nothing.)
    let heard = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        heard = true;
        if (entry.isIntersecting) {
          setFilled(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    const failsafe = setTimeout(() => {
      if (!heard) setFilled(true);
    }, 1500);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`h-[3px] w-full overflow-hidden rounded-sm bg-ink-750 ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${pct}% complete`}
    >
      <div
        className="h-full rounded-sm"
        style={{
          width: filled ? `${pct}%` : '0%',
          background: accent ?? 'var(--accent)',
          transition: `width 1.05s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }}
      />
    </div>
  );
}

/** Per-workstream breakdown — the reason the overall number is believable. */
export function TrackList({ tracks, accent }: { tracks: Track[]; accent?: string }) {
  return (
    <ul className="space-y-2.5">
      {tracks.map((t, i) => (
        <li key={t.name} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5">
          <span className="text-[13px] text-fg-lo">{t.name}</span>
          <span className="tnum font-mono text-[11px] text-fg-dim">{t.pct}%</span>
          <div className="col-span-2">
            {/* Staggered so the list reads top-to-bottom as it fills. */}
            <ProgressBar pct={t.pct} accent={accent} delay={i * 90} />
          </div>
        </li>
      ))}
    </ul>
  );
}
