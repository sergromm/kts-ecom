import * as React from 'react';
import { Text } from 'components/Text';
import styles from './Description.module.scss';

export type DescriptionProps = {
  title: string;
  description: string;
};

export const Description: React.FC<DescriptionProps> = ({ title, description }) => {
  return (
    <div className={styles.description}>
      <Text tag="h1" view="title" weight="bold">
        {title}
      </Text>
      <Text color="secondary" tag="p" view="p-20">
        {description}
      </Text>
    </div>
  );
};
