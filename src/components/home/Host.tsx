'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ModelViewer } from '@/components/dossier/ModelViewer';
import { studio } from '@/content/studio';

const ADVANCE_MS = 7000;

/**
 * The site's host: a 3D model of the developer, speaking through the same
 * speech bubble the shipped game uses for Dad's dialogue.
 *
 * Renders the bubble whether or not a model exists, so the introduction works
 * from day one and gains a body when a web-weight .glb is dropped in.
 */
export function Host() {
  const { host } = studio;
  const lines = host.script;

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => setI((n) => (n + 1) % lines.length), [lines.length]);

  useEffect(() => {
    if (paused) return;
    // Respect a reader who has asked for less motion — they advance it themselves.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setTimeout(advance, ADVANCE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [i, paused, advance]);

  return (
    <div
      className="flex items-end gap-4 sm:gap-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {host.model && (
        <div className="relative h-36 w-28 shrink-0 sm:h-44 sm:w-32">
          <ModelViewer
            src={host.model}
            poster={host.poster}
            alt={`${host.name}, in 3D`}
            orbit="0deg 82deg 2.2m"
            fov="30deg"
            autoRotate
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        {/* Speech bubble — cream plate, hard edge, tail bottom-left, the same
            device the game uses when Dad explains the job. */}
        <button
          type="button"
          onClick={advance}
          aria-label="Next line"
          className="group relative block w-full max-w-[46ch] cursor-pointer rounded-md border-2 border-ink-950 bg-[#EFEAE0] px-4 py-3.5 text-left transition-transform duration-200 hover:-translate-y-0.5 sm:px-5 sm:py-4"
        >
          <p
            key={i}
            className="text-[14px] leading-relaxed text-[#17191C] sm:text-[15px]"
            style={{ animation: 'host-in 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            {lines[i]}
          </p>

          <span className="mt-2.5 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-label text-[#17191C]/45">
              {host.name} · {host.role}
            </span>
            <span aria-hidden className="ml-auto flex gap-1">
              {lines.map((_, n) => (
                <span
                  key={n}
                  className="h-1 w-1 rounded-full transition-colors duration-300"
                  style={{ background: n === i ? '#17191C' : 'rgba(23,25,28,0.22)' }}
                />
              ))}
            </span>
          </span>

          {/* Tail */}
          <span
            aria-hidden
            className="absolute -bottom-[9px] left-7 h-0 w-0"
            style={{
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '9px solid #0B0D10',
            }}
          />
          <span
            aria-hidden
            className="absolute -bottom-[5px] left-[30px] h-0 w-0"
            style={{
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '7px solid #EFEAE0',
            }}
          />
        </button>

        <p className="mt-4 pl-1 font-mono text-[10px] uppercase tracking-label text-fg-dim">
          Click to continue
        </p>
      </div>

      <style>{`
        @keyframes host-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes host-in { from { opacity: 1 } to { opacity: 1 } }
        }
      `}</style>
    </div>
  );
}
