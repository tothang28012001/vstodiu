import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games, getGame, neighbours } from '@/content/games';
import { GameHero } from '@/components/dossier/GameHero';
import { BlockView } from '@/components/dossier/Blocks';
import { OutlineRail } from '@/components/dossier/OutlineRail';
import { TrackList } from '@/components/slate/Progress';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: game.subtitle ?? game.title,
    description: game.logline,
    openGraph: {
      title: `${game.subtitle ?? game.title} — Vstodiu`,
      description: game.logline,
      images: game.cover ? [game.cover] : undefined,
    },
  };
}

export default async function GamePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const { prev, next } = neighbours(slug);
  const standing = game.showStanding !== false;
  const standingAtEnd = game.standingAt === 'end';
  const standingEntry = standing ? [{ id: 'standing', label: 'Where it stands' }] : [];
  const blockEntries = game.blocks.map((b) => ({ id: b.id, label: b.label }));
  const outline = standingAtEnd
    ? [...blockEntries, ...standingEntry]
    : [...standingEntry, ...blockEntries];

  const standingPanel = (
          <section id="standing" className="scroll-mt-24 py-14 md:py-16">
            <div className="label mb-3">Where it stands</div>
            <h2 className="max-w-[24ch] font-display text-[26px] font-medium leading-tight tracking-display text-fg-hi md:text-[32px]">
              {game.status === 'released' ? 'Shipped, and what I did on it' : 'Honest progress, and what I did on it'}
            </h2>

            <div className="mt-9 grid gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <div className="label mb-4">My role</div>
                <ul className="space-y-3">
                  {game.role.map((r) => (
                    <li key={r} className="flex gap-3 text-[14px] leading-relaxed text-fg">
                      <span aria-hidden className="mt-[9px] h-px w-3 shrink-0" style={{ background: game.accent }} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                {game.disclosure && (
                  <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-fg-dim">
                    <span className="label mr-2">Disclosure</span>
                    {game.disclosure}
                  </p>
                )}
              </div>

              <div>
                {game.tracks?.length ? (
                  <>
                    <div className="label mb-4">By workstream</div>
                    <TrackList tracks={game.tracks} accent={game.accent} />
                    {game.progressNote && (
                      <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-fg-dim">
                        {game.progressNote}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="label mb-4">Delivery</div>
                    <dl className="space-y-3">
                      {[
                        ['Started', game.started],
                        ['Shipped', game.shipped ?? '—'],
                        ['Engine', game.engine],
                        ['Platforms', game.platforms.join(' · ')],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line pb-3">
                          <dt className="label pt-1">{k}</dt>
                          <dd className="text-[14px] text-fg">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}
              </div>
            </div>
          </section>

  );

  return (
    <div style={{ '--accent': game.accent } as React.CSSProperties}>
      <div className="mx-auto max-w-shell px-5 pt-5 md:px-8">
        <Link href="/" className="link-quiet font-mono text-[11px] uppercase tracking-label">
          ← Slate
        </Link>
      </div>

      <GameHero game={game} />

      {game.banner && (
        <figure className="relative border-b border-line">
          <img
            src={game.banner.src}
            alt=""
            className="max-h-[62vh] w-full object-cover"
          />
          {game.banner.note && (
            <figcaption className="absolute right-4 top-4 rounded-sm bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-fg-lo backdrop-blur-sm">
              {game.banner.note}
            </figcaption>
          )}
        </figure>
      )}

      {/* Metric strip */}
      {game.metrics.length > 0 && (
      <section className="border-b border-line bg-ink-850">
        <dl className="mx-auto grid max-w-shell grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {game.metrics.map((m) => (
            <div key={m.k} className="border-b border-r border-line px-5 py-5 last:border-r-0 md:px-6">
              <dt className="label">{m.k}</dt>
              <dd className="mt-2 font-display text-[20px] font-medium tracking-display text-fg-hi">
                <span className="tnum">{m.v}</span>
                {m.sub && <span className="ml-1.5 text-[13px] font-normal text-fg-dim">{m.sub}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      )}

      {/* Body: outline rail + blocks */}
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-4 md:px-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block lg:py-14">
          <OutlineRail items={outline} />
        </aside>

        {/* min-w-0: a grid track defaults to min-content width, so without this
            a horizontally scrolling cast rail stretches the whole page instead
            of scrolling inside itself. */}
        <div className="min-w-0">
          {standing && !standingAtEnd && standingPanel}

          {game.blocks.map((block) => (
            <BlockView key={block.id} block={block} pixelated={game.pixelated} />
          ))}

          {standing && standingAtEnd && standingPanel}
        </div>
      </div>

      {/* Pager */}
      <nav className="mx-auto grid max-w-shell gap-px border-t border-line bg-line sm:grid-cols-2" aria-label="Other titles">
        {[prev, next].map((g, i) =>
          g ? (
            <Link
              key={g.slug}
              href={`/works/${g.slug}`}
              className={`group bg-ink-900 px-5 py-8 transition-colors hover:bg-ink-850 md:px-8 ${
                i === 1 ? 'sm:text-right' : ''
              }`}
            >
              <div className="label mb-2">{i === 0 ? '← Previous' : 'Next →'}</div>
              <div className="font-display text-[18px] font-medium tracking-display text-fg-hi">
                {g.subtitle ?? g.title}
              </div>
              <div className="mt-1 text-[13px] text-fg-dim">{g.genre}</div>
            </Link>
          ) : (
            <div key={`empty-${i}`} className="bg-ink-900" />
          ),
        )}
      </nav>
    </div>
  );
}
