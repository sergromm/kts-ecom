import * as React from 'react';
import { Loader } from 'components/Loader';
import { Title } from '../Title';
import styles from './Grid.module.scss';

type GridProps = { total: number };

export const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({ children, total }) => {
  return (
    <>
      <div className={styles.grid}>
        <Title total={total} />
        <React.Suspense fallback={<Loader size="l" />}>{children}</React.Suspense>
      </div>
    </>
  );
};
