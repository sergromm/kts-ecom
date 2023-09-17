import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { MultiDropdown, Option } from 'components/MultiDropdown';
import { useLocalStore } from 'hooks/useLocalStore';
import { CategoriesStore } from 'store/categories';
import { ProductsStore } from 'store/products';
import styles from './Search.module.scss';

const getTitle = (options: Option[]) => {
  if (options.length) {
    return options.map((el: Option) => el.value).join(', ');
  }

  return 'Filters';
};

// NOTE: номально ли прокидывать стор в пропсах? ощущение что что-то не так делаю.

export const Search = observer(({ productsStore }: { productsStore: ProductsStore }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useLocalStore(() => new CategoriesStore());
  const [filters, setFilters] = React.useState<Option[]>([]);
  const [query, setQuery] = React.useState('');

  const handleFilterSelect = (value: Option[]) => {
    const filterQuery = getTitle(value);
    productsStore.filter(filterQuery);
    searchParams.set('filter', filterQuery);
    setSearchParams(searchParams);
    setFilters(value);
  };

  React.useEffect(() => {
    // ignore every request except the last one
    // to avoid race condition.
    // maybe i could use AbortController instead
    let ignore = false;

    if (!ignore && query.length > 0) {
      productsStore.search(query);
      searchParams.set('search', query);
      setSearchParams(searchParams);
    } else if (query.length === 0) {
      setSearchParams({});
      productsStore.fetch();
    }

    return () => {
      ignore = true;
    };
  }, [productsStore, query, searchParams, setSearchParams]);

  React.useEffect(() => {
    store.getCategories();
  }, [store]);

  const options = store.getOptions();

  return (
    <div className={styles.search}>
      <Input placeholder="Search product" value={query} onChange={setQuery} />
      <Button loading>Find Now</Button>
      <MultiDropdown
        className={styles.filter}
        getTitle={getTitle}
        options={options}
        value={filters}
        onChange={handleFilterSelect}
      />
    </div>
  );
});
