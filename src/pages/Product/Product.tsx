import { useParams } from 'react-router-dom';
import { API } from 'api/products';
import { useFetch } from 'hooks/useFetch';
import { Related } from './components/Related';
import { Showcase } from './components/Showcase';
import styles from './Product.module.scss';

export function Product() {
  const { productId } = useParams();
  const { data: product } = useFetch(() => API.getProduct(Number(productId)));

  if (!product) return;

  return (
    <main className={styles.main}>
      <Showcase product={product} />
      <Related products={Array(3).fill(product)} />
    </main>
  );
}
