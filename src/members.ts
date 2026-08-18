import './styles/shared.css'
import './styles/members.css'
import membersCsv from './data/members.csv?raw'
import { renderFooter, renderHeader } from './shared'
import { getCodeforcesUsers } from './api/codeforces'
import {
    ATCODER_BANDS,
    ATCODER_URL,
    CODEFORCES_BANDS,
    CODEFORCES_URL,
    type RatingBand,
    VJUDGE_URL
 } from './constants'

import atcoderRatings from './data/atcoder-ratings.json'

interface Member {
    name: string
    codeforces?: string
    atcoder?: string
    vjudge?: string
    remarks?: string
    
    codeforcesRating?: number
    atcoderRating?: number
}; 

function renderApp(members: Member[]): string {
    return `
        ${renderHeader('members')}
        <main class="container">
            ${renderMembersPage(members)}
        </main>
        ${renderFooter()}
    `
}
const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('app not found')

const members = parseMembers(membersCsv)
// render immediately without waiting for CF
app.innerHTML = renderApp(members)

// make the request to load CF ratings 
void loadCodeforcesRatings(members)


/**************************************************************** */


async function loadCodeforcesRatings(members: Member[]): Promise<void> {
  const handles = members
    .map(member => member.codeforces)
    .filter((handle): handle is string => handle !== undefined)

  if (handles.length === 0) return

  try {
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

    app.innerHTML = renderApp(members)
  } catch (error) {
    console.warn('Could not load Codeforces ratings', error)
  }
}


function renderMembersPage(members: Member[]): string {
    return `
        <section class="page-heading">
            <h1>Members</h1>
            <p>
                Past and present members of the SMU Competitive Programming community
            </p>
            </section>
            <section class="members-section">
                ${renderMembersTable(members)}
            </section>
    `
}
function parseMembers(csv: string): Member[]{
    const lines = csv.trim().split(/\r?\n/)
    return lines.slice(1).map(line => {
        const [name, codeforces, atcoder, vjudge, remarks] = line.split(',')
        const atcoderHandle = atcoder.trim() || undefined
        return {
            name: name.trim(),
            codeforces: codeforces.trim() || undefined,
            atcoder: atcoderHandle,
            vjudge: vjudge.trim() || undefined,
            remarks: remarks.trim() || undefined,
            
            atcoderRating: atcoderHandle ? atcoderRatings[
                atcoderHandle.toLowerCase() as keyof typeof atcoderRatings
            ]
            : undefined
        }
    })
}
function renderMember(member: Member): string {
    return `
        <tr>
            <td>${member.name}</td>
            <td>${member.codeforces ? renderCodeforcesHandle(member) : '-'}</td>
            <td>${member.atcoder ? renderAtcoderHandle(member): '-'}</td>
            <td>${member.vjudge ? renderVjudgeHandle(member.vjudge) : '-'}</td>
            <td>${member.remarks ?? '-'}</td>
        </tr>
    `
}
function renderCodeforcesHandle(member: Member): string {
  const handle = member.codeforces!

  return `
    <a
      class="rating-handle ${ratingClass(member.codeforcesRating, CODEFORCES_BANDS)}"
      href="${codeforcesUrl(handle)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ${handle}
    </a>
  `
}

function renderAtcoderHandle(member: Member): string {
  const handle = member.atcoder!

  return `
    <a
      class="rating-handle ${ratingClass(member.atcoderRating, ATCODER_BANDS)}"
      href="${atcoderUrl(handle)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ${handle}
    </a>
  `
}

function renderVjudgeHandle(handle: string): string {
  return `
    <a
      href="${vjudgeUrl(handle)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ${handle}
    </a>
  `
}

function renderMembersTable(members: Member[]): string {
    return `
        <div class="table-wrapper">
            <table class="members-table">
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Codeforces</th>
                        <th>Atcoder</th>
                        <th>Vjudge</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    ${members.map(renderMember).join('')}
                </tbody>
            </table>
        </div>
    `
}
function codeforcesUrl(handle: string): string {
  return `https://codeforces.com/profile/${encodeURIComponent(handle)}`
}

function atcoderUrl(handle: string): string {
  return `https://atcoder.jp/users/${encodeURIComponent(handle)}`
}

function vjudgeUrl(handle: string): string {
  return `https://vjudge.net/user/${encodeURIComponent(handle)}`
}

function ratingClass(
  rating: number | undefined,
  bands: readonly RatingBand[],
): string {
  if (rating === undefined) return 'rating-unrated'

  const index = bands.findLastIndex(([threshold]) => rating >= threshold)

  return index === -1 ? 'rating-unrated' : bands[index][1]
}