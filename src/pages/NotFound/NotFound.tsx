import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { Back } from 'components/Back';
import { FadeIn } from 'components/FadeIn';
import { Text } from 'components/Text';
import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
  return (
    <FadeIn className={styles.main}>
      <Text className={styles.title} color="secondary" view="title" weight="bold">
        <AnimatePresence mode="popLayout">
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            4
          </motion.span>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', delay: 0.4, duration: 0.3 }}
          >
            0
          </motion.span>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', delay: 0.8, duration: 0.3 }}
          >
            4
          </motion.span>
        </AnimatePresence>
      </Text>
      <Text className={styles.subtitle} color="secondary" view="p-20">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ type: 'tween', duration: 0.5 }}
        >
          The page you where looking for doesn&apos;t exist
        </motion.span>
      </Text>
      <Back />
    </FadeIn>
  );
};
