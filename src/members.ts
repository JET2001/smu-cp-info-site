import './styles/shared.css'
import './styles/members.css'
import membersCsv from './data/members.csv?raw'
import { renderFooter, renderHeader } from './shared'


interface Member {
    name: string
    codeforces?: string
    atcoder?: string
    vjudge?: string
    remarks?: string
}; 

function renderApp(): string {
    const members = parseMembers(membersCsv)
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
app.innerHTML = renderApp()

/**************************************************************** */

function renderMembersPage(members: Member[]): string {
    return `
        <section class="page-heading">
            <p class="eyebrow">SMU CP</p>
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
        return {
            name: name.trim(),
            codeforces: codeforces.trim() || undefined,
            atcoder: atcoder.trim() || undefined,
            vjudge: vjudge.trim() || undefined,
            remarks: remarks.trim() || undefined
        }
    })
}
function renderMember(member: Member): string {
    return `
        <tr>
            <td>${member.name}</td>
            <td>${member.codeforces ?? '-'}</td>
            <td>${member.atcoder ?? '-'}</td>
            <td>${member.vjudge ?? '-'}</td>
            <td>${member.remarks ?? '-'}</td>
        </tr>
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