import { observer } from 'mobx-react-lite';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { ProductStoreContext } from 'contexts/productStore';
import { useLocalStore } from 'hooks/useLocalStore';
import { ProductsStore } from 'store/products';
import { Grid } from '../Grid';
import { Search } from '../Search';
const Cards = React.lazy(() => import('../Cards'));
import styles from './Catalogue.module.scss';

type EndMessageProps = { shouldShow: boolean };

const EndMessage: React.FC<EndMessageProps> = ({ shouldShow }) => {
  return (
    <>
      {shouldShow && (
        <Text color="secondary" view="h-32" weight="bold">
          Yay! You have seen it all
        </Text>
      )}
    </>
  );
};

const FIRST_PAGE = 1;

export const Catalogue: React.FC = observer(() => {
  const store = useLocalStore(() => new ProductsStore());
  const products = store.products;
  const [searchPramas, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    store.setPage(Number(searchPramas.get('page')) || FIRST_PAGE);
    store.fetch();
  }, [searchPramas, store]);

  const handleNext = React.useCallback(() => {
    store.fetch();
    searchPramas.set('page', String(store.page));
    setSearchParams(searchPramas);
  }, [searchPramas, setSearchParams, store]);

  return (
    <section className={styles.catalogue}>
      <ProductStoreContext.Provider value={store}>
        <Search />
      </ProductStoreContext.Provider>
      <Grid total={store.count}>
        <InfiniteScroll
          className={styles.scroll}
          dataLength={products.length}
          endMessage={<EndMessage shouldShow={store.meta !== 'loading'} />}
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
