import './styles/shared.css'
import { renderFooter, renderHeader } from './shared'

function renderApp(): string {
  return `
    ${renderHeader('home')}
    <main class="container">
      ${renderHero()}
      ${renderPrinciples()}
    </main>
    ${renderFooter()}
  `
}
const app = document.querySelector<HTMLDivElement>('#app')

if (!app){
  throw new Error("app not found")
}
app.innerHTML = renderApp()

//*************************************************************** */
// HTML Elements
function renderHero(): string {
  return `
    <section class="hero">
      <p class="eyebrow">Singapore Management University</p>

      <h1>
        Competitive<br />
        Programming
      </h1>

      <p class="hero-copy">
        A hobbyist community for algorithms, mathematics and problem solving.
      </p>
    </section>
  `
}
function renderPrinciples(): string {
  return `
    <section class="principles" aria-labelledby="principles-heading">
      <div>
        <p id="principles-heading" class="section-label">
          --verbose
        </p>
      </div>

      <article class="principle">
        <p>
          SMU Competitive Programming began in 2024 with SMU's first ICPC team since 2017. It has grown into a wider community for students interested in competitive programming and algorithmic problem solving.
        </p>
      </article>
      <article class="principle">
        <p>
          Today, the programme combines training and contests for students who enjoy logical problems and exploring ideas beyond the curriculum. It also provides a pathway for students seeking to represent SMU at ICPC. 
        </p>
      </article>
    </section>
  `
}