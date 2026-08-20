import { getCodeforcesUsers } from '../api/codeforces'
import {
    ATCODER_URL,
    CODEFORCES_URL,
    type RatingBand,
    VJUDGE_URL
 } from '../constants'

import { type Member } from './types'

export async function loadCodeforcesRatings(
  members: Member[],
): Promise<void> {
  const handles = members
    .map(member => member.codeforces)
    .filter((handle): handle is string => handle !== undefined)

  if (handles.length === 0) return

  const users = await getCodeforcesUsers(handles)

  const ratings = new Map(
    users
      .filter(user => user.rating !== undefined)
      .map(user => [user.handle.toLowerCase(), user.rating!]),
  )

  for (const member of members) {
    if (!member.codeforces) continue

    member.codeforcesRating =
      ratings.get(member.codeforces.toLowerCase())
  }
}

export function parseMembers(csv: string): Member[] {
    const lines = csv.trim().split(/\r?\n/)

    return lines.slice(1).map(line => {
        const [name, codeforces, atcoder, vjudge, remarks] = line.split(',')

        return {
            name: name.trim(),
            codeforces: codeforces.trim() || undefined,
            atcoder: atcoder.trim() || undefined,
            vjudge: vjudge.trim() || undefined,
            remarks: remarks.trim() || undefined
        }
    })
}
export async function loadAtcoderRatings(
    members: Member[],
): Promise<void> {
    const response = await fetch('/data/atcoder-ratings.json')

    if (!response.ok) {
        throw new Error(`Could not load AtCoder ratings: ${response.status}`)
    }

    const ratings = await response.json() as Record<string, number>

    for (const member of members) {
        if (!member.atcoder) continue
        member.atcoderRating = ratings[member.atcoder.toLowerCase()]
    }
}
export function codeforcesUrl(handle: string): string {
  return `${CODEFORCES_URL}/${encodeURIComponent(handle)}`
}

export function atcoderUrl(handle: string): string {
  return `${ATCODER_URL}/${encodeURIComponent(handle)}`
}

export function vjudgeUrl(handle: string): string {
  return `${VJUDGE_URL}/${encodeURIComponent(handle)}`
}

export function ratingClass(
  rating: number | undefined,
  bands: readonly RatingBand[],
): string {
  if (rating === undefined) return 'rating-unrated'

  const index = bands.findLastIndex(([threshold]) => rating >= threshold)

  return index === -1 ? 'rating-unrated' : bands[index][1]
}