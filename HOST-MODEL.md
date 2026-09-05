# The host model — spec

The site's opening has a slot for a 3D model of you that introduces the work. The
speech bubble already runs without it; drop in a model and it gains a body.

**Nothing is broken while this is empty.** `studio.host.model` is `undefined`, the
hero lays out correctly, and the bubble carries the introduction on its own. Ship
the site as-is and add this when you're happy with it.

---

## Why this instead of a video

A talking-head video is a gate: a visitor has to commit before they know you're
worth it, and it's the one asset on your site that anyone could make. A 3D model of
you, rigged and running in the browser, *is* a work sample — it demonstrates the
Tripo → cleanup → engine pipeline you actually use, in the medium of the site
itself. And it costs a viewer nothing to look at.

The bubble is deliberately the same device your shipped game uses when Dad explains
the job. That's the callback holding the portfolio together.

---

## Hard budget

| | Target | Why |
| --- | --- | --- |
| Format | `.glb` | What `<model-viewer>` takes |
| **File size** | **≤ 3 MB** | Your Tripo exports are 57–65 MB. That is 20× over. This is the binding constraint. |
| Triangles | ≤ 40,000 | Raw Tripo output is ~1M. It renders at 224px on this page. |
| Textures | 1024², WebP or KTX2 | 2K+ is invisible at this size and dominates the file |
| Pose | Relaxed standing, slight 3/4 turn | **Not T-pose.** A T-pose reads as an asset dump, not a host. |
| Framing | Head-to-knee or full body | It renders in a 128×176 frame; a full body at that size loses the face |

If it lands above 5 MB, don't ship it — a slow, heavy hero is worse than no hero.

---

## Pipeline

Generate in Tripo from a clear, evenly lit photo of yourself — front-facing,
plain background, arms slightly away from the body. Export GLB. Then:

```bash
npx @gltf-transform/cli@latest optimize host-raw.glb host.glb --compress draco --texture-compress webp --texture-size 1024
```

That single command usually gets 60 MB down to 2–4 MB. If it's still too big, run
the decimation harder:

```bash
npx @gltf-transform/cli@latest simplify host-raw.glb host-lite.glb --ratio 0.04 --error 0.002
```

Then inspect what you actually produced before trusting it:

```bash
npx @gltf-transform/cli@latest inspect host.glb
```

Check the triangle count and total texture bytes in that output. If simplification
wrecked the face, raise `--ratio` and accept a larger file — the face is the only
part anyone looks at.

---

## Installing it

1. Put the file at `public/host/host.glb`.
2. Render a still of it (any viewer, transparent PNG) at `public/host/host.png` —
   it shows while the model streams.
3. In `src/content/studio.ts`:

```ts
host: {
  model: '/host/host.glb',
  poster: '/host/host.png',
  name: 'Thắng',
  role: 'Everything, currently',
  script: [ ... ],
},
```

That's the whole integration. The component picks it up, frames it, and slowly
rotates it beside the bubble.

## Tuning the framing

If the model sits badly in frame, adjust the camera in
`src/components/home/Host.tsx` — `orbit="0deg 82deg 2.2m"`. Third value is
distance: lower pulls in, higher pulls out. First is the horizontal angle.

## The script

`studio.host.script` is a plain array of strings. Five lines is about right — it
auto-advances every 7 seconds, pauses on hover, and advances on click. Keep each
under ~110 characters or the bubble grows taller than the model.

Write them as you'd actually speak. The current draft is mine — replace it with
your own voice, and say the thing a studio would want to know that isn't already
on the slate below.

## If you'd rather be stylised

A photoreal generation of a real person is the hardest thing to get right — near
misses read as uncanny in a way a stylised character never does. If the result
looks off, deliberately push it: heavy decimation to a faceted low-poly look reads
as an intentional style choice, sits closer to your pixel-art game, and is a much
safer target than photorealism.
