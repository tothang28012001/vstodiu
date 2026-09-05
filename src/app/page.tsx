import type { Metadata } from 'next';
import { games, gamesByStatus } from '@/content/games';
import { STATUS_META } from '@/lib/types';
import { ProjectRow } from '@/components/slate/ProjectRow';
import { Portrait } from '@/components/home/Portrait';
import { Fields } from '@/components/home/Fields';
import { Showcase, type ShowcaseItem } from '@/components/home/Showcase';

export const metadata: Metadata = {
  title: 'Vstodiu — production slate',
};

export default function SlatePage() {
  const buckets = gamesByStatus();
  // Running index across the whole slate, so row numbers read 01…04 top to bottom.
  let n = -1;

  const showcase: ShowcaseItem[] = games
    .filter((g) => g.showcase)
    .map((g) => ({
      slug: g.slug,
      title: g.title,
      vi: g.vi,
      genre: g.genre,
      accent: g.accent,
      status: g.status,
      shot: {
        src: g.showcase!.src,
        note: g.showcase!.note,
        fit: g.showcase!.fit ?? 'cover',
        pixelated: g.showcase!.pixelated,
      },
    }));

  return (
    <>
      <Portrait />
      <Showcase items={showcase} />

      {/* The slate */}
      <section id="slate" className="scroll-mt-14" aria-labelledby="slate-heading">
        <h2 id="slate-heading" className="sr-only">
          Titles by status
        </h2>

        {buckets.map((bucket) => (
          <div key={bucket.status}>
            <div className="sticky top-14 z-20 border-b border-line bg-ink-900/90 backdrop-blur-md">
              <div className="mx-auto flex max-w-shell flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3 md:px-8">
                <h3 className="font-mono text-[11px] uppercase tracking-label text-fg-hi">
                  {STATUS_META[bucket.status].label}
                </h3>
                <span className="tnum font-mono text-label text-fg-dim">
                  {String(bucket.games.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="mx-auto max-w-shell">
              {bucket.games.map((game) => {
                n += 1;
                return <ProjectRow key={game.slug} game={game} index={n} />;
              })}
            </div>
          </div>
        ))}
      </section>

      <Fields />
    </>
  );
}
