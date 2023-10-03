import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { Content, Modal, Overlay } from 'components/Modal';
import { Text } from 'components/Text';
import { routerPaths } from 'config/routerPaths';
import { ProductType } from 'entities/protuct';
import { useCart } from 'hooks/useCart';
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

export const CartItem: React.FC<
  React.PropsWithChildren<{ product: Omit<ProductType, 'description' | 'category'> }>
> = ({ product }) => {
  const [pending, setPending] = React.useState(false);
  const { remove } = useCart(setPending);

  return (
    <motion.li
      animate={{ scale: 1, opacity: 1 }}
      className={styles.item}
      exit={{ scale: 0.95, opacity: 0 }}
      key={product.id}
      transition={{ type: 'tween' }}
      layout
    >
      <img alt={product.title} className={styles.cover} src={product.images[0]} />
      <div className={styles.info}>
        <Text maxLines={1} view="p-20" weight="medium">
          {product.title}
        </Text>
        <div className={styles.footer}>
          <Text className={styles.price} view="p-18">
            Price:&nbsp;
            <Text tag="span" view="p-18" weight="medium">
              ${product.price}
            </Text>
          </Text>
          {!pending ? (
            <button className={styles.delete} onClick={remove(product.id)}>
              <Text view="button">remove</Text>
            </button>
          ) : (
            <Loader size="s" />
          )}
        </div>
      </div>
    </motion.li>
  );
};

export const CartList: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export const Cart: React.FC<CartProps> = observer(({ open, handleClose }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    cartStore.fetch();
  }, [open]);

  const isEmpty = cartStore.count === 0;

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
            {cartStore.meta === Meta.loading ? (
              <Loader size="s" />
            ) : (
              <Text color="accent" tag="span" view="p-24" weight="bold">
                {isEmpty || `( ${cartStore.count} )`}
              </Text>
            )}
          </Text>

          {isEmpty ? (
            <Text color="secondary" view="p-24" weight="medium">
              Cart is empty
            </Text>
          ) : (
            <CartList>
              <AnimatePresence mode="popLayout">
                {cartStore.cart.map((product) => {
                  return <CartItem key={product.id} product={product} />;
                })}
              </AnimatePresence>
            </CartList>
          )}

          <div className={styles.cart__footer}>
            <AnimatePresence>
              {isEmpty || (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.promocode}
                  exit={{ opacity: 0, y: 10 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ type: 'tween' }}
                >
                  <Text className={styles.subtotal} view="p-18">
                    Subtotal:&nbsp;
                    <Text tag="span" view="p-18" weight="medium">
                      ${cartStore.total}
                    </Text>
                  </Text>
                  <Text className={styles.subtotal} view="p-18">
                    Discount:&nbsp;
                    <Text tag="span" view="p-18" weight="medium">
                      ${cartStore.discount}
                    </Text>
                  </Text>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const data = new FormData(e.currentTarget);
                      const discount = data.get('discount');
                      cartStore.applyDiscount(Number(discount));
                    }}
                  >
                    <Input
                      disabled={isEmpty}
                      name="discount"
                      placeholder="Get discount"
                      value={value > 0 ? String(value) : ''}
                      onChange={(value) => setValue(Number(value))}
                    />
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              disabled={isEmpty}
              loading={cartStore.meta === Meta.loading}
              onClick={() => {
                navigate(routerPaths.checkout);
                handleClose();
              }}
            >
              To checkout
            </Button>
          </div>
        </aside>
      </MotionConten>
    </Modal>
  );
});
