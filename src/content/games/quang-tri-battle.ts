import type { Game } from '@/lib/types';

/**
 * Backlog title, and the page says only what exists. C:/Unity/RedRain holds a
 * cast, a weapon library and one map image — there is no Unity project, so
 * nothing here describes systems, timings or tuning.
 *
 * Character images are Blender renders of the source FBX files.
 */
export const quangTriBattle: Game = {
  slug: 'quang-tri-battle',
  title: 'Quảng Trị Battle',
  logline: 'A multiplayer shooter set at Quảng Trị, based on the film Mưa Đỏ — Red Rain.',
  hook: 'Five soldiers hold the Citadel. Captain Hoàng and his comrades come to take it.',

  status: 'concept',
  statusNote: 'Backlog. The cast and the arsenal exist; the game does not yet.',

  started: '2026',
  engine: 'Not started',
  genre: 'Multiplayer shooter',
  format: 'Team versus team',
  platforms: ['PC target'],

  role: ['Concept, casting and art direction'],
  disclosure:
    'Characters are AI-generated, rendered here in Blender. Weapons and vehicles are third-party assets. Nothing is hand-modelled.',

  showStanding: false,
  accent: '#8C9A5B',
  cover: '/works/quang-tri-battle/roster.webp',
  hero: { src: '/works/quang-tri-battle/roster.webp', fit: 'contain', position: 'center 88%' },
  showcase: { src: '/works/quang-tri-battle/scene.webp', note: 'The squad at the Citadel', fit: 'cover' },
  banner: { src: '/works/quang-tri-battle/scene.webp', note: 'The squad at the Citadel' },

  links: [],
  metrics: [],

  blocks: [
    {
      kind: 'prose',
      id: 'about',
      label: 'The game',
      heading: 'Red Rain, played out.',
      pull: 'Based on Mưa Đỏ — Red Rain — the film about the battle for the Quảng Trị Citadel.',
      body: ['A multiplayer shooter set at Quảng Trị. Two sides, one piece of ground.'],
    },
    {
      kind: 'cast',
      id: 'squad',
      label: 'The squad',
      heading: 'Five who hold the Citadel',
      side: 'Side one · the players',
      layout: 'row',
      intro: 'Bình, Cường, Sen, Tá and Tu. Scroll sideways; press 3D on a card to turn the model.',
      items: [
        { slug: 'binh', name: 'Bình', role: 'Vietnamese soldier', note: '', model: '/works/quang-tri-battle/cast/binh.glb', image: '/works/quang-tri-battle/cast/binh.webp' },
        { slug: 'cuong', name: 'Cường', role: 'Vietnamese soldier', note: '', model: '/works/quang-tri-battle/cast/cuong.glb', image: '/works/quang-tri-battle/cast/cuong.webp' },
        { slug: 'sen', name: 'Sen', role: 'Vietnamese soldier', note: '', model: '/works/quang-tri-battle/cast/sen.glb', image: '/works/quang-tri-battle/cast/sen.webp' },
        { slug: 'ta', name: 'Tá', role: 'Vietnamese soldier', note: '', model: '/works/quang-tri-battle/cast/ta.glb', image: '/works/quang-tri-battle/cast/ta.webp' },
        { slug: 'tu', name: 'Tu', role: 'Vietnamese soldier', note: '', model: '/works/quang-tri-battle/cast/tu.glb', image: '/works/quang-tri-battle/cast/tu.webp' },
      ],
    },
    {
      kind: 'cast',
      id: 'opposition',
      label: 'The opposition',
      heading: 'Captain Hoàng and his comrades',
      side: 'Side two · nine against five',
      layout: 'row',
      intro: 'Hoàng leads. Eight comrades come with him.',
      items: [
        { slug: 'hoang', name: 'Hoàng', role: 'Captain', note: 'Leads the opposing side.', model: '/works/quang-tri-battle/cast/hoang.glb', image: '/works/quang-tri-battle/cast/hoang.webp' },
        { slug: 'comrade-1', name: 'Comrade I', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-1.webp' },
        { slug: 'comrade-2', name: 'Comrade II', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-2.webp' },
        { slug: 'comrade-3', name: 'Comrade III', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-3.webp' },
        { slug: 'comrade-4', name: 'Comrade IV', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-4.webp' },
        { slug: 'comrade-5', name: 'Comrade V', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-5.webp' },
        { slug: 'comrade-6', name: 'Comrade VI', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-6.webp' },
        { slug: 'comrade-7', name: 'Comrade VII', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-7.webp' },
        { slug: 'comrade-8', name: 'Comrade VIII', role: 'Comrade', note: '', image: '/works/quang-tri-battle/cast/comrade-8.webp' },
      ],
    },
    {
      kind: 'cast',
      id: 'weapons',
      label: 'Weapons',
      heading: 'Weapons',
      layout: 'row',
      items: [
        { slug: 'ak-47', name: 'AK-47', role: 'Rifle', note: '', model: '/works/quang-tri-battle/arsenal/ak-47.glb', image: '/works/quang-tri-battle/arsenal/ak-47.png' },
        { slug: 'assault-rifle', name: 'Assault rifle', role: 'Rifle', note: '', model: '/works/quang-tri-battle/arsenal/assault-rifle.glb', image: '/works/quang-tri-battle/arsenal/assault-rifle.png' },
        { slug: 'bolt-action', name: 'Bolt-action rifle', role: 'Sniper', note: '', model: '/works/quang-tri-battle/arsenal/bolt-action.glb', image: '/works/quang-tri-battle/arsenal/bolt-action.png' },
        { slug: 'drum-rifle', name: 'Drum-magazine rifle', role: 'Support', note: '', model: '/works/quang-tri-battle/arsenal/drum-rifle.glb', image: '/works/quang-tri-battle/arsenal/drum-rifle.png' },
        { slug: 'machine-gun', name: 'Machine gun', role: 'Emplacement', note: '', model: '/works/quang-tri-battle/arsenal/machine-gun.glb', image: '/works/quang-tri-battle/arsenal/machine-gun.png' },
        { slug: 'shotgun', name: 'Lever-action shotgun', role: 'Close quarters', note: '', model: '/works/quang-tri-battle/arsenal/shotgun.glb', image: '/works/quang-tri-battle/arsenal/shotgun.png' },
        { slug: 'pistol', name: 'Colt 1911', role: 'Sidearm', note: '', model: '/works/quang-tri-battle/arsenal/pistol.glb', image: '/works/quang-tri-battle/arsenal/pistol.png' },
        { slug: 'handgun', name: 'Handgun', role: 'Sidearm', note: '', model: '/works/quang-tri-battle/arsenal/handgun.glb', image: '/works/quang-tri-battle/arsenal/handgun.png' },
        { slug: 'knife', name: 'Knife', role: 'Melee', note: '', model: '/works/quang-tri-battle/arsenal/knife.glb', image: '/works/quang-tri-battle/arsenal/knife.png' },
        { slug: 'grenade', name: 'Grenade', role: 'Thrown', note: '', model: '/works/quang-tri-battle/arsenal/grenade.glb', image: '/works/quang-tri-battle/arsenal/grenade.png' },
      ],
    },
    {
      kind: 'cast',
      id: 'mobility',
      label: 'Mobility',
      heading: 'Vehicles and armour',
      layout: 'row',
      items: [
        { slug: 'tank', name: 'Tank', role: 'Armour', note: '', model: '/works/quang-tri-battle/field/tank.glb', image: '/works/quang-tri-battle/field/tank.png' },
        { slug: 'artillery', name: 'Field artillery', role: 'Artillery', note: '', model: '/works/quang-tri-battle/field/artillery.glb', image: '/works/quang-tri-battle/field/artillery.png' },
        { slug: 'jeep', name: 'Jeep', role: 'Transport', note: '', model: '/works/quang-tri-battle/field/jeep.glb', image: '/works/quang-tri-battle/field/jeep.png' },
        { slug: 'truck', name: 'Cargo truck', role: 'Transport', note: '', model: '/works/quang-tri-battle/field/truck.glb', image: '/works/quang-tri-battle/field/truck.png' },
        { slug: 'helicopter', name: 'Helicopter', role: 'Air', note: '', model: '/works/quang-tri-battle/field/helicopter.glb', image: '/works/quang-tri-battle/field/helicopter.png' },
        { slug: 'jet', name: 'Fighter jet', role: 'Air', note: '', model: '/works/quang-tri-battle/field/jet.glb', image: '/works/quang-tri-battle/field/jet.png' },
      ],
    },
    {
      kind: 'gallery',
      id: 'field',
      label: 'The field',
      heading: 'The playing field',
      intro: 'Where it is fought.',
      items: [{ src: '/works/quang-tri-battle/map.webp', caption: 'Quảng Trị Citadel' }],
    },
  ],
};
