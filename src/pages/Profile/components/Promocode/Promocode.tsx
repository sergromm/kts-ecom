import * as React from 'react';

import { Text } from 'components/Text';
import styles from './Promocode.styles.module.scss';

export const Promocode: React.FC = () => {
  return (
    <div className={styles.promocode}>
      <img
        alt=""
        className={styles.cover}
        src="https://cdn.shopify.com/s/files/1/0150/6262/products/the_sill-variant-white_gloss-zz_plant.jpg?v=1680548849"
      />
      <Text className={styles.text} view="p-16">
        Promocode
        <Text tag="span" view="p-16">
          OFF10
        </Text>
      </Text>
      <Text className={styles.text} color="secondary" view="p-16">
        Discount
        <Text color="secondary" tag="span" view="p-16">
          10%
        </Text>
      </Text>
    </div>
  );
};
