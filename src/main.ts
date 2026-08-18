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
        A community of students brought together by algorithms,
        rigorous problem solving, and programming competition.
      </p>
    </section>
  `
}
function renderPrinciples(): string {
  return `
    <section class="principles" aria-labelledby="principles-heading">
      <div>
        <p id="principles-heading" class="section-label">
          What we are here for
        </p>
      </div>

      <article class="principle">
        <span class="principle-number">01</span>

        <h2>Mission</h2>

        <p>
          Bring together students who enjoy algorithms, reasoning,
          and difficult problems, and give them a place to learn,
          train, and compete alongside one another.
        </p>
      </article>

      <article class="principle">
        <span class="principle-number">02</span>

        <h2>Vision</h2>

        <p>
          Build a competitive programming culture at SMU that
          endures across cohorts and continues to grow beyond
          any individual batch of students.
        </p>
      </article>
    </section>
  `
}