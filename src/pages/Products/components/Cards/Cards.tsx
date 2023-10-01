import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { ProductType } from 'entities/protuct';
import cartStore from 'store/cart';
import { Meta } from 'store/utils';
import styles from './Cards.module.scss';

type CardsType = { products: ProductType[] };

const Cards: React.FC<CardsType> = observer(({ products }) => {
  const location = useLocation();
  return (
    <div className={styles.cards}>
      {products.map((product) => {
        return (
          <Link
            className={styles.link}
            key={product.id}
            state={{ backgroundLocation: location }}
            to={`/products/${product.id}`}
          >
            <Card
              actionSlot={
                <Button
                  loading={cartStore.meta === Meta.loading}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cartStore.add(product.id);
                  }}
                >
                  Add to Cart
                </Button>
              }
              captionSlot={product.category.name}
              contentSlot={`$${product.price}`}
              image={product.images[0]}
              subtitle={product.description}
              title={product.title}
            />
          </Link>
        );
      })}
    </div>
  );
});

export default Cards;
