import * as React from 'react';
import { ProductType } from 'entities/protuct';
import { About } from '../About';
const Slider = React.lazy(() => import('../Slider'));
import styles from './Details.module.scss';

export type DetailsProps = {
  product: ProductType;
};

export const Details: React.FC<DetailsProps> = ({ product }: DetailsProps) => {
  return (
    <div className={styles.details}>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Slider images={product.images} title={product.title} />
      </React.Suspense>
      <About product={product} />
    </div>
  );
};
