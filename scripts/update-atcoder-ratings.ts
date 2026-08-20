import fs from 'node:fs/promises'
import { fetchUserInfo } from '@qatadaazzeh/atcoder-api'

const csv = await fs.readFile('src/data/members.csv', 'utf8')

const handles = csv
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map(line => line.split(',')[2]?.trim())
  .filter((handle): handle is string => Boolean(handle))

const ratings: Record<string, number> = {}

for (const handle of handles) {
  try {
    const user = await fetchUserInfo(handle)
    ratings[handle.toLowerCase()] = user.userRating
    console.log(`${handle}: ${user.userRating}`)
  } catch (error) {
    console.warn(`Could not fetch AtCoder rating for ${handle}`, error)
  }
}

await fs.writeFile(
  'public/data/atcoder-ratings.json',
  JSON.stringify(ratings, null, 2) + '\n',
)