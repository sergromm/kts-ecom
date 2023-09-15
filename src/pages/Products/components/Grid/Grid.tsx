import * as React from 'react';
import { Title } from '../Title';
import styles from './Grid.module.scss';

type GridProps = { total: number };

export function Grid({ children, total }: React.PropsWithChildren<GridProps>) {
  return (
    <div className={styles.grid}>
      <Title total={total} />
      <React.Suspense fallback={<h1>LOADING...</h1>}>{children}</React.Suspense>
    </div>
  );
}
