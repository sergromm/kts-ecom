import * as React from 'react';
import { Skeleton } from './Skeleton';
import styles from './Skeleton.module.scss';

export const SkeletonGrid: React.FC = () => (
  <div className={styles.grid}>
    {[0, 1, 2, 3, 4, 5].map((number) => (
      <Skeleton key={number} />
    ))}
  </div>
);
