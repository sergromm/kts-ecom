import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductsStore } from 'store/products';
import { Grid } from '../Grid';
import { Pagination } from '../Pagination';
import { Search } from '../Search';
const Cards = React.lazy(() => import('../Cards'));
import styles from './Catalogue.module.scss';

export const Catalogue = observer(() => {
  const store = useLocalStore(() => new ProductsStore());
  const products = store.products;

  React.useEffect(() => {
    store.fetch();
  }, [store]);

  return (
    <section className={styles.catalogue}>
      <Search productsStore={store} />
      <Grid total={products.length}>
        <Cards products={products} />
      </Grid>
      <Pagination />
    </section>
  );
});
