import { cn } from 'cn';
import type { ReactNode } from 'react';
import { type RatingBand } from '../../constants';
import { ratingClass } from '../logic';

type RatingHandleLinkProps = {
  href: string;
  rating: number | undefined;
  bands: readonly RatingBand[];
  className?: string;
  children: ReactNode;
};

export function RatingHandleLink({
  href,
  rating,
  bands,
  className,
  children,
}: RatingHandleLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('font-semibold', ratingClass(rating, bands), className)}
    >
      {children}
    </a>
  );
}
