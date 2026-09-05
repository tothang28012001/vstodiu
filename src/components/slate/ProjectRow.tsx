import Link from 'next/link';
import Image from 'next/image';
import type { Game } from '@/lib/types';
import { progressOf } from '@/lib/types';
import { ProgressBar } from './Progress';
import { Reveal } from '@/components/motion/Reveal';

export function ProjectRow({ game, index }: { game: Game; index: number }) {
  const pct = progressOf(game);
  const shipped = game.status === 'released';

  return (
    <Reveal y={18}>
    <Link
      href={`/works/${game.slug}`}
      style={{ '--accent': game.accent } as React.CSSProperties}
      className="group relative block border-b border-line transition-colors duration-300 hover:bg-ink-850"
    >
      {/* Accent edge, drawn on hover only. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
        style={{ background: game.accent }}
      />

      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 px-5 py-6 md:grid-cols-[3rem_11rem_1fr_14rem] md:items-center md:gap-x-7 md:px-8 md:py-7">
        <div className="tnum self-start pt-1 font-mono text-[11px] text-fg-dim md:self-center md:pt-0">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="relative aspect-video w-40 overflow-hidden rounded border border-line bg-ink-800 md:w-full">
          {game.cover ? (
            <Image
              src={game.cover}
              alt=""
              fill
              sizes="(max-width: 768px) 160px, 176px"
              className={`object-cover opacity-75 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100 ${
                game.pixelated ? 'pixelated' : ''
              }`}
            />
          ) : (
            <div className="grid-plate h-full w-full" />
          )}
        </div>

        <div className="col-span-2 min-w-0 md:col-span-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {game.vi && (
              <span lang="vi" className="font-mono text-[11px] uppercase tracking-label text-fg-dim">
                {game.vi}
              </span>
            )}
            <h3 className="font-display text-[19px] font-medium leading-tight tracking-display text-fg-hi md:text-[21px]">
              {game.title}
            </h3>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-fg-dim">
            <span>{game.engine.split(' · ')[0]}</span>
            <span aria-hidden>·</span>
            <span>{game.genre}</span>
            <span aria-hidden>·</span>
            <span>{game.shipped ?? game.started}</span>
          </div>

          {game.hook && (
            <p
              className="mt-3 max-w-[56ch] border-l-2 pl-3 text-[13.5px] leading-snug text-fg-lo"
              style={{ borderColor: game.accent }}
            >
              {game.hook}
            </p>
          )}
        </div>

        <div className="col-span-2 md:col-span-1">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="font-mono text-[11px] text-fg-dim">
              {shipped ? 'Shipped' : 'Progress'}
            </span>
            <span className="tnum font-mono text-[13px] text-fg-hi">{pct}%</span>
          </div>
          <ProgressBar pct={pct} accent={game.accent} />
          <p className="mt-2.5 text-[12px] leading-snug text-fg-dim">{game.statusNote}</p>
        </div>
      </div>
    </Link>
    </Reveal>
  );
}
