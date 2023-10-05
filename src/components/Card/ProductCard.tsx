import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from 'components/Button';
import { HeartIcon } from 'components/icons/HeartIcon';
import { ProductType } from 'entities/protuct';
import { useCard } from 'hooks/useCard';
import cartStore from 'store/cart';
import userStore from 'store/user';
import { Card } from './Card';
import styles from './Card.module.scss';

const MotionHeart = motion(HeartIcon);

export const ProductCard: React.FC<{ product: ProductType }> = observer(({ product }) => {
  const location = useLocation();
  const [pending, setPending] = React.useState(false);
  const { add, favorite, removeFromFavorites } = useCard(setPending);
  const inCart = cartStore.cart.some((p) => p.id === product.id);
  const inFavorites = userStore.favorites.some((p) => p.id === product.id);

  return (
    <Link
      className={styles.link}
      key={product.id}
      state={{ backgroundLocation: location }}
      to={`/products/${product.id}`}
    >
      <Card
        actionSlot={
          <div className={styles.action}>
            {userStore.profile.id && (
              <motion.button
                className={styles.favorite}
                whileHover={{ color: '#487773' }}
                whileTap={{ color: '#86aaa7' }}
                onClick={(e) => (inFavorites ? removeFromFavorites(product.id)(e) : favorite(product)(e))}
              >
                <MotionHeart fill="#518581" height={30} selected={inFavorites} width={30} />
              </motion.button>
            )}
            <Button disabled={inCart} loading={pending} onClick={add(product)}>
              Add to Cart
            </Button>
          </div>
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
