import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { ProductType } from 'entities/protuct';
import { useCart } from 'hooks/useCart';
import cartStore from 'store/cart';

import styles from './Cards.module.scss';

type CardsType = { products: ProductType[] };

const CardItem: React.FC<{ product: ProductType }> = observer(({ product }) => {
  const location = useLocation();
  const [pending, setPending] = React.useState(false);
  const { add } = useCart(setPending);
  const inCart = cartStore.cart.some((p) => p.id === product.id);
  return (
    <Link
      className={styles.link}
      key={product.id}
      state={{ backgroundLocation: location }}
      to={`/products/${product.id}`}
    >
      <Card
        actionSlot={
          <Button disabled={inCart} loading={pending} onClick={add(product)}>
            Add to Cart
          </Button>
        }
        captionSlot={product.category.name}
        contentSlot={`$${product.price}`}
        hash={product.blurhash[0].blurhash}
        image={product.images[0]}
        subtitle={product.description}
        title={product.title}
      />
    </Link>
  );
});

const Cards: React.FC<CardsType> = ({ products }) => {
  return (
    <div className={styles.cards}>
      {products.map((product) => {
        return <CardItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Cards;
