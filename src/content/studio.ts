export const studio = {
  name: 'Vstodiu',
  /** Shown under the wordmark on the index. */
  line: 'A one-person game studio working out of Vietnam.',

  /** The opening statement. One specific, surprising idea — never a slogan. */
  hook: 'Turning off the light is terrifying — unless you found that room’s memory first. Then the dark is warm.',
  hookCredit: 'Turn Off The Light — shipped 2026',

  intro: [
    "Vstodiu is the studio name I ship under. One person: design, code, art direction, writing, and the build that goes out the door.",
    "This site is the production slate. Every title below shows what is actually built, what is being built now, and what is still only on paper — with the same numbers I use to plan my own week. Nothing here is marked finished that is not finished.",
  ],

  /**
   * Top-of-page portrait. Leave both `src` and `video` undefined and the slot
   * renders as an empty plate. `video` takes priority over `src` when both are set.
   */
  portrait: {
    src: undefined as string | undefined,
    video: '/host/avatar.mp4' as string | undefined,
    alt: 'To, developer at Vstodiu',
  },

  /**
   * Skills, tools and languages — not counts. This sits at the end of the page,
   * after the work, as the reference section rather than the pitch.
   */
  fields: [
    { k: 'Engines', v: ['Unity 6', 'Universal Render Pipeline', 'Unity Input System', 'TextMeshPro'] },
    { k: 'Languages', v: ['C#', 'Python', 'TypeScript', 'HLSL / Shader Graph'] },
    { k: 'Programming', v: ['Gameplay systems', 'State machines', 'Save systems', 'Editor tooling', 'Unit testing'] },
    { k: '3D & technical art', v: ['Blender', 'Rigging', 'Skinning & weight painting', 'Keyframe animation', 'Shape keys', 'Retopology', 'PBR texturing'] },
    { k: '2D & UI', v: ['Pixel art', 'Sprite animation', 'UI layout', '2D lighting'] },
    { k: 'Design', v: ['Systems design', 'Level & encounter design', 'Narrative & branching', 'Game feel'] },
    { k: 'Pipeline', v: ['Git', 'Build & release', 'itch.io publishing', 'Asset optimisation'] },
  ],

  /**
   * The five-second read. Scannable before anyone commits to a paragraph —
   * this is what replaces a talking-head intro for a visitor in a hurry.
   */
  capabilities: [
    { k: 'Engine', v: 'Unity 6', sub: 'URP · 2D and 3D' },
    { k: 'Code', v: 'C#', sub: '156 scripts across the shipped titles' },
    { k: 'Tech art', v: 'Blender', sub: 'Python rigging · animation' },
    { k: 'Shipped', v: '3', sub: 'public and playable' },
  ],

  /** Longer-form, for the Studio page. */
  practice: [
    { k: 'Engines', v: 'Unity 6 · URP — three titles shipped' },
    { k: 'Disciplines', v: 'Systems design · gameplay code (C#) · Blender technical art · narrative' },
    { k: 'Shipped', v: '3 titles, public and playable' },
    { k: 'On AI', v: 'Used for base meshes and code assistance, disclosed per project' },
    { k: 'Working language', v: 'English · Vietnamese' },
  ],

  /**
   * The host. A 3D model of the developer that introduces the site, speaking
   * through the same bubble the shipped game uses for Dad's dialogue.
   *
   * `model` is intentionally undefined until a web-weight .glb exists — the hero
   * lays out correctly without it, so the site is presentable in the meantime.
   * See HOST-MODEL.md for the spec before generating one.
   */
  host: {
    model: undefined as string | undefined,
    poster: undefined as string | undefined,
    name: 'To',
    role: 'Everything, currently',
    /** Advanced by click, or on a timer. Keep each line under ~110 characters. */
    script: [
      "Hi — I'm To. I make games on my own, under the name Vstodiu.",
      'Three shipped, one on paper. The numbers below are not rounded up.',
      'Pick any game to see what I actually built.',
    ],
  },

  contact: {
    // Swap this for a studio alias any time — it is the only place it appears.
    email: 'toducthang28012001@gmail.com',
    itch: 'https://tothang28012001.itch.io',
    itchHandle: 'tothang28012001',
  },
};
