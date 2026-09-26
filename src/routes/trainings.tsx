import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '../components/PageHeading';
import { pageMeta } from '../seo';
import { sections } from '../trainings/data';

export const Route = createFileRoute('/trainings')({
  component: TrainingsPage,
  head: () =>
    pageMeta({
      title: 'Trainings',
      description:
        'A one-year training program (2 semesters + summer) that concludes with an ICPC Selection Contest.',
      path: '/trainings/',
    }),
});

function TrainingsPage() {
  return (
    <main>
      <div className="page-container">
        <PageHeading
          title="Trainings"
          description="A one-year training program (2 semesters + summer) that concludes with an ICPC Selection Contest."
        />

        <div>
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="grid grid-cols-[72px_minmax(0,1fr)_300px] gap-7 border-t border-border py-11 max-tablet:grid-cols-[60px_minmax(0,1fr)] max-xs:grid-cols-1 max-xs:gap-3.5"
            >
              <span className="pt-0.75 font-heading text-[13px] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="max-w-140">
                <p className="mb-2 text-label font-semibold uppercase tracking-label text-accent">
                  {section.eyebrow.split('·')[1]}
                </p>
                <h2 className="mb-3.5 font-heading text-[30px] font-normal tracking-tight">
                  {section.title}
                </h2>
                <p className="text-[15px] leading-[1.6] text-muted">
                  {section.description}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2.5 max-tablet:col-start-2 max-tablet:mt-2 max-tablet:items-start max-xs:col-start-1">
                {section.images.map((image) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="block h-42.5 w-70 object-cover max-xs:h-auto max-xs:w-[min(100%,420px)]"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
