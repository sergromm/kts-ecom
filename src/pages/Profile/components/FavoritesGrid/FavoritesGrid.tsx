import * as React from 'react';
import { ProductCard } from 'components/Card';
import { ProductType } from 'entities/protuct';
import styles from './FavoritesGrid.module.scss';

export const FavoritesGrid: React.FC<{ favorites: ProductType[] }> = ({ favorites }) => {
  return (
    <section className={styles.grid}>
      {favorites.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
