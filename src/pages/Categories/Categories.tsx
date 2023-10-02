import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'components/Card';
import { Hero } from 'components/Hero';
import { useLocalStore } from 'hooks/useLocalStore';
import { CategoriesStore } from 'store/categories';
import styles from './Categories.module.scss';

export const Categories: React.FC = observer(() => {
  const store = useLocalStore(() => new CategoriesStore());

  React.useEffect(() => {
    store.getCategories();
  }, [store]);
  return (
    <main className={styles.main}>
      <Hero
        subtitle="Our categories page is designed to make it easy for customers to find the type of furniture they're
          looking for"
        title="Categories"
      />

      <section className={styles.grid}>
        {store.categories.map((category) => {
          return (
            <Link className={styles.card} key={category.id} to={`/?filter=${category.name}`}>
              <Card fit="cover" image={category.image} subtitle="" title={category.name} />
            </Link>
          );
        })}
      </section>
    </main>
  );
});
