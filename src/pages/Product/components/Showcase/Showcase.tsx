import { ProductType } from 'entities/protuct';
import { Back } from '../Back';
import { Details } from '../Details';
import styles from './Showcase.module.scss';

export type ShowcaseProps = {
  product: ProductType;
};

const Showcase = ({ product }: ShowcaseProps) => {
  return (
    <section className={styles.showcase}>
      <Back />
      <Details product={product} />
    </section>
  );
};

export default Showcase;
