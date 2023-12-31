import * as React from 'react';
import { ProductCard } from 'components/Card';
import { Text } from 'components/Text';
import { ProductType } from 'entities/protuct';
import styles from './Related.module.scss';

export type RelatedProps = {
  products: ProductType[];
};

const Related: React.FC<RelatedProps> = ({ products }) => {
  return (
    <section className={styles.related}>
      <Text tag="h2" view="h-32" weight="bold">
        Related Items
      </Text>
      <div className={styles.cards}>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default Related;
