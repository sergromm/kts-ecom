import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { MultiDropdown, Option } from 'components/MultiDropdown';
import { useLocalStore } from 'hooks/useLocalStore';
import { CategoriesStore } from 'store/categories';
import { ProductsStore } from 'store/products';
import styles from './Search.module.scss';

const getTitle = (elements: Option[]) => {
  if (elements.length) {
    return elements.map((el: Option) => el.value).join(', ');
  }

  return 'Filters';
};

export const Search = observer(({ productsStore }: { productsStore: ProductsStore }) => {
  const [query, setQuery] = React.useState('');
  const store = useLocalStore(() => new CategoriesStore());
  const [filters, setFilters] = React.useState<Option[]>([]);

  React.useEffect(() => {
    // ignore every request except the last one
    let ignore = false;
    if (!ignore) {
      productsStore.search(query);
    } else {
      productsStore.fetch();
    }
    return () => {
      ignore = true;
    };
  }, [productsStore, query]);

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
        onChange={setFilters}
      />
    </div>
  );
});
