import * as React from 'react';
import { API } from 'api/products';
import { Grid } from '../Grid';
import { Pagination } from '../Pagination';
import { Search } from '../Search';
const Cards = React.lazy(() => import('../Cards'));
import styles from './Catalogue.module.scss';

const { data: products } = await API.getProducts();
export function Catalogue() {
  return (
    <section className={styles.catalogue}>
      <Search />
      <Grid total={products.length}>
        <Cards products={products} />
      </Grid>
      <Pagination />
    </section>
  );
}
