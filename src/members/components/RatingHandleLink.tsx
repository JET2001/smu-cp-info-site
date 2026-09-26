import { cn } from 'cn';
import type { ReactNode } from 'react';
import { type RatingBand } from '../../constants';
import { ratingClass } from '../logic';

type RatingHandleLinkProps = {
  href: string;
  rating: number | undefined;
  bands: readonly RatingBand[];
  className?: string;
  isLoading: boolean;
  children: ReactNode;
};

export function RatingHandleLink({
  href,
  rating,
  bands,
  className,
  isLoading,
  children,
}: RatingHandleLinkProps) {
  return (
    <a
      href={isLoading ? undefined : href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'font-semibold transition-colors duration-300',
        isLoading
          ? 'animate-shimmer bg-linear-to-r bg-clip-text bg-size-[200%_100%] from-muted/40 via-muted to-muted/40 text-transparent'
          : ratingClass(rating, bands),
        className,
      )}
    >
      {children}
    </a>
  );
}
