# Vstodiu

Portfolio and production slate for Vstodiu, a one-person game studio. Four titles,
each with a full analytical breakdown; the index shows what shipped, what is being
built, and what is still on paper.

Read [CONTENT-NOTES.md](CONTENT-NOTES.md) first — it lists which claims on the site
are verified against the Unity projects and which are still estimates.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind · `<model-viewer>` for GLB previews.

No animation library, no smooth-scroll hijacking, no custom cursor, no loading
screen. This is a document people read and skim, and those things get in the way of
reading and skimming.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## The one rule

**All game content is data. None of it lives in a component.**

```
src/content/
├── studio.ts              # studio name, bio, contact
└── games/
    ├── index.ts           # order, lookup, status buckets
    ├── turn-off-the-light.ts
    ├── tam-cam.ts
    ├── quang-tri-battle.ts
    └── thuy-tinh.ts
```

Adding a stage, an ending, a character or a whole new title is an edit to one data
file. `src/app/works/[slug]/page.tsx` renders every game from the same components,
and `generateStaticParams` picks up new entries automatically.

## Adding a game

1. Create `src/content/games/your-game.ts` exporting a `Game` (type in `src/lib/types.ts`).
2. Add it to the `games` array in `src/content/games/index.ts`.
3. Drop assets in `public/works/your-game/`.

That's it — the slate row, the status bucket, the page, the outline rail, the
footer link and the prev/next pager all follow from the data.

## The content model

A `Game` carries its metadata, its `role` list (what you personally did — this is
what the site is for), its `tracks`, and a `blocks` array. Each block is one
section on the page, and the outline rail is built from their `label`s.

| Block | Renders as |
| --- | --- |
| `prose` | Body copy with an optional pull quote |
| `stages` | Numbered breakdown — image, body, **design intent** callout, "introduces" chips |
| `endings` | Ending table with trigger conditions, spoiler-gated |
| `systems` | Numbered systems with a `built`/`building`/`planned` state and an implementation note |
| `cast` | Grid of character/asset cards with click-to-load 3D |
| `gallery` | Screenshot grid with per-image commentary |
| `roadmap` | Four columns: built / building / planned / **deliberately not doing** |
| `table` | Key–value status or build sheet |
| `log` | Dated dev-log entries (defined, not yet used) |

Blocks render in array order, so reordering a page is reordering the array.

### Progress is weighted

`progressOf()` uses a weighted mean. Each `Track` takes an optional `weight`
(default 1); streams that gate a playable build should carry 3–5, art streams 1.
Without this, a finished asset library makes a project with no code look nearly
done. See CONTENT-NOTES.md for the worked example.

## Home page structure

Image-led and short on words, in this order:

1. **`Portrait`** — a photo of the developer, name, one line, and the host
   bubble. The plate renders as an empty frame until `studio.portrait.src` is
   set, so the page ships without a photo.
2. **`Fields`** — which parts of game development the work covers. Every entry
   carries a number or a system name that can be checked against a page on this
   site, so it reads as evidence rather than a skills list. Edit
   `studio.fields`.
3. **`Showcase`** — the games, as pictures. Tabs switch a large plate showing
   what each game actually looks like; the only text is the title, status and
   genre.
4. **The slate** — status-grouped rows with the hook line and progress.

### Showcase images

Each game supplies a `showcase`:

```ts
showcase: { src: '…/scene.webp', note: 'In engine · the house, Act I', fit: 'cover' },
```

Prefer real gameplay or in-engine capture over key art or model sheets — the
`note` is shown as a badge, so an image that is a reference or a concept can say
so rather than pretending. `fit: 'contain'` for cut-out art with no background.

## The switcher

`src/app/page.tsx` builds a small `ShowcaseItem[]` on the server and passes it to
`Showcase` — only the fields the switcher needs, so the whole content layer stays
out of the client bundle.

All plates are mounted and crossfaded rather than swapped, so switching never
flashes an empty frame waiting on a fetch. Only the first is `priority`. A game
needs a `showcase` to appear in the switcher at all.

## The host

The opening has a slot for a 3D model of the developer that introduces the site,
speaking through the same bubble the shipped game uses for Dad's dialogue.

It runs with no model — `studio.host.model` is `undefined`, the hero lays out
correctly, and the bubble carries the introduction alone. See
[HOST-MODEL.md](HOST-MODEL.md) for the file spec and the decimation pipeline
before generating one; the binding constraint is a 3 MB budget against Tripo
exports that arrive at 60 MB.

Edit the introduction in `studio.host.script` — a plain array of strings.

## Motion

No animation library. Four quiet things, all opt-out under
`prefers-reduced-motion`:

- **`Reveal`** (`src/components/motion/Reveal.tsx`) — fade-and-rise on first
  entry into view, applied to block sections, stage entries, slate rows and the
  capability strip. Deliberately one-way: content that re-animates on scroll-back
  makes a long document feel unstable.
- **`ProgressBar`** fills from zero when it scrolls into view, staggered down a
  `TrackList`, so a percentage reads as a measurement being taken.
- **Hero plate drift** — a 30s scale-and-pan on whichever background is showing.
- **Hook and bubble crossfades** on switch.

### Two failure modes these guard against

Reveals start at `opacity: 0`, so anything that stops them running would leave
the page blank. Both are covered:

1. **No JavaScript** — a `<noscript>` rule in `layout.tsx` forces
   `[data-reveal]` visible. Don't remove one half of that pair.
2. **Observer never runs** — a working `IntersectionObserver` always delivers an
   initial callback, even for an off-screen element. If none arrives within
   1.5s, the content shows anyway. This matters in hidden or throttled tabs,
   where observers and `requestAnimationFrame` are frozen.

## Design system

Neutral graphite chrome so the games supply all the colour. Each game sets one
`accent` hex, exposed as `--accent` on its page wrapper and used for rules,
progress fills, the play button and the active outline marker.

Tokens are in `tailwind.config.ts`:

- `ink-950…750` — backgrounds, darkest to lightest
- `fg-hi` / `fg` / `fg-lo` / `fg-dim` — text scale. Never pure white.
- `line` / `line-strong` — hairlines
- `status-*` — one muted colour per pipeline state
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels and data)

Two utility classes carry most of the look: `.label` (mono, uppercase, wide
tracking) and `.tnum` (tabular numerals, so figures don't reflow).

## 3D models

`ModelCard` shows the flat PNG render and only mounts `<model-viewer>` when the
reader clicks **3D ↻**. The models are 5–8 MB each and the Quảng Trị page has 22 of
them — eager loading would be ~165 MB.

**Worth doing:** run the GLBs through Draco or meshopt compression
(`gltf-transform optimize`). A 10× reduction is typical and would make eager 3D
viable.

## Accessibility

Skip link, visible focus rings on `--accent`, `aria-current` on the active outline
item, real `<progressbar>` semantics on the bars, and
`prefers-reduced-motion` honoured globally.
