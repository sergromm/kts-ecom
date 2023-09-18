import { observer } from 'mobx-react-lite';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from 'components/Button';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductsStore } from 'store/products';
import { Grid } from '../Grid';
import { Pagination } from '../Pagination';
import { Search } from '../Search';
const Cards = React.lazy(() => import('../Cards'));
import styles from './Catalogue.module.scss';

export const Catalogue = observer(() => {
  const store = useLocalStore(() => new ProductsStore());
  const shouldFetch = React.useRef(true);
  const products = store.products;

  React.useEffect(() => {
    /**
     * NOTE: не придумал способа лучше, как запретить реакту дважды выполнять useEffect
     * без этого store.fetch вызывался дважды и ломал бесконечный скролл,
     * а сбрасывать стор внутри не вариант, так как данные дополняются по мере скрола
     */

    if (shouldFetch.current) {
      store.fetch();
      shouldFetch.current = false;
    }
  }, [store]);

  return (
    <section className={styles.catalogue}>
      <Search productsStore={store} />
      <Button onClick={store.fetch}>fetch next</Button>
      <InfiniteScroll
        dataLength={products.length}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        hasMore={products.length !== 30}
        loader={<h4>Loading...</h4>}
        next={store.fetch}
      >
        <Grid total={products.length}>
          <Cards products={products} />
        </Grid>
      </InfiniteScroll>
      <Pagination />
    </section>
  );
});
