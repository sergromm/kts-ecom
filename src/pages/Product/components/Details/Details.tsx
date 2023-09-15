import * as React from 'react';
import { ProductType } from 'api/products';
import { About } from '../About';
const Slider = React.lazy(() => import('../Slider'));
import styles from './Details.module.scss';

export type DetailsProps = {
  product: ProductType;
};

export const Details = ({ product }: DetailsProps) => {
  return (
    <div className={styles.details}>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Slider images={product.images} title={product.title} />
      </React.Suspense>
      <About product={product} />
    </div>
  );
};
