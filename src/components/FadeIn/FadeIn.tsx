import { motion } from 'framer-motion';
import * as React from 'react';

export const FadeIn: React.FC<React.PropsWithChildren<{ className: string; tag?: 'main' }>> = ({
  tag = 'main',
  className,
  children,
}) => {
  const Element = motion[tag];

  return (
    <Element animate={{ opacity: 1 }} className={className} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
      {children}
    </Element>
  );
};
