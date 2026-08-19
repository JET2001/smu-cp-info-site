import { renderFooter, renderHeader } from './shared'
import './styles/shared.css'
import './styles/trainings.css'
import { sections } from './trainings/data'
import type { TrainingSection } from './trainings/types'

function renderApp(): string {
    return `
        ${renderHeader('trainings')}
        <main>
            <div class="container">
                ${renderHero()}
                ${renderTrainingSections()}
            </div>
        </main>
        ${renderFooter()}
    `
}

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('app not found')
app.innerHTML = renderApp()

/******************************************************* */
function renderHero(): string {
    return `
        <section class="page-heading">
            <h1>Trainings</h1>
            <p>
                From learning individual techniques to representing SMU at ICPC,
                our training progressively develops both problem solving and
                competition experience.
            </p>
        </section>
    `
}

function renderTrainingSections(): string {
    return `
        <div class="training-sections">
            ${sections.map(renderTrainingSection).join('')}
        </div>
    `
}
function renderTrainingSection(
    section: TrainingSection,
    index: number
): string {
    return `
        <section class="training-section">
            <span class="training-number">
                ${String(index + 1).padStart(2, '0')}
            </span>

            <div class="training-content">
                <p class="section-label">${section.eyebrow.split('·')[1]}</p>
                <h2>${section.title}</h2>
                <p>${section.description}</p>
            </div>

            <div class="training-images">
                ${section.images
                    .map(
                        image => `
                            <img
                                src="${image.src}"
                                alt="${image.alt}"
                                loading="lazy"
                            />
                        `,
                    )
                    .join('')}
            </div>
        </section>
    `
}