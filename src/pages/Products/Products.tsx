import { Catalogue } from './components/Catalogue';
import { Hero } from './components/Hero';
import styles from './Products.module.scss';

export function Products() {
  return (
    <main className={styles.main}>
      <Hero />
      <Catalogue />
    </main>
  );
}
