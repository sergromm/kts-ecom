import { observer } from 'mobx-react-lite';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductsStore } from 'store/products';
import { Grid } from '../Grid';
import { Search } from '../Search';
const Cards = React.lazy(() => import('../Cards'));
import styles from './Catalogue.module.scss';

export const Catalogue: React.FC = observer(() => {
  const store = useLocalStore(() => new ProductsStore());
  const products = store.products;
  const [searchPramas, setSearchParams] = useSearchParams();
  const shouldFetch = React.useRef(true);

  React.useEffect(() => {
    /**
     * NOTE: не придумал способа лучше, как запретить реакту дважды выполнять useEffect
     * без этого store.fetch вызывался дважды и ломал бесконечный скролл,
     * а сбрасывать стор внутри не вариант, так как данные дополняются по мере скрола
     */
    if (shouldFetch.current) {
      shouldFetch.current = false;
      store.setPaginationOffset(searchPramas.get('offset') || String(store.offset));
      store.fetch();
    }
  }, [store, searchPramas]);

  const handleNext = () => {
    store.fetch();
    searchPramas.set('offset', String(store.offset));
    setSearchParams(searchPramas);
  };

  return (
    <section className={styles.catalogue}>
      <Search productsStore={store} />
      <Grid total={products.length}>
        <InfiniteScroll
          className={styles.scroll}
          dataLength={products.length}
          endMessage={
            <Text color="secondary" view="h-32" weight="bold">
              Yay! You have seen it all
            </Text>
          }
          hasMore={products.length !== store.count}
          loader={<Loader />}
          next={handleNext}
          style={{ overflow: 'visible' }}
        >
          <Cards products={products} />
        </InfiniteScroll>
      </Grid>
    </section>
  );
});
