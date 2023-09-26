import * as React from 'react';
import { Text } from 'components/Text';
import styles from './Title.module.scss';

type TitleProps = { total: number };

export const Title: React.FC<TitleProps> = ({ total }) => {
  return (
    <Text className={styles.total} tag="h2" view="h-32" weight="bold">
      Total Products{' '}
      <Text className={styles.number} color="accent" tag="span" view="p-20" weight="bold">
        {total}
      </Text>
    </Text>
  );
};
