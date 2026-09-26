import { cn } from 'cn';
import { AnimatePresence, motion } from 'motion/react';
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

const skeletonClasses =
  'animate-shimmer bg-linear-to-r bg-clip-text bg-size-[200%_100%] from-muted/40 via-muted to-muted/40 text-transparent';

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
        'relative font-semibold transition-colors duration-500',
        isLoading ? 'text-muted' : ratingClass(rating, bands),
        className,
      )}
    >
      {children}
      {/* skeleton overlays the real text so the loaded color can crossfade in beneath it */}
      <AnimatePresence>
        {isLoading && (
          <motion.span
            aria-hidden
            className={cn('absolute inset-0', skeletonClasses)}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}
