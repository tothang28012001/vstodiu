import type { Game } from '@/lib/types';

/**
 * Verified against the Unity project at C:/Unity/Turn_Off_The_Light — GameProgress.cs
 * (stages, endings, save model), StageFlow.cs (run + epilogue), RoomController.cs
 * (light modes), SetupRoomTasks.cs (chores), CREDITS.md, and the shipped build.
 * Ending names, Dad's lines and blurbs are quoted from the source, not paraphrased.
 */
export const turnOffTheLight: Game = {
  slug: 'turn-off-the-light',
  title: 'Turn Off The Light',
  logline:
    'A small child is told to go round the house switching the lights off. Sixty years later he is still in that bedroom, and there is one light left.',
  hook: 'Turning off the light is terrifying — unless you found that room’s memory first. Then the dark is warm.',

  status: 'released',
  statusNote: 'Shipped and playable. Free on itch.io.',
  started: '2026',
  shipped: 'August 2026',
  engine: 'Unity 6 · URP 2D',
  genre: 'Psychological horror · 2D side-on',
  format: 'Single-player · four rooms · three endings',
  platforms: ['Windows'],

  role: [
    'Solo developer — design, code, art direction, writing, release',
    '74 C# scripts — 56 runtime plus an 18-script editor toolchain that builds and re-dresses rooms from menu commands',
    'Two-tier save model: a run that New Game wipes, and a gallery of earned endings that it never touches',
    'Four chore minigames, each with its own input model — toilet aim, tooth scrubbing, noodle cooking, the garage door',
    'Rebindable input map with reset-to-defaults',
  ],
  disclosure:
    'AI-assisted on code and graphics. Third-party art is credited in the repo: Noto Emoji (Apache 2.0) and game-icons.net (CC BY 3.0) for the minigame icon sets.',

  accent: '#E8B04B',
  cover: '/works/turn-off-the-light/cover.png',
  hero: { src: '/works/turn-off-the-light/cover.png', fit: 'cover', position: 'center 78%' },
  pixelated: true,
  showcase: {
    src: '/works/turn-off-the-light/03-dad-intro.png',
    note: 'In game · the kid’s room',
    fit: 'cover',
    pixelated: true,
  },

  links: [
    {
      label: 'Play free on itch.io',
      href: 'https://tothang28012001.itch.io/vstodiu-turn-off-the-light',
      kind: 'play',
    },
  ],

  metrics: [
    { k: 'Rooms', v: '4' },
    { k: 'Endings', v: '3' },
    { k: 'Memories', v: '4', sub: 'hidden' },
    { k: 'Build', v: '36 MB', sub: 'Windows' },
    { k: 'Team', v: '1' },
  ],

  blocks: [
    {
      kind: 'prose',
      id: 'premise',
      label: 'Premise',
      heading: 'The chore is the horror.',
      pull: 'Nothing in the game asks you to be brave. It asks you to finish getting ready for bed.',
      body: [
        'Dad comes into the kid’s room, says four sentences, and leaves. “Listen, kid. You’re not a baby anymore. Your mom and I can’t do everything around here. So tonight, you’re gonna go turn off the lights when you’re done. Start with the bathroom. Think you can handle that?”',
        'That is the entire setup. There is no monster to escape and no goal beyond the one a parent just handed over. The player is never told to fight or flee — they are told to finish a chore list, and the chore list is the reason they keep walking into rooms they would rather leave.',
        'The player character is a toddler, drawn small and slow on purpose. Every fixture is above head height. Sixty years later the same player character walks the same bedroom as an old man, at 55% of the toddler’s speed, unable to jump — and by then the scale of the art is doing something else entirely.',
      ],
    },
    {
      kind: 'stages',
      id: 'rooms',
      label: 'Rooms',
      heading: 'Four rooms, in a fixed order',
      intro:
        'Bathroom, kitchen, living room, garage. Each room has its own chore before the light switch is even reachable — and turning the light off is not what finishes a stage. Walking home through the dark house is.',
      items: [
        {
          index: 'R0',
          name: 'The Kid’s Room',
          role: 'Home base. The only room that is never a stage.',
          image: '/works/turn-off-the-light/03-dad-intro.png',
          imageNote: 'Dad’s introduction. It plays once per save and never again.',
          body: [
            'Dad’s four lines play here on a fresh save, one speech bubble at a time, and then control is handed over. He returns to this room after every completed stage to say the house still is not dark: “Not enough. The kitchen light is still on.” Then “Still not enough. The living room now.” Then “One more. The garage.” After the garage he says nothing, because there is nothing left to send you to.',
            'The player never learns the word “stage”. There is one door in the hallway, and it quietly points somewhere new each time.',
          ],
          intent:
            'Hiding the structure is the point. A stage-select screen exists, but in the run itself the game presents as one continuous night in one house — so the progression never feels like levels being served up.',
          teaches: ['Walk, jump, interact', 'Dad does not come with you', 'The hallway door is the only way out'],
        },
        {
          index: 'R1',
          name: 'The Bathroom',
          role: 'Chores: Pee · Brush your teeth',
          image: '/works/turn-off-the-light/09-bathroom.png',
          imageNote: 'The bathroom, lights on — tub, sink and the hidden switch by the mirror.',
          body: [
            'Two minigames: a toilet aim game and a tooth-scrubbing game. The bathroom is the one room whose light switch is hidden until both chores are done — it is physically revealed on completion, so the player cannot skip ahead.',
            'The other three rooms invert this: their chore is itself reaching the switch, so finishing the puzzle and finding the switch are the same event.',
          ],
          intent:
            'The corner panel shows the room’s chores first and only swaps to the two stage conditions once the switch is actually reachable. The player is never shown a goal they cannot yet act on.',
          teaches: ['The objective panel', 'Chores gate the switch', 'Minigames are diegetic, not abstract'],
        },
        {
          index: 'R2',
          name: 'The Kitchen',
          role: 'Chore: Cook Dad’s noodles',
          image: '/works/turn-off-the-light/06-kitchen.png',
          imageNote: 'The kitchen, lights on — the pot prompt before the noodles minigame starts.',
          body: [
            'A cooking minigame with a pot, a fridge, a shelf of ingredients and a finished bowl. Ingredients are carried one at a time.',
            'Dad has already gone back to bed. The child is cooking for someone who is not waiting up.',
          ],
        },
        {
          index: 'R3',
          name: 'The Living Room',
          role: 'Chore: Put the tape in and watch it',
          image: '/works/turn-off-the-light/07-living-room.png',
          imageNote: 'The living room, lights on — the VHS player, the sofa, the wall calendar.',
          body: [
            'A VHS tape, a player, and a movie that has to run. The chore is not a puzzle so much as an obligation to sit still and watch something to the end.',
            'There is also a wall calendar in here, and a calendar unlocker. The room is where the game starts telling you when you are, rather than where.',
          ],
          intent:
            'The one chore in the game that costs time rather than skill. It is placed third, once the player has stopped expecting every room to test them.',
        },
        {
          index: 'R4',
          name: 'The Garage',
          role: 'Chore: Get the garage door open',
          image: '/works/turn-off-the-light/08-garage.png',
          imageNote: 'The garage, lights on — the car, the workbench, the door still closed.',
          body: [
            'A puzzle room, and the only room whose light controller does not exist until the puzzle is solved — it is created at runtime once the door opens.',
            'The garage is also the one place the game offers a way out that is not a light switch. There is a car.',
          ],
          intent:
            'Putting an exit in the final room means the last stage is the first time the player is offered a choice rather than an instruction. Everything before it is obedience by construction.',
          teaches: ['The car', 'An ending that is not the ending'],
        },
      ],
    },
    {
      kind: 'systems',
      id: 'systems',
      label: 'Systems',
      heading: 'What is actually running',
      items: [
        {
          code: '01',
          name: 'Three light modes, not two',
          state: 'built',
          body: 'A room lit is Normal. A room dark is Spooky — monsters enabled, nightmare audio snapshot. But if you found that room’s hidden memory before flipping the switch, the dark is Memory instead: calm, golden, no monsters. The mode is re-checked on every flip, so the same switch gives you a different dark depending on what you did earlier in the room.',
          build:
            'RoomController swaps three visual roots and transitions an AudioMixer snapshot per mode. The check reads both the session record and the saved one, so a resumed run still shows gold for a bulb collected before quitting.',
        },
        {
          code: '02',
          name: 'Memory bulbs',
          state: 'built',
          body: 'One hidden collectible per room — the shower, the bowl, the movie, the garage. Picking one up is what converts that room’s darkness from a threat into a memory. Collecting all four is the requirement for the best ending.',
          build:
            'Saved the instant it is collected rather than when the stage completes, so grabbing a bulb and quitting keeps it. Never cleared by re-playing a stage without finding it again — only New Game wipes them.',
        },
        {
          code: '03',
          name: 'A stage ends at home, not at the switch',
          state: 'built',
          body: 'A stage completes only when the room’s light is off AND the kid is standing back in their own bedroom. Relighting the room on the way home undoes the first condition, and the corner panel shows exactly that, so it never reads as arbitrary.',
          build:
            'The walk home through the dark house is the load-bearing part of the loop. Stage select drops you into the room rather than the bedroom, because the walk out was only travel — the walk back is the game.',
        },
        {
          code: '04',
          name: 'Two-tier save',
          state: 'built',
          body: 'The save splits in half. The RUN — stages finished, memories found — is what New Game throws away. The GALLERY — every ending ever reached — is never wiped. Chasing a different ending can never cost you one you already earned.',
          build:
            'The right to skip a cutscene is deliberately keyed to the gallery rather than the run: once you have sat through the game once you keep it forever, New Game included. A clip’s first viewing always plays in full.',
        },
        {
          code: '05',
          name: 'Resumable epilogue',
          state: 'built',
          body: 'The ending sequence is saved by phase — night, then morning — so quitting between the last light and the ending puts you back where you were instead of making you replay the garage to reach a door you had already walked to.',
        },
        {
          code: '06',
          name: 'Editor toolchain',
          state: 'built',
          body: 'Eighteen editor scripts build and re-dress the game from menu commands: generate art, build ending rooms, wire room chores, set up the epilogue, preview any ending clip without playing up to it.',
          build:
            'Re-runnable and idempotent — task lists are rewritten rather than merged, so fixing a typo in a chore label actually lands. Ending previews are one-shot flags that clear on read so they cannot hijack a real run.',
        },
        {
          code: '07',
          name: 'Rebindable input',
          state: 'built',
          body: 'Every action is remappable from the title screen: click a row, press the new key, Esc cancels.',
          build: 'Defaults: A / D move, Space jump, Left Shift duck, Left Ctrl sprint, E interact.',
        },
      ],
    },
    {
      kind: 'endings',
      id: 'endings',
      label: 'Endings',
      heading: 'Three endings',
      spoiler: true,
      intro:
        'Tracked in a gallery reachable from the title screen. Locked cards show only a hint, and the gallery is never wiped — so a New Game can never cost you one.',
      items: [
        {
          code: 'E1',
          name: 'Everything Remembered',
          kind: 'hidden',
          trigger: 'Turn off every light having found all four memory bulbs. Locked hint: “Some rooms keep more than the dark.”',
          body: '“Every bulb you went back for, and the one night they gave you back.” The card reads: You remembered everything. The hint is deliberately vague — it is the only clue a player who finished the game the ordinary way ever gets that there is anything else down here.',
        },
        {
          code: 'E2',
          name: 'Goodnight',
          kind: 'standard',
          trigger: 'Turn off every light, then go to bed. Memories left behind.',
          body: '“The house went dark, and everyone was still there.” The card reads: Goodnight. This is the ending a player reaches by doing exactly what they were told, which is what makes it the sadder of the two.',
        },
        {
          code: 'E3',
          name: 'The Road',
          kind: 'standard',
          trigger: 'In the garage, take the car instead of the switch. Locked hint: “Something in the garage goes further than the switch.”',
          body: '“The garage door was open, and you kept driving.” The card reads: You kept driving. It ends in a news broadcast, and there is no run left underneath to hand back to — the game simply sits on GAME OVER.',
        },
      ],
    },
    {
      kind: 'gallery',
      id: 'stills',
      label: 'Stills',
      heading: 'From the shipped build',
      items: [
        {
          src: '/works/turn-off-the-light/01-title.png',
          caption: 'Title',
          note: 'Endings sits in the main menu beside New Game — the collection is part of the promise, before you know there are three.',
        },
        {
          src: '/works/turn-off-the-light/02-stage-select.png',
          caption: 'Stage select',
          note: 'Bathroom open, kitchen / living room / garage padlocked. Each polaroid carries its own wall tint so the rooms read apart at a glance.',
        },
        {
          src: '/works/turn-off-the-light/03-dad-intro.png',
          caption: 'The Kid’s Room',
          note: 'Line one of four. It plays once per save, and Dad returns to this spot after every stage.',
        },
        {
          src: '/works/turn-off-the-light/04-your-job.png',
          caption: 'Your job',
          note: 'Room chores first. The two stage conditions replace them once the light switch is reachable.',
        },
        {
          src: '/works/turn-off-the-light/05-controls-BUGGY.png',
          caption: 'Controls',
          note: 'Keybinds are remappable from the title screen.',
        },
      ],
    },
    {
      kind: 'table',
      id: 'build',
      label: 'Build',
      heading: 'Build sheet',
      rows: [
        ['Engine', 'Unity 6 (6000.2.9f1) · Universal Render Pipeline, 2D renderer'],
        ['Code', '74 C# scripts — 56 runtime, 18 editor tooling'],
        ['Platform', 'Windows · TurnOffTheLight-Windows.zip · 36 MB'],
        ['Controls', 'A / D move · Space jump · L Shift duck · L Ctrl sprint · E interact · fully rebindable'],
        ['Scenes', 'MainMenu · StageSelect · Home · Gallery'],
        ['Save', 'PlayerPrefs, split into a wipeable run and a permanent ending gallery'],
        ['Art', 'Pixel art, AI-assisted · minigame icons from Noto Emoji and game-icons.net'],
        ['Price', 'Free'],
        ['Credit', 'tothang28012001 — Vstodiu'],
      ],
    },
  ],
};
