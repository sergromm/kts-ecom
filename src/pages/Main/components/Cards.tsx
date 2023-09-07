import { Product } from 'api/products';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import styles from '../Main.module.scss';

export default function Cards({ products }: { products: Product[] }) {
  return (
    <div className={styles.cards}>
      {products.map((product) => {
        return (
          <Card
            actionSlot={<Button>Add to Cart</Button>}
            captionSlot={product.category.name}
            contentSlot={`$${product.price}`}
            image={product.images[0]}
            key={product.id}
            subtitle={product.description}
            title={product.title}
          />
        );
      })}
    </div>
  );
}
