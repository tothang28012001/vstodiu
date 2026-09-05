import type { Game } from '@/lib/types';

/**
 * Verified against the Unity project at C:/Unity/TamCam — GameEnums.cs (acts and
 * endings), DreadSystem / RecognitionSystem / RealitySystem, the Act1–4 directors,
 * and CharacterWork/ (Blender files + Python rigging scripts).
 */
export const tamCam: Game = {
  slug: 'tam-cam',
  title: 'The Untold',
  vi: 'Tấm Cám',
  subtitle: 'Tấm Cám: The Untold',
  logline:
    'You play Cám, wearing her stepsister’s face. The house knows. Chapter one is called Four Jars, and you are gathering them.',
  hook: 'Denial relieves. Mercy costs. The game makes cruelty the comfortable option, then watches what you do.',

  status: 'production',
  statusNote: 'Chapter 1 in development. Systems and act flow implemented; art and audio behind.',
  tracks: [
    { name: 'Core systems (Dread / Reality / Recognition)', pct: 70, weight: 3 },
    { name: 'Act flow & encounters', pct: 55, weight: 4 },
    { name: 'Character rigs & animation', pct: 50, weight: 2 },
    { name: 'Environment art', pct: 25, weight: 3 },
    { name: 'Audio', pct: 15, weight: 2 },
  ],
  progressNote:
    'Measured against Chapter 1 — “Bốn Cái Hũ” (Four Jars) — not a finished game. 82 C# scripts (52 runtime, 30 editor) with a service locator, an event bus and a unit-test assembly are in; the house they run in is blocked out rather than dressed. Weighted towards the streams that gate a playable chapter, so finished art cannot inflate the figure.',

  started: '2026',
  engine: 'Unity 6 · URP',
  genre: 'Psychological horror',
  format: 'Single-player · third-person · chaptered',
  platforms: ['PC'],

  role: [
    'Design and code — 82 C# scripts (52 runtime, 30 editor tooling), service-locator architecture, event bus, unit-tested systems',
    'The three systems below, written so none of them is ever shown to the player as a number',
    'Blender technical art: scripted re-rigging in Python (guard hand rig, knock rig, verification passes), walk and run cycles, facial shape keys',
    'Adaptation and script — the Vietnamese folk tale played from the villain’s side',
  ],
  disclosure:
    'Base character meshes are Tripo AI generations, exported around a million triangles each. The rigging, animation, shape keys, retargeting and all game code are hand-authored on top.',

  standingAt: 'end',
  accent: '#C0483F',
  cover: '/works/tam-cam/hero.png',
  showcase: {
    src: '/works/tam-cam/scene.webp',
    note: 'In engine · the house, Act I',
    fit: 'cover',
  },
  hero: { src: '/works/tam-cam/hero.png', fit: 'cover', position: 'center 45%' },

  links: [],
  banner: { src: '/works/tam-cam/scene.webp', note: 'In engine · the house, Act I' },

  metrics: [
    { k: 'Chapter', v: '1', sub: 'of a longer game' },
    { k: 'Acts', v: '6' },
    { k: 'Endings', v: '3' },
    { k: 'C# scripts', v: '82' },
    { k: 'Team', v: '1' },
  ],

  blocks: [
    {
      kind: 'cast',
      id: 'cast',
      label: 'Cast',
      heading: 'Who is in the house',
      layout: 'row',
      intro:
        'Scroll sideways. Every card is the real export out of the character pipeline — press 3D to turn one.',
      items: [
        {
          slug: 'tam',
          name: 'Tấm',
          role: 'The face you are wearing',
          note: 'The stepdaughter. She is not the player character — she is what the whispers are coming from.',
          model: '/works/tam-cam/cast/tam.glb',
          image: '/works/tam-cam/cast/tam.png',
        },
        {
          slug: 'tam-evil',
          name: 'Tấm — returned',
          role: 'What comes back',
          note: 'Has her own run cycle, animated separately. The house rots around her on the same corruption curve.',
          model: '/works/tam-cam/cast/tam-evil.glb',
          image: '/works/tam-cam/cast/tam-evil.png',
        },
        {
          slug: 'di-ghe',
          name: 'Dì Ghẻ',
          role: 'The mother',
          note: 'Not evil. Practical. She loves one daughter and has decided which. Her head is where the Reality system falls.',
          model: '/works/tam-cam/cast/di-ghe.glb',
          image: '/works/tam-cam/cast/di-ghe.png',
        },
        {
          slug: 'ba-lao',
          name: 'Bà Cụ',
          role: 'The interlude',
          note: 'Arrives at the door with a persimmon. She is the beat where the chapter says out loud what you are.',
          model: '/works/tam-cam/cast/ba-lao.glb',
          image: '/works/tam-cam/cast/ba-lao.png',
        },
        {
          slug: 'guard-1',
          name: 'Palace guard I',
          role: 'Act I',
          note: 'Rigged for the approach and the knock. The hand rig and the knock are separate scripted Blender passes.',
          model: '/works/tam-cam/cast/guard-1.glb',
          image: '/works/tam-cam/cast/guard-1.png',
        },
        {
          slug: 'guard-2',
          name: 'Palace guard II',
          role: 'Act I',
          note: 'Shares the walk cycle. Two of them break in.',
          model: '/works/tam-cam/cast/guard-2.glb',
          image: '/works/tam-cam/cast/guard-2.png',
        },
      ],
    },
    {
      kind: 'prose',
      id: 'story',
      label: 'The story',
      heading: 'She is coming back, and she is bringing your memory with her.',
      pull: 'You are not being chased. You are being shown.',
      body: [
        'Tấm Cám is the Vietnamese folk tale every child here is told at bedtime. A stepdaughter, worked and cheated by her stepmother and stepsister, is killed. She comes back — as a bird, as a tree, as a fruit, as a woman in a loom — and each time she comes back, they kill her again. Most retellings stop before the ending, because of what she finally does about it.',
        'This game starts at that ending. Tấm has come back for the last time, and she has come for Cám.',
        'You play Cám. Not the wronged one — the one who did it. And the revenge Tấm has chosen is not to kill you. It is to walk you back through every single thing you and your mother did to her, and make you do it from inside her body.',
        'So you sort the grain that could not be sorted before morning. You scrub the blood off a floor before someone comes through the door. You sit at the loom under a voice that knows exactly whose face you are wearing. Every task in this game is a cruelty you handed out once, handed back, with you on the receiving end of it.',
        'The house helps her. Doors are not where you left them. The light goes wrong. And underneath it all, quietly, in Vietnamese and in English, she talks to you — kẻ mạo danh, imposter; chị Tấm ơi; you took her place; the water is so cold; give it back; look at me; you know my face.',
        'The game never tells you to feel sorry. It gives you a chore list and a night to finish it in, and lets you work out on your own what the chore list is made of. What it measures is whether you keep going the easy way — shut her out, get it done — or whether at some point you stop and let her be seen. That choice is not a menu. It is the whole game, and it decides how the night ends.',
      ],
    },
    {
      kind: 'stages',
      id: 'acts',
      label: 'The acts',
      heading: 'Chapter one — Bốn Cái Hũ, Four Jars',
      intro:
        'Six beats. Three of them are a jar of Bống’s bones, earned by finishing one of Tấm’s old tasks. The fourth jar is paid at the end.',
      items: [
        {
          index: '0',
          name: 'Intro — the kitchen',
          role: 'The covered pot, the head, Tấm’s transformation.',
          body: [
            'The chapter opens in a warm, ordinary world — daylight, a house that behaves. You walk it, you touch things, nothing is wrong.',
            'Then you lift the lid off the pot in the kitchen. The world does not recover from that, and neither does the lighting: from here the sun is a blood moon and the house begins to rot as the night goes on.',
          ],
          intent:
            'The prologue exists so the Reality system has a “before” to fall away from. Without a normal world first, the blood moon is just an art style.',
        },
        {
          index: 'I',
          name: 'Blood — Jar 1',
          role: 'Scrub the blood before the soldiers break in.',
          body: [
            'Gameplay: get on your knees and clean, against a clock you cannot see. Two palace guards walk the courtyard outside on their own timing, and the only warning you get is the sound of them getting closer, then the knock.',
            'It is the tale’s first cruelty played back at you. Someone else scrubbed this floor once because you told them to.',
          ],
          teaches: ['Time pressure', 'The guards', 'Dread rises while you endure'],
        },
        {
          index: 'II',
          name: 'Grain — Jar 2',
          role: 'Sort rice from beans. The oriole. The banana tree.',
          body: [
            'Gameplay: a bowl, two kinds of grain, and not enough night. In the story this is the task designed to be impossible — here you actually have to sit and do it, grain by grain, and feel how long that is.',
            'In the tale a bird comes to help her. Something still comes. It is not helping you.',
          ],
          image: '/works/tam-cam/environment.png',
          imageNote: 'The grain bowl, in engine.',
        },
        {
          index: 'III',
          name: 'Loom — Jar 3',
          role: 'Weave under the judging voice and the needle.',
          body: [
            'Gameplay: keep the loom running while it talks to you. The loom speaks in the folk tale — a warning to the woman who took Tấm’s place. Here you are that woman, and it is speaking to you by name.',
            'The third jar is here. So is the point where the game stops being a chore list.',
          ],
        },
        {
          index: 'IV',
          name: 'Interlude — Bà Cụ at the door',
          role: 'The persimmon, the face-swap, the faint.',
          body: [
            'No task. An old woman comes to the door with a persimmon, and looks at you a moment too long.',
            'This is the beat where the chapter says out loud what you are, and the face you have been wearing does not hold.',
          ],
        },
        {
          index: 'V',
          name: 'Epilogue — HẾT MÀN 1',
          role: 'Wake, cross to the mother’s room, the head rolls.',
          body: [
            'You wake up. There is one door left and it is your mother’s. The fourth jar is paid in that room.',
            'HẾT MÀN 1 — end of act one. The chapter closes; the story does not.',
          ],
        },
      ],
    },
    {
      kind: 'table',
      id: 'status',
      label: 'Status',
      heading: 'Status sheet',
      rows: [
        ['State', 'Chapter 1 in development — systems in, environment art behind'],
        ['Engine', 'Unity 6 (6000.2.9f1) · URP'],
        ['Architecture', 'Service locator · event bus · state machine · test assembly'],
        ['Format', 'Single-player · third-person · 3D'],
        ['Source', 'Vietnamese folklore — Tấm Cám, played as Cám'],
        ['Scene', 'Nhà Ba Gian — the traditional three-compartment house'],
        ['Release', 'To be announced'],
        ['Platform', 'PC'],
      ],
    },
  ],
};
