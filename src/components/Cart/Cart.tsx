import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { Content, Modal, Overlay } from 'components/Modal';
import { Text } from 'components/Text';
import { ProductType } from 'entities/protuct';
import cartStore from 'store/cart';
import { Meta } from 'store/utils';
import styles from './Cart.module.scss';

export type CartProps = {
  open: boolean;
  handleClose: () => void;
};

const MotionConten = motion(Content);
const contentVariants = {
  visible: { x: 0 },
  hidden: { x: 550 },
};

const CartItem: React.FC<React.PropsWithChildren<{ product: Omit<ProductType, 'description' | 'category'> }>> =
  observer(({ product }) => {
    return (
      <li className={styles.item}>
        <img alt={product.title} className={styles.cover} src={product.images[0]} />
        <div className={styles.info}>
          <Text view="p-20" weight="medium">
            {product.title}
          </Text>
          <div className={styles.footer}>
            <Text className={styles.price} view="p-18">
              Price:&nbsp;
              <Text tag="span" view="p-18" weight="medium">
                ${product.price}
              </Text>
            </Text>
            {!(cartStore.meta === Meta.loading) ? (
              <button
                onClick={() => {
                  cartStore.remove(product.id);
                }}
              >
                delete
              </button>
            ) : (
              <Loader size="s" />
            )}
          </div>
        </div>
      </li>
    );
  });

const CartList: React.FC<React.PropsWithChildren> = observer(({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
});

export const Cart: React.FC<CartProps> = observer(({ open, handleClose }) => {
  React.useEffect(() => {
    cartStore.fetch();
  }, [open]);

  return (
    <Modal open={open} position="right">
      <Overlay handleClose={handleClose} />
      <MotionConten
        animate="visible"
        exit="hidden"
        initial="hidden"
        transition={{ type: 'tween' }}
        variants={contentVariants}
      >
        <aside className={styles.cart}>
          <Text className={styles.title} tag="h2" view="h-32" weight="bold">
            Cart&nbsp;
            <Text color="accent" tag="span" view="p-24" weight="bold">
              (&nbsp;{cartStore.count}&nbsp;)
            </Text>
          </Text>

          <CartList>
            {cartStore.cart.map((product) => {
              return <CartItem key={product.id} product={product} />;
            })}
          </CartList>

          <div className={styles.cart__footer}>
            <div className={styles.promocode}>
              <Text className={styles.subtotal} view="p-18">
                Subtotal:&nbsp;
                <Text tag="span" view="p-18" weight="medium">
                  ${cartStore.total}
                </Text>
              </Text>
              <Input placeholder="Get discount" value="" onChange={() => {}} />
            </div>
            <Button loading={cartStore.meta === Meta.loading}>Checkout</Button>
          </div>
        </aside>
      </MotionConten>
    </Modal>
  );
});
