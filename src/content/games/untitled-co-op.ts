import type { Game } from '@/lib/types';

/**
 * Read from the nine design documents in C:/Unity/Temp — the intro script, six
 * chapter documents, the gameplay category library and the Production Master
 * Plan v1 (20 September 2026). The percentages come from that plan's own
 * position: the documents are a foundation, not a technical specification, and
 * the only code that exists is grey-box prototype scenes.
 *
 * The title is genuinely undecided — the overview document says so on line one.
 * The two leads carry the working names from those documents.
 */
export const untitledCoop: Game = {
  slug: 'untitled-co-op',
  title: 'Untitled',
  subtitle: 'The two-player project',
  logline:
    'A two-player story adventure. Two ordinary teenagers, one kingdom failing from both directions, and two completely different ways of trying to save it.',
  hook: 'A puppet master asks a crowd who will save them. Two people in that crowd are the answer — and neither of them gets there without the other player.',

  status: 'design',
  statusNote: 'Full production plan written. Prototypes only.',

  tracks: [
    { name: 'Story and chapter design', pct: 12, weight: 1 },
    { name: 'Grey-box prototype scenes', pct: 6, weight: 1 },
    { name: 'Playable acts — five chapters', pct: 0, weight: 5 },
    { name: 'Co-op, split-screen, checkpoints', pct: 0, weight: 5 },
    { name: 'Combat, traversal, interaction systems', pct: 0, weight: 4 },
    { name: 'Characters, environments, animation', pct: 0, weight: 1 },
    { name: 'Cinematics and audio', pct: 0, weight: 1 },
  ],
  progressNote:
    'Weighted against what gates a playable build, not against page count. Six chapter documents and an eleven-phase production plan exist, and three grey-box prototype scenes build and pass their smoke checks. Nothing counts as a completed act until it has an objective, escalation, failure, recovery and tested entry and exit — by that definition none of them are done.',

  started: 'September 2026',
  engine: 'Unity 6 · proposed',
  genre: 'Co-op story adventure',
  format: 'Two-player · split-screen and online',
  platforms: ['PC target'],

  role: [
    'Concept and story — the cinematic intro script, six chapter documents, and the agreed creative boundaries the production plan is not allowed to quietly widen',
    'Production planning — eleven phases with gate criteria, a scope model, per-chapter work packages and acceptance tests, written before any of it is built',
    'Grey-box prototypes in Unity 6 — shop, festival and two-fronts scenes, built headless and smoke-checked',
  ],
  disclosure:
    'Planned as a solo production using AI throughout, with human direction, playtesting and occasional bought-in specialists. Generated content does not count as gameplay until it works in the build.',

  showStanding: true,
  accent: '#C98A3C',

  links: [],
  metrics: [
    { k: 'Chapters', v: '5', sub: 'playable, plus an epilogue' },
    { k: 'Players', v: '2', sub: 'no solo mode planned' },
    { k: 'Phases', v: '11', sub: 'Phase 0 to Phase 10' },
    { k: 'Team', v: '1' },
  ],

  blocks: [
    {
      kind: 'prose',
      id: 'premise',
      label: 'The premise',
      heading: 'Two ordinary people, on opposite sides of the same failure.',
      pull: 'Perhaps we are waiting for the wrong people.',
      body: [
        'The opening is a puppet show. Ninety seconds of two scenes running at once — a starving army losing ground outside the border, and officials inside the palace loading the grain they took onto their own carts. Then an arm moves wrong. Wood strikes wood, strings become visible, and both halves fold together into two sides of one stage in front of a crowd.',
        'The puppet master asks that crowd who will save them. The lanterns go out one at a time until two spotlights are left, on two teenagers standing separately among the spectators. They are the two player characters, and the screen splits.',
        'The external threat is an invading army. The internal threat is a leadership that taxes the people defending it and would rather surrender than lose what it owns. The first three chapters are deliberately small — stocking a shop, clearing a path, running from trouble at a festival, working five days in a drink shop — because the last two only land if both players already know what the everyday was worth.',
        'Then they split. One goes to the battlefield. The other goes in through the palace service gate with a job in the kitchens and one sentence to work from: if I can get inside, perhaps I can make someone listen.',
      ],
    },
    {
      kind: 'stages',
      id: 'chapters',
      label: 'Chapters',
      heading: 'Five playable chapters, then the epilogue',
      intro:
        'The structure is agreed. Missions, dialogue and tactics are not. What follows is the shape each chapter has to deliver, and what it is allowed to cost.',
      items: [
        {
          index: '00',
          name: 'The Puppet Show',
          role: 'Locked 60–90 second opening. Not playable.',
          body: [
            'Two staged views, the puppet reveal, the pullback to the audience, the question, the two spotlights, and the handoff to split-screen play.',
            'Deliberately cheap to prove: the real-to-puppet transformation is the whole trick, and it has to be tested before it is allowed to set a visual standard the rest of the campaign cannot afford.',
          ],
          intent:
            'A ninety-second sequence must not set the art bar for twenty hours of game. Prove the reveal reads, then cap it.',
          teaches: ['Story / cinematic gameplay', 'Set piece'],
        },
        {
          index: '01',
          name: 'Two Worlds',
          role: 'Separate everyday journeys. Each player is going to find their mother.',
          body: [
            'Four acts each, run in parallel. She stocks the shop, crosses the neighbourhood, cooks a short sequence of dishes, and makes a market delivery. He clears felled timber, learns the boat, recovers loose animals, and crosses the hillside.',
            'Neither of them is going to a festival yet — they do not know each other. The invitations arrive in the closing cinematics, which is the first thing that points the two halves at one another.',
          ],
          intent:
            'The acceptance test here is timing, not content: if one route runs long, the other player spends a large part of the chapter waiting. The boat built here is the same boat Chapter 2 turns into a two-person version.',
          teaches: ['Exploration', 'Simulation / daily life', 'Traversal', 'Vehicle / mount'],
        },
        {
          index: '02',
          name: 'The Festival',
          role: 'They meet. Five cooperative acts, one continuous escape.',
          body: [
            'A group harasses her, he steps in, and they are immediately outnumbered. The escape is the chapter: a market chase, a stealth section, a stretch spent operating opposite ends of the same dragon costume, a rooftop climb, and a boat paddled out to safety.',
            'It ends quietly — a kiss on the cheek, and they go separate ways.',
          ],
          intent:
            'Every one of the five acts has to need both players, and the transitions have to read as one escape rather than five minigames. His intervention is staged tightly on purpose: it does not justify building a combat system two chapters before combat exists.',
          teaches: ['Chase / escape', 'Stealth', 'Cooperative mechanics', 'Traversal', 'Relationship / trust'],
        },
        {
          index: '03',
          name: 'The Drink Shop',
          role: 'Five working days. The war arrives through the customers.',
          body: [
            'One loop — read the order, collect, prepare, hand off, serve, reset — escalated across five days. Day one is forgiving. Day two brings wounded soldiers. Day three is the superior officer who is served and leaves without paying, with the day’s earnings making the loss visible. Day four is the busiest full service, with both kinds of customer in the room at once.',
            'Day five starts normally, then the advance reaches them. Civilians arrive, service ends early, and the shop closes so the group can move toward the capital.',
          ],
          intent:
            'Rising prices and taxes are authored story pressure, not an economy simulation. The invasion has to interrupt the routine as an interruption — not as one more score challenge with a harder target.',
          teaches: ['Resource management', 'Cooperative mechanics', 'Economy', 'Social / dialogue'],
        },
        {
          index: '04',
          name: 'The Recruitment',
          role: 'The king speaks. Afterwards they prepare for different things.',
          body: [
            'The journey to the capital is cinematic. They enter the palace together and hear the king promise protection — the last thing they do side by side for a while.',
            'He trains: movement and defence, attacking and reading enemy signals, working beside a crew, then a short combined exercise. She talks to people — hears a concrete problem, asks follow-ups, sees the circumstances, and recognises the pattern of help that was promised and never arrived.',
          ],
          intent:
            'Every training exercise has to teach something Chapter 5 actually uses; anything else gets cut. Her side needs conversational agency without becoming a detective system — a compact journal of what she has learned is enough. She is not employed by the palace yet.',
          teaches: ['Combat training', 'Investigation', 'Social / dialogue', 'Character progression'],
        },
        {
          index: '05',
          name: 'Two Fronts',
          role: 'The final playable chapter. Two genres, one conflict.',
          body: [
            'His half is direct battlefield action: a first manageable encounter with his crew, an escalation that demonstrates what bad orders and thin supplies cost, and a final battle where he is given a concrete order, understands why obeying it abandons the people, and pursues a different objective instead. He wins.',
            'Her half is a decision-driven palace drama and she never fights. Kitchen entry, earning trust and access, measuring the palace’s promises against what she saw at the shop, discovering the surrender, and getting the abandoned people out. Every consequential decision has exactly one correct answer; every other answer is a short failure and a local retry, not an alternate ending. She succeeds, and loses her position and her protection for it.',
            'They reunite inside this chapter, with his crew and the people she saved, and start planning to take the palace back.',
          ],
          intent:
            'Synchronisation is the hard part: finished encounters have to resolve into a safe state, shared revelations only fire at safe boundaries, and neither player replays completed work because the other one failed. If one role routinely finishes far earlier, the fix is pacing — not filler.',
          teaches: ['Combat', 'Choice & consequence', 'Asymmetric gameplay', 'Investigation'],
        },
        {
          index: '06',
          name: 'Cinematic Epilogue',
          role: 'Closing sequence. Not another set of missions.',
          body: [
            'Support gathers, the fight back happens, the palace is reclaimed and the enemy driven out. He leads the military effort; she brings people together and stays non-combat.',
            'It closes on ordinary life resuming — families going home, markets reopening, the drink shop serving again. Whether it returns to the puppet storyteller is still open.',
          ],
          intent:
            'Reuse familiar places and faces so restoration means something. No new playable missions and no retry sequences: the audience should be able to trace the wider victory back to what the two of them earned on screen.',
          teaches: ['Story / cinematic gameplay'],
        },
      ],
    },
    {
      kind: 'systems',
      id: 'systems',
      label: 'Systems',
      heading: 'What has to exist before any of that is playable',
      intro:
        'The chapters above are content. These are the foundations they all sit on — and the reason the overall figure is 1% rather than the share of documents written.',
      items: [
        {
          code: 'S1',
          name: 'Two-player session, split-screen and online',
          body: 'Local split-screen and online co-op are both intended capabilities, with separate objectives and cameras per player. Their practical design has to be proven early, not discovered in Chapter 5.',
          build: 'Unproven. The highest-risk item in the plan; Phase 2 exists to answer it.',
          state: 'planned',
        },
        {
          code: 'S2',
          name: 'Checkpoints and independent recovery',
          body: 'Each player fails and retries on their own clock. One player’s failure must not reset the other’s progress, and a faster player must never be parked in unwinnable combat while the other retries a decision scene.',
          build: 'Specified as per-act local checkpoints with tested entry and exit states. Not implemented.',
          state: 'planned',
        },
        {
          code: 'S3',
          name: 'Interaction, traversal and the boat',
          body: 'One shared vocabulary of carrying, placing, climbing, swinging and steering, reused from the first shop shift to the final escape. Depth comes from layout and escalating constraint, not from new verbs per chapter.',
          build: 'Grey-box only.',
          state: 'planned',
        },
        {
          code: 'S4',
          name: 'Combat — one style, few behaviours',
          body: 'Starts with a single coherent weapon style and a small set of distinct opponent behaviours, expanded only if the prototype proves the need. One of the two leads never fights at all, which halves the surface.',
          build: 'Not started. References are noted in the design documents; no system chosen.',
          state: 'planned',
        },
        {
          code: 'S5',
          name: 'Dialogue and authored decision scenes',
          body: 'The palace half needs decisions with authored prior information, one correct answer, a stated reason each wrong answer fails, a short failure scene and a precise local checkpoint. Access is gated by authored trust milestones rather than a relationship simulation.',
          build: 'Not started. The shape is specified in the plan; no scenes are written.',
          state: 'planned',
        },
        {
          code: 'S6',
          name: 'Grey-box prototype scenes',
          body: 'Three throwaway scenes standing in for the shop, the festival coordination and the two-fronts split, built headless so they can be smoke-checked without a GPU.',
          build: 'Unity 6000.2.9f1, null graphics device. Shop, festival and two-fronts all report ready and pass the self-check.',
          state: 'building',
        },
      ],
    },
    {
      kind: 'roadmap',
      id: 'roadmap',
      label: 'Roadmap',
      heading: 'Where the line is drawn',
      intro:
        'The last column is the important one. Two-player co-op does not imply any of it, and each item there would be its own production.',
      columns: [
        {
          state: 'built',
          items: [
            'Intro script, 90 seconds, shot by shot',
            'Six chapter documents',
            'Agreed creative boundaries',
            'Eleven-phase production plan with gate criteria',
          ],
        },
        {
          state: 'building',
          items: ['Grey-box prototype scenes', 'Headless build and smoke-check pipeline'],
        },
        {
          state: 'planned',
          items: [
            'Split-screen and online co-op proof',
            'Checkpoint and recovery model',
            'Shared traversal and interaction vocabulary',
            'One combat style, few opponent behaviours',
            'Authored decision scenes for the palace',
            'Five chapters of playable acts',
            'Cinematics, audio and accessibility passes',
          ],
        },
        {
          state: 'excluded',
          items: [
            'Solo play and AI companions',
            'Console versions and cross-play',
            'Host migration',
            'A persistent business-management economy',
            'A free-market price simulation',
            'General tree-physics simulation',
            'Independently simulated crowds',
            'A playable palace-retaking chapter',
          ],
        },
      ],
    },
    {
      kind: 'table',
      id: 'shape',
      label: 'Shape',
      heading: 'What it is, and what is still open',
      rows: [
        ['Genre', 'Co-op story adventure · two players · third-person'],
        ['Players', 'Two, required. Local split-screen and online both intended'],
        ['Structure', 'Five playable chapters, then a non-playable cinematic epilogue'],
        ['Asymmetry', 'One lead fights. The other never does, and plays a decision-driven palace drama'],
        ['Engine', 'Unity 6 proposed, on existing experience. Rendering and asset workflow unvalidated'],
        ['Title', 'Undecided. The leads carry the working names from the design documents'],
        ['Setting', 'Vietnamese cultural imagery. Kingdom, period and relationship to real history all open'],
        ['Enemy', 'An invading army. The specific historical or fictional framing is not settled'],
        ['State', 'Design documents complete. Production has just started'],
      ],
    },
    {
      kind: 'log',
      id: 'log',
      label: 'Log',
      heading: 'Since it started',
      entries: [
        {
          date: '20 Sep 2026',
          title: 'Story documents closed out',
          body: 'The intro script and all six chapter documents finished, and the gameplay category library filed as an idea bank rather than a feature checklist — it still refers to an older version of the story and does not override the current chapters.',
          tags: ['story'],
        },
        {
          date: '20 Sep 2026',
          title: 'Production Master Plan v1',
          body: 'Eleven phases, a scope model, per-chapter work packages, acceptance criteria, risks and the first ten working sessions. It states plainly that the documents are a foundation and not a technical specification, and that co-op has to be proven before anything is built on top of it.',
          tags: ['planning'],
        },
        {
          date: '21 Sep 2026',
          title: 'First prototype scenes build clean',
          body: 'Shop, festival and two-fronts grey-box scenes building headless under Unity 6000.2.9f1 and passing their smoke checks. A shader null in the shop scene’s box colouring was the last thing in the way.',
          tags: ['unity', 'prototype'],
        },
      ],
    },
  ],
};
