import * as React from 'react';
import { Text } from 'components/Text';
import styles from './Hero.module.scss';

type HeroType = {
  title: string;
  subtitle: string;
};

export const Hero: React.FC<HeroType> = ({ title, subtitle }) => {
  return (
    <section className={styles.hero}>
      <Text tag="h1" view="title" weight="bold">
        {title}
      </Text>
      <Text color="secondary" tag="p" view="p-20">
        {subtitle}
      </Text>
    </section>
  );
};
