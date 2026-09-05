import type { Block, Ending, RoadmapColumn, Shot, Stage, SystemEntry } from '@/lib/types';
import { ModelCard } from './ModelCard';
import { CastRow } from './CastRow';
import { SpoilerGate } from './SpoilerGate';
import { Reveal } from '@/components/motion/Reveal';

/* ── Section shell ───────────────────────────────────────────────────────── */

function Section({
  id,
  label,
  heading,
  intro,
  children,
}: {
  id: string;
  label: string;
  heading: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 md:py-16">
      <Reveal className="mb-8 md:mb-10">
        <div className="label mb-3">{label}</div>
        <h2 className="max-w-[24ch] font-display text-[26px] font-medium leading-tight tracking-display text-fg-hi md:text-[32px]">
          {heading}
        </h2>
        {intro && <p className="mt-4 max-w-prose text-[14.5px] leading-relaxed text-fg-lo">{intro}</p>}
      </Reveal>
      <Reveal delay={90} className="min-w-0">{children}</Reveal>
    </section>
  );
}

/** Accent-ruled aside used for design rationale. */
function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 bg-ink-850/60 py-3 pl-4 pr-4" style={{ borderColor: 'var(--accent)' }}>
      <div className="label mb-1.5">{title}</div>
      <p className="text-[13.5px] leading-relaxed text-fg-lo">{children}</p>
    </div>
  );
}

/* ── Stages ──────────────────────────────────────────────────────────────── */

