import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FadeIn } from 'components/FadeIn';
import { Hero } from 'components/Hero';
import { SkeletonGrid } from 'components/Skeleton';
import { useLocalStore } from 'hooks/useLocalStore';
import { CategoriesStore } from 'store/categories';
import styles from './Categories.module.scss';
const Grid = React.lazy(() => import('./Grid'));

export const Categories: React.FC = observer(() => {
  const store = useLocalStore(() => new CategoriesStore());

  React.useEffect(() => {
    store.getCategories();
  }, [store]);

  return (
    <FadeIn className={styles.main}>
      <Hero
        subtitle="Our categories page is designed to make it easy for customers to find the type of furniture they're
          looking for"
        title="Categories"
      />
      <React.Suspense fallback={<SkeletonGrid />}>
        <Grid categories={store.categories} />
      </React.Suspense>
    </FadeIn>
  );
});
