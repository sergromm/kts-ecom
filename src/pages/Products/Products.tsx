import * as React from 'react';
import { API } from 'api/products';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { MultiDropdown } from 'components/MultiDropdown';
import { Text } from 'components/Text';
import styles from './Products.module.scss';
const ProductCards = React.lazy(() => import('./components/Crads/Cards'));

const { data: products } = await API.getProducts();

export function Products() {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <main className={styles.main}>
      <section className={styles.text__container}>
        <Text tag="h1" view="title" weight="bold">
          Products
        </Text>
        <Text color="secondary" tag="p" view="p-20">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </section>

      <section className={styles.catalogue}>
        <div className={styles.search}>
          <Input placeholder="Search product" value={searchQuery} onChange={setSearchQuery} />
          <Button>Find Now</Button>
          <MultiDropdown
            className={styles.filter}
            getTitle={() => 'Filter'}
            options={[{ key: 'a', value: 'a' }]}
            value={[]}
            onChange={() => {}}
          />
        </div>

        <div className={styles.products}>
          <Text className={styles.total} tag="h2" view="title" weight="bold">
            Total Products{' '}
            <Text className={styles.number} color="accent" tag="span" view="p-20" weight="bold">
              {products.length}
            </Text>
          </Text>
          <React.Suspense fallback={<h1>LOADING...</h1>}>
            <ProductCards products={products} />
          </React.Suspense>
        </div>
      </section>
    </main>
  );
}
