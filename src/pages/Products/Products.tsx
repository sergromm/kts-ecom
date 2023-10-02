import { Hero } from '../../components/Hero';
import { Catalogue } from './components/Catalogue';
import styles from './Products.module.scss';

export const Products: React.FC = () => {
  return (
    <main className={styles.main}>
      <Hero
        subtitle="We display products based on the latest products we have, if you want
to see our old products please enter the name of the item"
        title="Products"
      />
      <Catalogue />
    </main>
  );
};
