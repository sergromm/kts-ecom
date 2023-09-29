import { PanInfo, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'components/Button';
import { Content, Modal, Overlay } from 'components/Modal';
import { Text } from 'components/Text';
import { ArrowRightIcon } from 'components/icons/ArrowRightIcon';
import { DragHandleIcon } from 'components/icons/DragHandleIcon';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductStore } from 'store/product';
const Slider = React.lazy(() => import('pages/Product/components/Slider'));

import styles from './ProductModal.module.scss';

type DragEvent = MouseEvent | TouchEvent | PointerEvent;

const CLOSE_THRESHOLD = window.innerHeight * 0.6;
const MAX_VELOCITY = 300;

export const ProductModal: React.FC = observer(() => {
  const { productId } = useParams();
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

  React.useEffect(() => {
    if (product) {
      store.getRelated(product.category.name);
    }
  }, [product, store]);

  if (!product) return;

  // TODO(@sergromm): split into smaller components
  return (
    <Modal open={open} position="center">
      <Content handleDragEnd={handleDragEnd} y={y}>
        <div className={styles.handle}>
          <DragHandleIcon height={31} width={31} />
        </div>
        <motion.div className={styles.container} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={false}>
          <React.Suspense fallback={<h1>Loading images</h1>}>
            <Slider images={product.images} title={product.title} reverse />
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
                <Button>Add To Cart</Button>
                <Link className={styles.link} to={`/products/${product.id}`}>
                  To product&apos;s page
                  <ArrowRightIcon height={31} width={31} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Content>
      <Overlay handleClose={handleClose} opacity={opacity} />
    </Modal>
  );
});
