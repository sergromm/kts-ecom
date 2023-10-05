import * as React from 'react';
import { ProductCard } from 'components/Card';
import { ProductType } from 'entities/protuct';

import styles from './Cards.module.scss';

type CardsType = { products: ProductType[] };

const Cards: React.FC<CardsType> = ({ products }) => {
  return (
    <div className={styles.cards}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Cards;
