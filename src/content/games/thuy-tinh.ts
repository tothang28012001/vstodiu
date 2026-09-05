import type { Game } from '@/lib/types';

/**
 * Backlog title. Character images are Blender renders of the source FBX files
 * in C:/Char/sontinhthuytinh — full body, on transparency.
 */
export const thuyTinh: Game = {
  slug: 'thuy-tinh-the-adventure',
  title: 'The Adventure',
  vi: 'Thủy Tinh',
  subtitle: 'Thủy Tinh: The Adventure',
  logline:
    'An open world where you play the god of the sea, fighting for the hand of the princess Mỵ Nương.',
  hook: 'You are the god who came second. The myth already knows how this ends — you have one night to argue with it.',

  status: 'concept',
  statusNote: 'Backlog. Cast designed; the game is not started.',

  started: '2026',
  engine: 'Not started',
  genre: 'Open-world adventure',
  format: 'Single-player · third-person',
  platforms: ['PC target'],

  role: ['Concept, casting and art direction'],
  disclosure: 'Characters are AI-generated, rendered here in Blender. Nothing is hand-modelled.',

  showStanding: false,
  accent: '#4B87B8',
  cover: '/works/thuy-tinh-the-adventure/cast/thuy-tinh.webp',
  hero: { src: '/works/thuy-tinh-the-adventure/cast/thuy-tinh.webp', fit: 'contain', position: '84% 72%' },
  showcase: {
    src: '/works/thuy-tinh-the-adventure/cast/thuy-tinh.webp',
    note: 'Thủy Tinh · god of water',
    fit: 'contain',
  },

  links: [],
  metrics: [],

  blocks: [
    {
      kind: 'cast',
      id: 'court',
      label: 'The court',
      heading: 'Four at the palace',
      layout: 'row',
      intro: 'Scroll sideways; press 3D on a card to turn the model.',
      items: [
        {
          slug: 'thuy-tinh',
          name: 'Thủy Tinh',
          vi: 'God of water',
          role: 'You',
          note: 'The sea. Every flood in the story is his answer to losing.',
          model: '/works/thuy-tinh-the-adventure/cast/thuy-tinh.glb',
          image: '/works/thuy-tinh-the-adventure/cast/thuy-tinh.webp',
        },
        {
          slug: 'son-tinh',
          name: 'Sơn Tinh',
          vi: 'God of the mountain',
          role: 'Rival',
          note: 'The one the story lets win.',
          model: '/works/thuy-tinh-the-adventure/cast/son-tinh.glb',
          image: '/works/thuy-tinh-the-adventure/cast/son-tinh.webp',
        },
        {
          slug: 'my-nuong',
          name: 'Mỵ Nương',
          vi: 'The princess',
          role: 'The reason',
          note: 'The king’s daughter. Both gods are here for her.',
          model: '/works/thuy-tinh-the-adventure/cast/my-nuong.glb',
          image: '/works/thuy-tinh-the-adventure/cast/my-nuong.png',
        },
        {
          slug: 'vua-hung',
          name: 'Vua Hùng',
          vi: 'The king',
          role: 'Sets the terms',
          note: 'Names the three tributes, and the deadline.',
          model: '/works/thuy-tinh-the-adventure/cast/vua-hung.glb',
          image: '/works/thuy-tinh-the-adventure/cast/vua-hung.webp',
        },
      ],
    },
    {
      kind: 'prose',
      id: 'tale',
      label: 'The tale',
      heading: 'Two gods, one daughter, and a king who will not choose.',
      pull: 'Whoever brings the three tributes first takes her home.',
      body: [
        'Vua Hùng has a daughter, Mỵ Nương, and two suitors who are both gods. Sơn Tinh commands the mountain. Thủy Tinh commands the water. Neither can be refused and neither can be preferred, so the king sets a price instead: three impossible tributes, delivered by dawn.',
        'Sơn Tinh gets there first. Thủy Tinh, arriving second, raises the sea — and in the Vietnamese telling that is why the floods come back every single year, still arguing.',
        'You play the one who lost. The open world is the delta on the one night the race is run.',
      ],
    },
    {
      kind: 'cast',
      id: 'tributes',
      label: 'The tributes',
      heading: 'Three impossible things',
      layout: 'row',
      intro:
        'The king’s price: an elephant with nine tusks, a rooster with nine spurs, a horse with nine red manes. Find them, and convince them.',
      items: [
        {
          slug: 'voi-chin-nga',
          name: 'Voi Chín Ngà',
          vi: 'Elephant with nine tusks',
          role: 'Tribute I',
          note: 'Guards the eastern forest.',
          model: '/works/thuy-tinh-the-adventure/cast/voi-chin-nga.glb',
          image: '/works/thuy-tinh-the-adventure/cast/voi-chin-nga.webp',
        },
        {
          slug: 'ga-chin-cua',
          name: 'Gà Chín Cựa',
          vi: 'Rooster with nine spurs',
          role: 'Tribute II',
          note: 'Nests in the high stone valleys, where water cannot reach.',
          model: '/works/thuy-tinh-the-adventure/cast/ga-chin-cua.glb',
          image: '/works/thuy-tinh-the-adventure/cast/ga-chin-cua.webp',
        },
        {
          slug: 'ngua-chin-hong-mao',
          name: 'Ngựa Chín Hồng Mao',
          vi: 'Horse with nine red manes',
          role: 'Tribute III',
          note: 'The only thing on the map that can outrun a river.',
          model: '/works/thuy-tinh-the-adventure/cast/ngua-chin-hong-mao.glb',
          image: '/works/thuy-tinh-the-adventure/cast/ngua-chin-hong-mao.webp',
        },
      ],
    },
    {
      kind: 'table',
      id: 'shape',
      label: 'Shape',
      heading: 'What it would be',
      rows: [
        ['Genre', 'Open world · single-player · third-person'],
        ['You play', 'Thủy Tinh, god of water'],
        ['Setting', 'The Red River delta, one night'],
        ['Source', 'Vietnamese folklore — Sơn Tinh, Thủy Tinh'],
        ['State', 'Backlog — after Tấm Cám'],
      ],
    },
  ],
};
