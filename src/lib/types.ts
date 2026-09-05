/**
 * Content model for the works archive.
 *
 * Every page on this site is rendered from these types — there is no game
 * content inside a component. Adding a stage, an ending or a whole new title
 * is a data edit under `src/content/`, never a JSX edit.
 */

export type Status = 'released' | 'production' | 'design' | 'concept' | 'shelved';

export const STATUS_META: Record<Status, { label: string; blurb: string; order: number }> = {
  released: { label: 'Released', blurb: 'Shipped and playable today.', order: 0 },
  production: { label: 'In production', blurb: 'Being built right now.', order: 1 },
  design: { label: 'In design', blurb: 'Systems on paper, art in progress, no vertical slice yet.', order: 2 },
  concept: { label: 'Concept', blurb: 'Documented and costed. Not started.', order: 3 },
  shelved: { label: 'Shelved', blurb: 'Paused deliberately. Kept here because the work still counts.', order: 4 },
};

/** A single tracked workstream, so the index can show *what* is left, not just a bar. */
export type Track = {
  name: string;
  /** 0–100. Honest estimates; see `progressNote` on the game for the basis. */
  pct: number;
  /**
   * Share of the remaining work this stream represents. Defaults to 1.
   *
   * Without this an unweighted mean lets a finished art library hide the fact
   * that no code exists — a concept with good character models scores higher
   * than a title actually in production. Weight the streams that gate a
   * playable build above the ones that do not.
   */
  weight?: number;
};

export type Link = {
  label: string;
  href: string;
  kind: 'play' | 'source' | 'video' | 'doc' | 'external';
};

/* ── Blocks ─────────────────────────────────────────────────────────────── */

type BlockBase = {
  /** Anchor id, also used by the sticky outline rail. */
  id: string;
  /** Short rail label. */
  label: string;
  heading: string;
  intro?: string;
  /** Hide behind a spoiler gate until the reader opts in. */
  spoiler?: boolean;
};

export type Stage = {
  index: string;
  name: string;
  /** One-line function of this stage in the whole. */
  role: string;
  image?: string;
  imageNote?: string;
  body: string[];
  /** Design intent — the recruiter-facing "why it is built this way". */
  intent?: string;
  /** Concrete mechanics introduced or changed here. */
  teaches?: string[];
};

export type Ending = {
  code: string;
  name: string;
  kind: 'standard' | 'hidden' | 'fail';
  trigger: string;
  body: string;
};

export type CastMember = {
  slug: string;
  name: string;
  /** Vietnamese name where it differs from the display name. */
  vi?: string;
  role: string;
  note: string;
  /** Path to a .glb, relative to /public. Rendered in an interactive viewer. */
  model?: string;
  image?: string;
};

export type SystemEntry = {
  code: string;
  name: string;
  body: string;
  /** How it is actually implemented — the part a studio wants to read. */
  build?: string;
  state: 'built' | 'building' | 'planned';
};

export type Shot = { src: string; caption: string; note?: string };

export type RoadmapColumn = {
  state: 'built' | 'building' | 'planned' | 'excluded';
  items: string[];
};

export type LogEntry = { date: string; title: string; body: string; tags?: string[] };

export type Block =
  | (BlockBase & { kind: 'prose'; body: string[]; pull?: string })
  | (BlockBase & { kind: 'stages'; items: Stage[] })
  | (BlockBase & { kind: 'endings'; items: Ending[] })
  | (BlockBase & { kind: 'systems'; items: SystemEntry[] })
  | (BlockBase & {
      kind: 'cast';
      items: CastMember[];
      /** 'row' scrolls horizontally — better for a long cast or an arsenal. */
      layout?: 'grid' | 'row';
      /** Optional side label, e.g. which team a group of characters belongs to. */
      side?: string;
    })
  | (BlockBase & { kind: 'gallery'; items: Shot[] })
  | (BlockBase & { kind: 'roadmap'; columns: RoadmapColumn[] })
  | (BlockBase & { kind: 'table'; rows: [string, string][] })
  | (BlockBase & { kind: 'log'; entries: LogEntry[] });

/* ── Game ───────────────────────────────────────────────────────────────── */

export type Game = {
  slug: string;
  title: string;
  /** Native-script title where the display title is an anglicisation. */
  vi?: string;
  subtitle?: string;
  logline: string;
  /**
   * The one idea that makes a stranger lean in, set at display size above the
   * logline. Not a tagline — a specific, surprising fact about how the game works.
   */
  hook?: string;

  status: Status;
  /** One line on where it actually stands. Shown next to the status chip. */
  statusNote: string;
  /** 0–100 overall. Derived from `tracks` when present. */
  tracks?: Track[];
  progressNote?: string;

  started: string;
  shipped?: string;
  engine: string;
  genre: string;
  format: string;
  platforms: string[];

  /** What the author personally did. This is the point of the site. */
  role: string[];
  /** Anything not hand-made, stated plainly. */
  disclosure?: string;
  /**
   * Show the "Where it stands" panel (role + progress breakdown). Off for
   * pages that are meant to read as the game rather than as a status report.
   */
  showStanding?: boolean;
  /**
   * Where the status panel goes. 'end' lets a page lead with the game and keep
   * the numbers as a footnote, which is what a story-led page wants.
   */
  standingAt?: 'top' | 'end';

  /** Per-game accent, the one place colour enters the chrome. */
  accent: string;
  cover?: string;
  /**
   * Full-bleed art for the switchable opening. Separate from `cover` because a
   * transparent character render works as a card thumbnail but not as a
   * background — those need `fit: 'contain'` and a wash behind them.
   */
  hero?: { src: string; fit?: 'cover' | 'contain'; position?: string };
  /**
   * The single image that best answers "what does this game look like".
   * Prefer real gameplay or in-engine capture over key art or model sheets.
   */
  showcase?: { src: string; note: string; fit?: 'cover' | 'contain'; pixelated?: boolean };
  /** Render covers/stills with `image-rendering: pixelated`. */
  pixelated?: boolean;

  links: Link[];
  /** Headline numbers for the stat strip. Keep to 4–5, or empty to hide it. */
  metrics: { k: string; v: string; sub?: string }[];
  /** Full-bleed image under the hero — used when the page leads with a picture. */
  banner?: { src: string; note?: string };

  blocks: Block[];
};

/** Overall completion: weighted mean of the tracks, or 100 once shipped. */
export function progressOf(game: Game): number {
  if (game.status === 'released') return 100;
  if (!game.tracks?.length) return 0;
  const weighted = game.tracks.reduce((sum, t) => sum + t.pct * (t.weight ?? 1), 0);
  const weights = game.tracks.reduce((sum, t) => sum + (t.weight ?? 1), 0);
  return Math.round(weighted / weights);
}
