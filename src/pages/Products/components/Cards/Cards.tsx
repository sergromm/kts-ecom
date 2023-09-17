import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { ProductType } from 'entities/protuct';
import styles from './Cards.module.scss';

const Cards = ({ products }: { products: ProductType[] }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.cards}>
      {products.map((product) => {
        return (
          <Card
            actionSlot={<Button onClick={(e) => e.stopPropagation()}>Add to Cart</Button>}
            captionSlot={product.category.name}
            contentSlot={`$${product.price}`}
            image={product.images[0]}
            key={product.id}
            subtitle={product.description}
            title={product.title}
            onClick={() => navigate(`products/${product.id}`)}
          />
        );
      })}
    </div>
  );
};

export default Cards;
