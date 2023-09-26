import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductStore } from 'store/product';
const Showcase = React.lazy(() => import('./components/Showcase'));
const Related = React.lazy(() => import('./components/Related'));
import styles from './Product.module.scss';

export const Product: React.FC = observer(() => {
  const { productId } = useParams();
  const store = useLocalStore(() => new ProductStore());
  const product = store.product;

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
    <main className={styles.main}>
      <React.Suspense fallback={<h1>LOADING...</h1>}>
        <Showcase product={product} />
        <Related products={store.related} />
      </React.Suspense>
    </main>
  );
});
