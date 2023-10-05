import { PanInfo, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'components/Button';
import { Content, Modal, Overlay } from 'components/Modal';
import { Text } from 'components/Text';
import { ArrowRightIcon } from 'components/icons/ArrowRightIcon';
import { useCard } from 'hooks/useCard';
import { useLocalStore } from 'hooks/useLocalStore';
import cartStore from 'store/cart';
import { ProductStore } from 'store/product';
const Slider = React.lazy(() => import('pages/Product/components/Slider'));

import styles from './ProductModal.module.scss';

type DragEvent = MouseEvent | TouchEvent | PointerEvent;

const CLOSE_THRESHOLD = window.innerHeight * 0.6;
const MAX_VELOCITY = 300;

const MotionContent = motion(Content);
const contentVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 100, opacity: 0 },
};

export const ProductModal: React.FC = observer(() => {
  const { productId } = useParams();
  const [pending, setPending] = React.useState(false);
  const { add } = useCard(setPending);
  const inCart = cartStore.cart.some((p) => p.id === Number(productId));
  const [open, setOpen] = React.useState(true);

  const store = useLocalStore(() => new ProductStore());
  const product = store.product;
  const navigate = useNavigate();
  const y = useMotionValue(0);
  const ySmooth = useSpring(y, { damping: 50, stiffness: 400 });
  const opacity = useTransform(ySmooth, [0, 500], [1, 0], {
    clamp: false,
  });

  const handleClose = React.useCallback(() => {
    setOpen(false);
    navigate(-1);
  }, [navigate, setOpen]);

  const handleDragEnd = React.useCallback(
    (_: DragEvent, { velocity, offset }: PanInfo) => {
      if (offset.y >= CLOSE_THRESHOLD || velocity.y > MAX_VELOCITY) {
        handleClose();
        opacity.set(0);
      }
    },
    [handleClose, opacity],
  );

  React.useEffect(() => {
    if (productId) {
      store.getProduct(productId);
    }
  }, [store, productId]);

  if (!product) return;

  // TODO(@sergromm): split into smaller components
  return (
    <Modal open={open} position="center">
      <MotionContent
        animate="visible"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        exit="hidden"
        initial="hidden"
        key="modal-content"
        style={{ y }}
        transition={{ type: 'tween', duration: 0.3 }}
        variants={contentVariants}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
      >
        <div className={styles['grab-area']}>
          <div className={styles.handle} />
        </div>
        <motion.div className={styles.container} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={false}>
          <React.Suspense fallback={<h1>Loading images</h1>}>
            <Slider blur={product.blurhash} images={product.images} title={product.title} reverse />
          </React.Suspense>
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className={styles.details}
            initial={{ y: 50, opacity: 0 }}
            transition={{ type: 'tween' }}
          >
            <div className={styles.info}>
              <Text tag="h1" view="title" weight="bold">
                {product.title}
              </Text>
              <Text view="p-18">{product.description}</Text>
            </div>
            <div className={styles.footer}>
              <Text className={styles.price} view="p-20">
                Price:&nbsp;
                <Text tag="span" view="p-20" weight="bold">
                  ${product.price}
                </Text>
              </Text>

              <div className={styles.actions}>
                <Link className={styles.link} to={`/products/${product.id}`}>
                  To product&apos;s page
                  <ArrowRightIcon height={31} width={31} />
                </Link>
                <Button disabled={inCart} loading={pending} onClick={add(product)}>
                  Add To Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </MotionContent>
      <Overlay handleClose={handleClose} opacity={opacity} />
    </Modal>
  );
});
