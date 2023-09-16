import * as React from 'react';
import { useParams } from 'react-router-dom';
import { API } from 'api/products';
import { ProductType } from 'entities/protuct';
import { Related } from './components/Related';
import { Showcase } from './components/Showcase';
import styles from './Product.module.scss';

const RELATED_ITEMS_COUNT = 3;

export const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = React.useState<ProductType | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchProduct = async (id: string | undefined) => {
      try {
        const response = await API.getProduct(Number(id));
        setProduct(response);
      } catch (err) {
        setError(true);
      }
    };
    fetchProduct(productId);
  }, [productId]);

  if (!product) return 'loading...';
  if (error) return 'error...';

  return (
    <main className={styles.main}>
      <Showcase product={product} />
      <Related products={Array(RELATED_ITEMS_COUNT).fill(product)} />
    </main>
  );
};
