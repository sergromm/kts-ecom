import * as React from 'react';
import { ImageWithBlur } from 'components/Image';
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
      <React.Suspense
        fallback={
          <ImageWithBlur alt={product.title} className="" hash={product.blurhash[0].blurhash} src={product.images[0]} />
        }
      >
        <Slider blur={product.blurhash} images={product.images} title={product.title} />
      </React.Suspense>
      <About product={product} />
    </div>
  );
};