function StageItem({ stage, pixelated }: { stage: Stage; pixelated?: boolean }) {
  return (
    <Reveal as="li" y={18} className="grid gap-6 border-t border-line py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="tnum shrink-0 font-mono text-[11px] tracking-label" style={{ color: 'var(--accent)' }}>
            {stage.index}
          </span>
          <h3 className="font-display text-[18px] font-medium leading-snug tracking-display text-fg-hi">
            {stage.name}
          </h3>
        </div>
        <p className="mt-2 text-[13px] italic leading-relaxed text-fg-dim">{stage.role}</p>

        {stage.image && (
          <figure className="mt-5">
            <div className="overflow-hidden rounded border border-line bg-ink-850">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stage.image}
                alt={stage.name}
                loading="lazy"
                className={`w-full ${pixelated ? 'pixelated' : ''}`}
              />
            </div>
            {stage.imageNote && (
              <figcaption className="mt-2 text-[12px] leading-snug text-fg-dim">{stage.imageNote}</figcaption>
            )}
          </figure>
        )}
      </div>

      <div className="space-y-5">
        {stage.body.map((p) => (
          <p key={p.slice(0, 24)} className="max-w-prose text-[14.5px] leading-relaxed text-fg">
            {p}
          </p>
        ))}

        {stage.intent && <Callout title="Design intent">{stage.intent}</Callout>}

        {stage.teaches?.length ? (
          <div>
            <div className="label mb-2.5">Introduces</div>
            <ul className="flex flex-wrap gap-2">
              {stage.teaches.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-line bg-ink-850 px-2.5 py-1 font-mono text-[11px] text-fg-lo"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/* ── Endings ─────────────────────────────────────────────────────────────── */

const ENDING_KIND: Record<Ending['kind'], { label: string; className: string }> = {
  standard: { label: 'Ending', className: 'text-fg-lo' },
  hidden: { label: 'Hidden', className: 'text-status-production' },
  fail: { label: 'Fail state', className: 'text-status-shelved' },
};

function EndingItem({ ending }: { ending: Ending }) {
  const kind = ENDING_KIND[ending.kind];
  return (
    <li className="grid gap-4 border-t border-line py-6 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8">
      <div>
        <div className="tnum font-mono text-[13px]" style={{ color: 'var(--accent)' }}>
          {ending.code}
        </div>
        <div className={`mt-1 font-mono text-label uppercase tracking-label ${kind.className}`}>{kind.label}</div>
      </div>
      <div>
        <h3 className="font-display text-[17px] font-medium tracking-display text-fg-hi">{ending.name}</h3>
        <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-fg">{ending.body}</p>
        <p className="mt-3 text-[13px] leading-relaxed text-fg-dim">
          <span className="label mr-2">Trigger</span>
          {ending.trigger}
        </p>
      </div>
    </li>
  );
}

/* ── Systems ─────────────────────────────────────────────────────────────── */

const SYSTEM_STATE: Record<SystemEntry['state'], { label: string; className: string }> = {
  built: { label: 'Built', className: 'text-status-released' },
  building: { label: 'Building', className: 'text-status-production' },
  planned: { label: 'Planned', className: 'text-fg-dim' },
};

function SystemItem({ system }: { system: SystemEntry }) {
  const state = SYSTEM_STATE[system.state];
  return (
    <li className="grid gap-4 border-t border-line py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10">
      <div className="flex items-baseline gap-3 md:block">
        <span className="tnum font-mono text-[11px] text-fg-dim md:block">{system.code}</span>
        <h3 className="font-display text-[17px] font-medium tracking-display text-fg-hi md:mt-2">
          {system.name}
        </h3>
        <span className={`font-mono text-label uppercase tracking-label md:mt-2 md:block ${state.className}`}>
          {state.label}
        </span>
      </div>
      <div>
        <p className="max-w-prose text-[14.5px] leading-relaxed text-fg">{system.body}</p>
        {system.build && (
          <p className="mt-3 border-l border-line pl-4 font-mono text-[12.5px] leading-relaxed text-fg-dim">
            {system.build}
          </p>
        )}
      </div>
    </li>
  );
}

/* ── Roadmap ─────────────────────────────────────────────────────────────── */

const ROADMAP_STATE: Record<RoadmapColumn['state'], { label: string; dot: string; text: string }> = {
  built: { label: 'Built', dot: 'bg-status-released', text: 'text-fg' },
  building: { label: 'Building now', dot: 'bg-status-production', text: 'text-fg' },
  planned: { label: 'Planned', dot: 'bg-status-design', text: 'text-fg-lo' },
  excluded: { label: 'Deliberately not doing', dot: 'bg-ink-750', text: 'text-fg-dim line-through decoration-fg-dim/40' },
};

function RoadmapBoard({ columns }: { columns: RoadmapColumn[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((col) => {
        const meta = ROADMAP_STATE[col.state];
        return (
          <div key={col.state} className="rounded border border-line bg-ink-850 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              <span className="font-mono text-label uppercase tracking-label text-fg-lo">{meta.label}</span>
              <span className="tnum ml-auto font-mono text-label text-fg-dim">
                {String(col.items.length).padStart(2, '0')}
              </span>
            </div>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item} className={`text-[13px] leading-snug ${meta.text}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ── Gallery ─────────────────────────────────────────────────────────────── */

function Gallery({ items, pixelated }: { items: Shot[]; pixelated?: boolean }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((shot, i) => (
        <li key={shot.src}>
          <figure>
            <div className="overflow-hidden rounded border border-line bg-ink-850">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.caption}
                loading="lazy"
                className={`w-full ${pixelated ? 'pixelated' : ''}`}
              />
            </div>
            <figcaption className="mt-2.5">
              <span className="tnum font-mono text-label uppercase tracking-label text-fg-dim">
                {String(i + 1).padStart(2, '0')} · {shot.caption}
              </span>
              {shot.note && <p className="mt-1.5 text-[13px] leading-relaxed text-fg-lo">{shot.note}</p>}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/* ── Dispatcher ──────────────────────────────────────────────────────────── */

export function BlockView({ block, pixelated }: { block: Block; pixelated?: boolean }) {
  const shell = { id: block.id, label: block.label, heading: block.heading, intro: block.intro };

  switch (block.kind) {
    case 'prose':
      return (
        <Section {...shell}>
          <div className="grid gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12">
            <div className="space-y-5">
              {block.body.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-prose text-[15px] leading-relaxed text-fg">
                  {p}
                </p>
              ))}
            </div>
            {block.pull && (
              <p
                className="h-fit border-l-2 py-2 pl-5 font-display text-[19px] font-medium leading-snug tracking-display text-fg-hi md:text-[21px]"
                style={{ borderColor: 'var(--accent)' }}
              >
                {block.pull}
              </p>
            )}
          </div>
        </Section>
      );

    case 'stages': {
      const list = (
        <ol className="border-b border-line">
          {block.items.map((stage) => (
            <StageItem key={stage.index + stage.name} stage={stage} pixelated={pixelated} />
          ))}
        </ol>
      );
      return (
        <Section {...shell}>
          {block.spoiler ? (
            <SpoilerGate count={block.items.length} noun="stages">
              {list}
            </SpoilerGate>
          ) : (
            list
          )}
        </Section>
      );
    }

    case 'endings': {
      const list = (
        <ol className="border-b border-line">
          {block.items.map((e) => (
            <EndingItem key={e.code} ending={e} />
          ))}
        </ol>
      );
      return (
        <Section {...shell}>
          {block.spoiler ? (
            <SpoilerGate count={block.items.length} noun="endings">
              {list}
            </SpoilerGate>
          ) : (
            list
          )}
        </Section>
      );
    }

    case 'systems':
      return (
        <Section {...shell}>
          <ol className="border-b border-line">
            {block.items.map((s) => (
              <SystemItem key={s.code} system={s} />
            ))}
          </ol>
        </Section>
      );

    case 'cast':
      return (
        <Section {...shell}>
          {block.side && (
            <div
              className="mb-4 inline-block border-l-2 pl-3 font-mono text-[11px] uppercase tracking-label text-fg-lo"
              style={{ borderColor: 'var(--accent)' }}
            >
              {block.side}
            </div>
          )}
          {block.layout === 'row' ? (
            <CastRow items={block.items} />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {block.items.map((m) => (
                <li key={m.slug}>
                  <ModelCard member={m} />
                </li>
              ))}
            </ul>
          )}
        </Section>
      );

    case 'gallery':
      return (
        <Section {...shell}>
          <Gallery items={block.items} pixelated={pixelated} />
        </Section>
      );

    case 'roadmap':
      return (
        <Section {...shell}>
          <RoadmapBoard columns={block.columns} />
        </Section>
      );

    case 'table':
      return (
        <Section {...shell}>
          <dl className="border-t border-line">
            {block.rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-3.5 md:grid-cols-[14rem_1fr] md:gap-6">
                <dt className="label pt-0.5">{k}</dt>
                <dd className="text-[14px] leading-relaxed text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>
      );

    case 'log':
      return (
        <Section {...shell}>
          <ol className="border-b border-line">
            {block.entries.map((e) => (
              <li key={e.date + e.title} className="grid gap-3 border-t border-line py-5 md:grid-cols-[9rem_1fr] md:gap-8">
                <time className="tnum font-mono text-[12px] text-fg-dim">{e.date}</time>
                <div>
                  <h3 className="font-display text-[15px] font-medium tracking-display text-fg-hi">{e.title}</h3>
                  <p className="mt-1.5 max-w-prose text-[14px] leading-relaxed text-fg-lo">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      );
  }
}
