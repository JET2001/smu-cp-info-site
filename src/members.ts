import './styles/shared.css'
import './styles/members.css'
import membersCsv from './data/members.csv?raw'
import { renderFooter, renderHeader } from './shared'
import {
    ATCODER_BANDS,
    CODEFORCES_BANDS,
} from './constants'
import { 
    parseMembers, 
    loadCodeforcesRatings, 
    ratingClass, 
    codeforcesUrl, 
    atcoderUrl, 
    vjudgeUrl 
} from './members/logic'
import { type Member } from './members/types'

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
    .then(() => {
       app.innerHTML = renderApp(members) 
    })
    .catch(error => {
        console.warn("Could not load Codeforces ratings", error)
    })

/**************************************************************** */

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