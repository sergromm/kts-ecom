import { ProductType } from 'api/products';
import { Back } from '../Back';
import { Details } from '../Details';
import styles from './Showcase.module.scss';

export type ShowcaseProps = {
  product: ProductType;
};

export function Showcase({ product }: ShowcaseProps) {
  return (
    <section className={styles.showcase}>
      <Back />
      <Details product={product} />
    </section>
  );
}
