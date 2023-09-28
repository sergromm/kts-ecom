import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'components/Modal';
import { Text } from 'components/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductStore } from 'store/product';
const Slider = React.lazy(() => import('pages/Product/components/Slider'));

import styles from './ProductModal.module.scss';

export const ProductModal: React.FC = observer(() => {
  const { productId } = useParams();
  const [open, setOpen] = React.useState(true);
  const store = useLocalStore(() => new ProductStore());
  const product = store.product;
  const navigate = useNavigate();

  const handleClose = React.useCallback(() => {
    setOpen(false);
    navigate(-1);
  }, [navigate, setOpen]);

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

  /* smh suspense doesn't work without this */
  if (!product) return;

  return (
    <Modal handleOpen={setOpen} open={open} onClose={handleClose}>
      <motion.div className={styles.container}>
        <React.Suspense fallback={<h1>Loading images</h1>}>
          <Slider images={product.images} title={product.title} />
        </React.Suspense>
        <motion.div
          animate={{ y: 0, opacity: 1, transition: { opacity: { duration: 0.5 } } }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ type: 'tween', delay: 0.5 }}
        >
          <Text tag="h1" view="title" weight="bold">
            {product.title}
          </Text>
          <Text>{product.description}</Text>
          <Link to={`/products/${product.id}`}>To product page</Link>
        </motion.div>
      </motion.div>
    </Modal>
  );
});
