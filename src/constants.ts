export type RatingBand = readonly [threshold: number, className: string];

export const SITE_NAME = 'SMU Competitive Programming';
export const SITE_URL = 'https://info.smujudge.com';

export const CODEFORCES_URL = 'https://codeforces.com/profile';
export const ATCODER_URL = 'https://atcoder.jp/users';
export const VJUDGE_URL = 'https://vjudge.net/user';

export const CODEFORCES_USER_INFO_API_PATH =
  'https://codeforces.com/api/user.info?handles';

export const CODEFORCES_BANDS: readonly RatingBand[] = [
  [0, 'text-[#808080]'],
  [1200, 'text-[#008000]'],
  [1400, 'text-[#03a89e]'],
  [1600, 'text-[#0000ff]'],
  [1900, 'text-[#aa00aa]'],
  [2100, 'text-[#ff8c00]'],
  [2400, 'text-[#ff0000]'],
];

export const ATCODER_BANDS: readonly RatingBand[] = [
  [0, 'text-[#808080]'],
  [400, 'text-[#804000]'],
  [800, 'text-[#008000]'],
  [1200, 'text-[#00c0c0]'],
  [1600, 'text-[#0000ff]'],
  [2000, 'text-[#c0c000]'],
  [2400, 'text-[#ff8000]'],
  [2800, 'text-[#ff0000]'],
];
