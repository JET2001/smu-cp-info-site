export type RatingBand = readonly [threshold: number, className: string]

export const CODEFORCES_URL = 'https://codeforces.com/profile'
export const ATCODER_URL = 'https://atcoder.jp/users'
export const VJUDGE_URL = 'https://vjudge.net/user'

export const CODEFORCES_USER_INFO_API_PATH = 'https://codeforces.com/api/user.info?handles'

export const CODEFORCES_BANDS: readonly RatingBand[] = [
  [0, 'cf-gray'],
  [1200, 'cf-green'],
  [1400, 'cf-cyan'],
  [1600, 'cf-blue'],
  [1900, 'cf-violet'],
  [2100, 'cf-orange'],
  [2400, 'cf-red'],
]

export const ATCODER_BANDS: readonly RatingBand[] = [
  [0, 'at-gray'],
  [400, 'at-brown'],
  [800, 'at-green'],
  [1200, 'at-cyan'],
  [1600, 'at-blue'],
  [2000, 'at-yellow'],
  [2400, 'at-orange'],
  [2800, 'at-red'],
]