import { createFileRoute } from '@tanstack/react-router';
import { SITE_URL } from '../constants';

const principles = [
  "SMU Competitive Programming began in 2024 with SMU's first ICPC team since 2017. It has grown into a wider community for students interested in competitive programming and algorithmic problem solving.",
  'Today, the programme combines training and contests for students who enjoy logical problems and exploring ideas beyond the curriculum. It also provides a pathway for students seeking to represent SMU at ICPC.',
];

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    links: [{ rel: 'canonical', href: `${SITE_URL}/` }],
  }),
});

function HomePage() {
  return (
    <main className="page-container">
      <section className="max-w-205 pt-24 pb-21 max-mobile:pt-22 max-mobile:pb-20">
        <p className="mb-4.5 text-label font-semibold uppercase tracking-label text-accent">
          Singapore Management University
        </p>

        <h1 className="max-w-190 font-heading text-[clamp(52px,6.5vw,78px)] font-normal leading-[0.98] tracking-[-0.045em] max-mobile:text-[clamp(50px,_15vw,_70px)]">
          Competitive
          <br />
          Programming
        </h1>

        <p className="mt-7 max-w-155 text-[17px] leading-[1.6] text-muted">
          A hobbyist community for algorithms, mathematics and problem solving.
        </p>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="grid grid-cols-[140px_1fr_1fr] gap-11 border-t border-border pt-15 pb-18 max-mobile:grid-cols-1 max-mobile:gap-10.5 max-mobile:pb-19"
      >
        <div>
          <p
            id="principles-heading"
            className="pt-1.25 text-label font-semibold uppercase tracking-label text-muted"
          >
            --verbose
          </p>
        </div>

        {principles.map((paragraph) => (
          <article key={paragraph}>
            <p className="max-w-97.5 text-base leading-[1.65] text-justify text-muted max-mobile:max-w-none">
              {paragraph}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
