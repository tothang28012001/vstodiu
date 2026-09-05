'use client';

import { useState } from 'react';
import type { CastMember } from '@/lib/types';
import { ModelViewer } from './ModelViewer';

/**
 * Shows the flat render until the reader asks for the model. There are 22 .glb
 * files on the Quảng Trị page alone — loading them eagerly would be tens of MB
 * for a page most readers scroll straight past.
 */
export function ModelCard({ member }: { member: CastMember }) {
  const [live, setLive] = useState(false);
  const hasModel = Boolean(member.model);

  return (
    <figure className="group flex h-full flex-col rounded border border-line bg-ink-850 transition-colors duration-300 hover:border-line-strong">
      <div className="grid-plate relative aspect-square w-full overflow-hidden rounded-t">
        {live && member.model ? (
          <>
            <ModelViewer
              src={member.model}
              poster={member.image}
              alt={member.name}
              loading="eager"
              autoRotate
            />
            {/* Models run 5–8 MB each, so say something while it downloads. */}
            <span className="pointer-events-none absolute bottom-2 right-2 rounded-sm border border-line bg-ink-950/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-fg-dim backdrop-blur-sm">
              Drag to orbit
            </span>
          </>
        ) : (
          <>
            {member.image ? (
              // Plain img: these are transparent PNG renders at varying aspect
              // ratios and are never the LCP element.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <div className="grid h-full place-items-center font-mono text-label text-fg-dim">
                No render
              </div>
            )}
            {hasModel && (
              <button
                type="button"
                onClick={() => setLive(true)}
                className="absolute bottom-2 right-2 rounded-sm border border-line bg-ink-950/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-fg-lo backdrop-blur-sm transition-colors hover:border-line-strong hover:text-fg-hi"
              >
                3D ↻
              </button>
            )}
          </>
        )}
      </div>

      <figcaption className="flex flex-1 flex-col border-t border-line p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-display text-[15px] font-medium tracking-display text-fg-hi">
            {member.name}
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-label text-fg-dim">
            {member.role}
          </span>
        </div>
        {member.vi && (
          <span lang="vi" className="mt-0.5 text-[12px] italic text-fg-dim">
            {member.vi}
          </span>
        )}
        <p className="mt-2 text-[13px] leading-relaxed text-fg-lo">{member.note}</p>
      </figcaption>
    </figure>
  );
}
