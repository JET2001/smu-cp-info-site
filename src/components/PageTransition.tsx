import { Outlet, useLocation } from '@tanstack/react-router';
import { MotionConfig, motion } from 'motion/react';

export function PageTransition() {
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.div>
    </MotionConfig>
  );
}
