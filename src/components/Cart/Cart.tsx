import { motion } from 'framer-motion';
import * as React from 'react';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Content, Modal, Overlay } from 'components/Modal';
import { Text } from 'components/Text';
import { ProductType } from 'entities/protuct';
import styles from './Cart.module.scss';

export type CartProps = {
  open: boolean;
  handleClose: () => void;
};

const MotionConten = motion(Content);
const contentVariants = {
  visible: { x: 0 },
  hidden: { x: 500 },
};
const product: ProductType = {
  id: 2,
  title: 'Hes Shelving Unit Tomato Red',
  price: 636,
  description:
    'Meet Hes — a classic low shelving unit, a suitable TV stand or storage for your books, records and décors. The simplistic bent steel construction with protruding elements leaves lots of room for storing and is a discreet nod to minimalism admirers. Available in classic grey and crisp red color, Hes has capacity to become an outstanding hero piece in your living room or home office.',
  images: [
    'https://rzknhedkzukvgtstzbxj.supabase.co/storage/v1/object/sign/shop-bucket/bookcases/HesShelvingUnit_TomatoRed.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzaG9wLWJ1Y2tldC9ib29rY2FzZXMvSGVzU2hlbHZpbmdVbml0X1RvbWF0b1JlZC53ZWJwIiwiaWF0IjoxNjk0NzM1NTEwLCJleHAiOjE2OTczMjc1MTB9.XqiJRSBrkfFcayPSvI2pYyXIF6ocX8q7y5FsT0odWew&t=2023-09-14T23%3A51%3A50.268Z',
    'https://rzknhedkzukvgtstzbxj.supabase.co/storage/v1/object/sign/shop-bucket/bookcases/HesShelvingUnit_TomatoRed_2.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzaG9wLWJ1Y2tldC9ib29rY2FzZXMvSGVzU2hlbHZpbmdVbml0X1RvbWF0b1JlZF8yLndlYnAiLCJpYXQiOjE2OTQ3MzU1MjAsImV4cCI6MTY5NzMyNzUyMH0.xwf97C7xjYK1vEIgcbG75DN4YZ1lXTDWU3KX-NTnbWQ&t=2023-09-14T23%3A52%3A00.558Z',
  ],
  category: {
    id: 1,
    name: 'Bookcases',
    image: '',
  },
};
const CartItem: React.FC<React.PropsWithChildren<{ product: ProductType }>> = ({ product }) => {
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
          <button>delete</button>
        </div>
      </div>
    </li>
  );
};

const CartList: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export const Cart: React.FC<CartProps> = ({ open, handleClose }) => {
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
              (&nbsp;5&nbsp;)
            </Text>
          </Text>
          <CartList>
            {[0, 1, 2, 3, 4].map((number) => {
              return <CartItem key={number} product={product} />;
            })}
          </CartList>
          <div className={styles.cart__footer}>
            <div className={styles.promocode}>
              <Text className={styles.subtotal} view="p-18">
                Subtotal:&nbsp;
                <Text tag="span" view="p-18" weight="medium">
                  ${product.price}
                </Text>
              </Text>
              <Input placeholder="Get discount" value="" onChange={() => {}} />
            </div>
            <Button>Checkout</Button>
          </div>
        </aside>
      </MotionConten>
    </Modal>
  );
};
