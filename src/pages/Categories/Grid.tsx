import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'components/Card';
import { CategoryType } from 'entities/category';
import styles from './Categories.module.scss';

const Grid: React.FC<{ categories: CategoryType[] }> = ({ categories }) => (
  <section className={styles.grid}>
    {categories.map((category) => {
      return (
        <Link className={styles.card} key={category.id} to={`/?filter=${category.name}`}>
          <Card
            fit="cover"
            hash={category.blurhash}
            image={category.image}
            size="small"
            subtitle=""
            title={category.name}
          />
        </Link>
      );
    })}
  </section>
);

export default Grid;
