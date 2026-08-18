import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type Member } from '../../src/members/types'
import {
  parseMembers,
  ratingClass,
  codeforcesUrl,
  atcoderUrl,
  vjudgeUrl,
  loadCodeforcesRatings
} from '../../src/members/logic'
import { getCodeforcesUsers } from '../../src/api/codeforces'
import {
  CODEFORCES_BANDS,
  ATCODER_BANDS,
  CODEFORCES_URL,
  ATCODER_URL,
  VJUDGE_URL,
} from '../../src/constants'

describe('parseMembers', () => {
  it('parses member fields', () => {
    const csv = `name,codeforces,atcoder,vjudge,remarks
Jonathan,jonteo_2001,jonteo2001,jonteo,Coach`

    expect(parseMembers(csv)).toMatchObject([
      {
        name: 'Jonathan',
        codeforces: 'jonteo_2001',
        atcoder: 'jonteo2001',
        vjudge: 'jonteo',
        remarks: 'Coach',
      },
    ])
  })

  it('converts empty fields to undefined', () => {
    const csv = `name,codeforces,atcoder,vjudge,remarks
Alice,,,,`

    expect(parseMembers(csv)).toEqual([
      {
        name: 'Alice',
        codeforces: undefined,
        atcoder: undefined,
        vjudge: undefined,
        remarks: undefined,
        atcoderRating: undefined,
      },
    ])
  })

  it('trims whitespace from fields', () => {
    const csv = `name,codeforces,atcoder,vjudge,remarks
  Alice  ,  alice_cf  ,  alice_ac  ,  alice_vj  ,  Member  `

    expect(parseMembers(csv)[0]).toMatchObject({
      name: 'Alice',
      codeforces: 'alice_cf',
      atcoder: 'alice_ac',
      vjudge: 'alice_vj',
      remarks: 'Member',
    })
  })

  it('handles multiple members', () => {
    const csv = `name,codeforces,atcoder,vjudge,remarks
Alice,alice_cf,,,
Bob,bob_cf,bob_ac,,Member`

    const members = parseMembers(csv)

    expect(members).toHaveLength(2)
    expect(members[0].name).toBe('Alice')
    expect(members[1].name).toBe('Bob')
  })
})

describe('ratingClass', () => {
  it('returns unrated for undefined rating', () => {
    expect(
      ratingClass(undefined, CODEFORCES_BANDS),
    ).toBe('rating-unrated')
  })

  it('returns unrated when below the lowest band', () => {
    const bands = [
      [1000, 'rating-low'],
      [1500, 'rating-high'],
    ] as const

    expect(ratingClass(999, bands)).toBe('rating-unrated')
  })

  it('selects the exact threshold', () => {
    const bands = [
      [1000, 'rating-low'],
      [1500, 'rating-high'],
    ] as const

    expect(ratingClass(1500, bands)).toBe('rating-high')
  })

  it('selects the highest threshold not exceeding the rating', () => {
    const bands = [
      [1000, 'rating-low'],
      [1500, 'rating-mid'],
      [2000, 'rating-high'],
    ] as const

    expect(ratingClass(1750, bands)).toBe('rating-mid')
  })

  it('handles ratings above the highest band', () => {
    const bands = [
      [1000, 'rating-low'],
      [2000, 'rating-high'],
    ] as const

    expect(ratingClass(5000, bands)).toBe('rating-high')
  })
})

describe('profile URLs', () => {
  it('creates a Codeforces profile URL', () => {
    expect(codeforcesUrl('tourist')).toBe(
      `${CODEFORCES_URL}/tourist`,
    )
  })

  it('creates an AtCoder profile URL', () => {
    expect(atcoderUrl('tourist')).toBe(
      `${ATCODER_URL}/tourist`,
    )
  })

  it('creates a VJudge profile URL', () => {
    expect(vjudgeUrl('tourist')).toBe(
      `${VJUDGE_URL}/tourist`,
    )
  })

  it('URL-encodes handles', () => {
    expect(codeforcesUrl('hello world')).toBe(
      `${CODEFORCES_URL}/hello%20world`,
    )

    expect(atcoderUrl('hello/world')).toBe(
      `${ATCODER_URL}/hello%2Fworld`,
    )

    expect(vjudgeUrl('a+b')).toBe(
      `${VJUDGE_URL}/a%2Bb`,
    )
  })
})


vi.mock('../../src/api/codeforces', () => ({
  getCodeforcesUsers: vi.fn(),
}))

const mockGetCodeforcesUsers = vi.mocked(getCodeforcesUsers)

describe('loadCodeforcesRatings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads and assigns Codeforces ratings', async () => {
    const members = [
      { name: 'Alice', codeforces: 'tourist' },
      { name: 'Bob', codeforces: 'Petr' },
    ]

    mockGetCodeforcesUsers.mockResolvedValue([
      { handle: 'tourist', rating: 3858 },
      { handle: 'Petr', rating: 3519 },
    ])

    await loadCodeforcesRatings(members)

    expect(mockGetCodeforcesUsers).toHaveBeenCalledWith([
      'tourist',
      'Petr',
    ])

    expect(members).toEqual([
      {
        name: 'Alice',
        codeforces: 'tourist',
        codeforcesRating: 3858,
      },
      {
        name: 'Bob',
        codeforces: 'Petr',
        codeforcesRating: 3519,
      },
    ])
  })

  it('matches handles case-insensitively', async () => {
    const members : Member[] = [
      { name: 'Alice', codeforces: 'Tourist' },
    ]

    mockGetCodeforcesUsers.mockResolvedValue([
      { handle: 'tourist', rating: 3858 },
    ])

    await loadCodeforcesRatings(members)

    expect(members[0].codeforcesRating).toBe(3858)
  })

  it('does not call the API when there are no Codeforces handles', async () => {
    const members : Member[]  = [
      { name: 'Alice' },
      { name: 'Bob', atcoder: 'bob' },
    ]

    await loadCodeforcesRatings(members)

    expect(mockGetCodeforcesUsers).not.toHaveBeenCalled()
  })

  it('leaves rating undefined when the API does not return that handle', async () => {
    const members : Member[]  = [
      { name: 'Alice', codeforces: 'tourist' },
      { name: 'Bob', codeforces: 'invalid_handle' },
    ]

    mockGetCodeforcesUsers.mockResolvedValue([
      { handle: 'tourist', rating: 3858 },
    ])

    await loadCodeforcesRatings(members)

    expect(members[0].codeforcesRating).toBe(3858)
    expect(members[1].codeforcesRating).toBeUndefined()
  })

  it('ignores unrated Codeforces users', async () => {
    const members : Member[] = [
      { name: 'Alice', codeforces: 'new_user' },
    ]

    mockGetCodeforcesUsers.mockResolvedValue([
      { handle: 'new_user' },
    ])

    await loadCodeforcesRatings(members)

    expect(members[0].codeforcesRating).toBeUndefined()
  })

  it('propagates API errors', async () => {
    const members : Member[] = [
      { name: 'Alice', codeforces: 'tourist' },
    ]

    mockGetCodeforcesUsers.mockRejectedValue(
      new Error('Codeforces unavailable'),
    )

    await expect(
      loadCodeforcesRatings(members),
    ).rejects.toThrow('Codeforces unavailable')
  })
})