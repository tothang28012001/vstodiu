import Image from 'next/image';
import type { Game } from '@/lib/types';
import { progressOf } from '@/lib/types';
import { StatusChip } from '@/components/slate/StatusChip';
import { ProgressBar } from '@/components/slate/Progress';

export function GameHero({ game }: { game: Game }) {
  const pct = progressOf(game);
  const play = game.links.find((l) => l.kind === 'play');

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-14 md:px-8 md:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <StatusChip status={game.status} size="md" />
            <span className="font-mono text-[11px] text-fg-dim">{game.statusNote}</span>
          </div>

          {game.vi && (
            <div lang="vi" className="mb-2 font-mono text-[12px] uppercase tracking-label text-fg-lo">
              {game.vi}
            </div>
          )}

          <h1
            className="font-display font-medium leading-[0.98] tracking-display text-fg-hi"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
          >
            {game.title}
          </h1>

          {game.hook && (
            <p
              className="mt-6 max-w-[30ch] font-display font-medium leading-[1.15] tracking-display text-fg-hi"
              style={{ fontSize: 'clamp(1.15rem, 2vw, 1.6rem)' }}
            >
              {game.hook}
            </p>
          )}

          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-fg-lo">{game.logline}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            {play && (
              <a
                href={play.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 font-mono text-[11px] uppercase tracking-label text-ink-950 transition-opacity hover:opacity-90"
                style={{ background: game.accent }}
              >
                {play.label} ↗
              </a>
            )}
            {game.links
              .filter((l) => l.kind !== 'play')
              .map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-draw font-mono text-[11px] uppercase tracking-label">
                  {l.label} ↗
                </a>
              ))}
            {!play && (
              <span className="font-mono text-[11px] uppercase tracking-label text-fg-dim">
                Not playable yet
              </span>
            )}
          </div>

          {game.status !== 'released' && game.tracks?.length ? (
            <div className="mt-8 max-w-sm">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="label">Overall</span>
                <span className="tnum font-mono text-[13px] text-fg-hi">{pct}%</span>
              </div>
              <ProgressBar pct={pct} accent={game.accent} />
            </div>
          ) : null}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-ink-850 md:aspect-auto md:min-h-[340px]">
          <div className="grid-plate absolute inset-0" />
          {game.cover && (
            <Image
              src={game.cover}
              alt={`${game.title} key art`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              // Two exclusive treatments — never both, or Tailwind resolves the
              // duplicate utilities by stylesheet order instead of by intent.
              className={
                game.pixelated
                  ? 'pixelated object-cover'
                  : 'object-contain p-6 md:p-8'
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
