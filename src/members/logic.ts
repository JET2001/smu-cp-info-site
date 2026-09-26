import { getCodeforcesUsers } from '../api/codeforces';
import {
  ATCODER_URL,
  CODEFORCES_URL,
  type RatingBand,
  VJUDGE_URL,
} from '../constants';

import { type Member } from './types';

async function loadCodeforcesRatings(members: Member[]) {
  const handles = members
    .map((member) => member.codeforces)
    .filter((handle): handle is string => handle !== undefined);

  if (handles.length === 0) return new Map<string, number>();

  const users = await getCodeforcesUsers(handles);

  return new Map(
    users
      .filter((user) => user.rating !== undefined)
      .map((user) => [user.handle.toLowerCase(), user.rating!]),
  );
}

export function parseMembers(csv: string) {
  const lines = csv.trim().split(/\r?\n/);

  return lines.slice(1).map((line) => {
    const [name, codeforces, atcoder, vjudge, remarks] = line.split(',');

    return {
      name: name.trim(),
      codeforces: codeforces.trim() || undefined,
      atcoder: atcoder.trim() || undefined,
      vjudge: vjudge.trim() || undefined,
      remarks: remarks.trim() || undefined,
    };
  });
}

export async function loadMembers() {
  const response = await fetch('/data/members.csv');

  if (!response.ok) {
    throw new Error(`Could not load members: ${response.status}`);
  }

  return parseMembers(await response.text());
}
async function loadAtcoderRatings() {
  const response = await fetch('/data/atcoder-ratings.json');

  if (!response.ok) {
    throw new Error(`Could not load AtCoder ratings: ${response.status}`);
  }

  return (await response.json()) as Record<string, number>;
}

export async function loadMemberRatings(members: Member[]) {
  const [codeforcesResult, atcoderResult] = await Promise.allSettled([
    loadCodeforcesRatings(members),
    loadAtcoderRatings(),
  ]);

  const codeforcesRatings =
    codeforcesResult.status === 'fulfilled'
      ? codeforcesResult.value
      : new Map<string, number>();
  const atcoderRatings =
    atcoderResult.status === 'fulfilled'
      ? atcoderResult.value
      : ({} as Record<string, number>);

  return members.map((member) => ({
    ...member,
    codeforcesRating:
      member.codeforces === undefined
        ? undefined
        : codeforcesRatings.get(member.codeforces.toLowerCase()),
    atcoderRating:
      member.atcoder === undefined
        ? undefined
        : atcoderRatings[member.atcoder.toLowerCase()],
  }));
}
export function codeforcesUrl(handle: string) {
  return `${CODEFORCES_URL}/${encodeURIComponent(handle)}`;
}

export function atcoderUrl(handle: string) {
  return `${ATCODER_URL}/${encodeURIComponent(handle)}`;
}

export function vjudgeUrl(handle: string) {
  return `${VJUDGE_URL}/${encodeURIComponent(handle)}`;
}

export function ratingClass(
  rating: number | undefined,
  bands: readonly RatingBand[],
) {
  if (rating === undefined) return 'text-muted';

  const index = bands.findLastIndex(([threshold]) => rating >= threshold);

  return index === -1 ? 'text-muted' : bands[index][1];
}
