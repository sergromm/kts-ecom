import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductStore } from 'store/product';
const Showcase = React.lazy(() => import('./components/Showcase'));
const Related = React.lazy(() => import('./components/Related'));
import styles from './Product.module.scss';

const RELATED_ITEMS_COUNT = 3;

export const Product = observer(() => {
  const { productId } = useParams();
  const store = useLocalStore(() => new ProductStore());
  const product = store.product;

  React.useEffect(() => {
    if (productId) {
      store.getProduct(productId);
    }
  }, [store, productId]);

  /* smh suspense doesn't work without this */
  if (!product) return;

  return (
    <main className={styles.main}>
      <React.Suspense fallback={<h1>LOADING...</h1>}>
        <Showcase product={product} />
        <Related products={Array(RELATED_ITEMS_COUNT).fill(product)} />
      </React.Suspense>
    </main>
  );
});
