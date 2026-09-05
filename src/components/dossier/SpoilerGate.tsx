'use client';

import { useState } from 'react';

/**
 * Endings and late-game stages sit behind this. A portfolio has two readers —
 * someone assessing the work, who wants everything, and someone who might still
 * play it. The gate serves both without hiding the section's existence.
 */
export function SpoilerGate({
  count,
  noun,
  children,
}: {
  count: number;
  noun: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mb-6 inline-flex items-center gap-2 rounded-sm border border-line bg-ink-850 px-3 py-1.5 font-mono text-[11px] uppercase tracking-label text-fg-lo transition-colors hover:border-line-strong hover:text-fg-hi"
        >
          <span aria-hidden>×</span> Hide spoilers
        </button>
        {children}
      </div>
    );
  }

  return (
    <div className="grid-plate rounded border border-dashed border-line-strong px-6 py-12 text-center">
      <p className="font-mono text-[11px] uppercase tracking-label text-fg-dim">Spoilers</p>
      <p className="mx-auto mt-3 max-w-[46ch] text-[14px] leading-relaxed text-fg-lo">
        {count} {noun} below, including how each one is reached. Hidden by default so the game
        stays playable.
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 rounded-sm px-4 py-2 font-mono text-[11px] uppercase tracking-label text-ink-950 transition-opacity hover:opacity-90"
        style={{ background: 'var(--accent)' }}
      >
        Show anyway
      </button>
    </div>
  );
}
