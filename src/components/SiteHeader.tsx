import { Link } from '@tanstack/react-router';

const archiveUrl = 'https://archive.smujudge.com/index.html';

const baseLinkClasses = 'transition-colors duration-[120ms]';
const activeLinkClasses = 'text-foreground font-bold';
const inactiveLinkClasses = 'text-muted hover:text-foreground';

export function SiteHeader() {
  return (
    <header className="border-t-4 border-accent">
      <div className="page-container">
        <nav
          aria-label="Main navigation"
          className="flex h-19 items-center justify-between border-b border-border max-mobile:h-auto max-mobile:items-start max-mobile:gap-5 max-mobile:py-5.5"
        >
          <div className="flex items-baseline gap-2.25">
            <strong className="font-body text-base font-bold leading-[normal] tracking-[-0.02em] text-accent max-mobile:text-sm">
              SMU Competitive Programming
            </strong>
          </div>

          <div className="flex items-center gap-7.5 text-[13px] max-mobile:flex-wrap max-mobile:justify-end max-mobile:gap-3.75">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className={baseLinkClasses}
              activeProps={{ className: activeLinkClasses }}
              inactiveProps={{ className: inactiveLinkClasses }}
            >
              Home
            </Link>
            <Link
              to="/trainings/"
              className={baseLinkClasses}
              activeProps={{ className: activeLinkClasses }}
              inactiveProps={{ className: inactiveLinkClasses }}
            >
              Trainings
            </Link>
            <Link
              to="/members/"
              className={baseLinkClasses}
              activeProps={{ className: activeLinkClasses }}
              inactiveProps={{ className: inactiveLinkClasses }}
            >
              Members
            </Link>
            <a
              href={archiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground"
            >
              Archive ↗
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
