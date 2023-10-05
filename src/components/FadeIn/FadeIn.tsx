import { motion } from 'framer-motion';
import * as React from 'react';

export const FadeIn: React.FC<
  React.PropsWithChildren<{ className: string; tag?: 'main' | 'section'; shift?: number; duration?: number }>
> = ({ tag = 'main', className, duration = 0.6, shift, children }) => {
  const Element = motion[tag];

  return (
    <Element
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={{ opacity: 0, y: shift || 0 }}
      transition={{ type: 'tween', duration }}
    >
      {children}
    </Element>
  );
};
