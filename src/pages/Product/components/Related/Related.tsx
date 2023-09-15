import { ProductType } from 'api/products';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import styles from './Related.module.scss';

export type RelatedProps = {
  products: ProductType[];
};

export function Related({ products }: RelatedProps) {
  return (
    <section className={styles.related}>
      <Text tag="h2" view="h-32" weight="bold">
        Related Items
      </Text>
      <div className={styles.cards}>
        {products.map((product) => (
          <Card image={product.images[0]} key={product.id} subtitle={product.description} title={product.title} />
        ))}
      </div>
    </section>
  );
}
