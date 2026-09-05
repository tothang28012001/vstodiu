# Going live on Vercel

Everything on this side is done: the project builds clean, the repo is committed,
`.gitignore` is set, the models are compressed, and metadata reads the deployment
URL from the environment. What's left needs your Vercel account, which I can't log
into for you.

## The fastest way — one command

From the project folder:

```bash
npx vercel
```

It will open a browser to log in, then ask a few questions. The answers:

| Prompt | Answer |
| --- | --- |
| Set up and deploy? | **Y** |
| Which scope? | your personal account |
| Link to existing project? | **N** |
| Project name | `vstodiu` (or anything) |
| In which directory is your code? | `./` — press Enter |
| Modify build settings? | **N** — it detects Next.js |

That gives you a preview URL. When it looks right, publish it:

```bash
npx vercel --prod
```

You'll get a permanent `vstodiu.vercel.app` address.

## The better way — connect GitHub

Deploying from the CLI means you re-run it by hand every time. If you push to
GitHub instead, Vercel rebuilds automatically on every commit, which is what you
want for something you'll keep editing.

1. Create an empty repo on GitHub — **do not** add a README or .gitignore, this
   project already has both.
2. Connect and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/vstodiu.git
git branch -M main
git push -u origin main
```

3. Go to [vercel.com/new](https://vercel.com/new), pick the repo, press Deploy.
   No settings to change — Next.js is detected.

From then on, `git push` publishes.

## A custom domain

Once you own a domain, add it in Vercel under **Project → Settings → Domains**,
then set an environment variable so link previews and social cards point at the
real address rather than the `.vercel.app` one:

**Project → Settings → Environment Variables**

```
NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

Redeploy after adding it. Without it the site still works — it just falls back to
the Vercel URL.

## About the size

The 3D models were 248 MB, which would have made every deploy slow and every
model click a multi-megabyte download. They are now Draco-compressed with WebP
textures — the same geometry, about 20× smaller.

If you add new `.glb` files later, compress them the same way before committing:

```bash
npx @gltf-transform/cli optimize in.glb out.glb --compress draco --texture-compress webp --texture-size 1024 --simplify-error 0.002
```

Those settings were checked by rendering the compressed model and comparing it to
the original — at the size these appear on the page, the difference is invisible.

## Checks before you publish

- `npm run build` passes locally
- `npm run typecheck` passes
- Your email in `src/content/studio.ts` is the address you want public — it is
  currently your personal Gmail
- The three missing room screenshots (see CONTENT-NOTES.md) — the Turn Off The
  Light page has gaps until those are added

None of these block a deploy. The email is the one worth deciding before the site
has a public URL.
