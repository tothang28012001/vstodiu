import type { Game, Status } from '@/lib/types';
import { STATUS_META } from '@/lib/types';
import { turnOffTheLight } from './turn-off-the-light';
import { tamCam } from './tam-cam';
import { quangTriBattle } from './quang-tri-battle';
import { thuyTinh } from './thuy-tinh';

/** Slate order: what ships first is what matters first. */
export const games: Game[] = [turnOffTheLight, tamCam, quangTriBattle, thuyTinh];

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

/** Games bucketed by pipeline status, in pipeline order, empty buckets dropped. */
export function gamesByStatus(): { status: Status; games: Game[] }[] {
  const statuses = Object.keys(STATUS_META) as Status[];
  return statuses
    .sort((a, b) => STATUS_META[a].order - STATUS_META[b].order)
    .map((status) => ({ status, games: games.filter((g) => g.status === status) }))
    .filter((bucket) => bucket.games.length > 0);
}

/** Previous/next within the flat slate, for the footer pager on a game page. */
export function neighbours(slug: string): { prev?: Game; next?: Game } {
  const i = games.findIndex((g) => g.slug === slug);
  if (i === -1) return {};
  return { prev: games[i - 1], next: games[i + 1] };
}
