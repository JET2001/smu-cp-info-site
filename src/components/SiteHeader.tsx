import { Link } from '@tanstack/react-router';

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/trainings/', label: 'Trainings', exact: false },
  { to: '/members/', label: 'Members', exact: false },
] as const;

export function SiteHeader() {
  return (
    <header className="border-t-4 border-accent">
      <div className="page-container">
        <nav
          aria-label="Main navigation"
          className="flex h-19 items-center justify-between border-b border-border max-mobile:h-auto max-mobile:items-start max-mobile:gap-5 max-mobile:py-5.5"
        >
          <div className="flex items-baseline gap-2.25">
            <Link to="/">
              <strong className="font-body text-base font-bold leading-[normal] tracking-[-0.02em] text-accent">
                SMU{' '}
                <span className="max-mobile:hidden">
                  Competitive Programming
                </span>
                <span className="hidden max-mobile:inline">CP</span>
              </strong>
            </Link>
          </div>

          <div className="flex items-center gap-7.5 text-[13px] max-mobile:flex-wrap max-mobile:justify-end max-mobile:gap-3.75">
            {navLinks.map(({ to, label, exact }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact }}
                className="transition-colors duration-120"
                activeProps={{ className: 'text-foreground font-bold' }}
                inactiveProps={{
                  className: 'text-muted hover:text-foreground',
                }}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://archive.smujudge.com/index.html"
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
