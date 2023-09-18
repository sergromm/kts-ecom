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

// NOTE: номально ли прокидывать стор в пропсах? ощущение что что-то не так делаю.
export const Search = observer(({ productsStore }: { productsStore: ProductsStore }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useLocalStore(() => new CategoriesStore());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    productsStore.fetch();
  };

  React.useEffect(() => {
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      productsStore.setSearchQuery(searchQuery);
    }

    const setFiltersOnLoad = async () => {
      await store.getCategories();
      const filterQueries = searchParams.get('filter')?.split(', ');

      if (filterQueries) {
        const filters = store.options.filter((option) => filterQueries.includes(option.value));
        productsStore.setFilters(filters);
      }
    };

    setFiltersOnLoad();
  }, [productsStore, searchParams, store]);

  const getTitle = (value: Option[]) => {
    return productsStore.getFilterQuery(value) || 'Filters';
  };

  const handleChange = (value: Option[]) => {
    productsStore.setFilters(value);
    searchParams.set('filter', productsStore.getFilterQuery(value));
    setSearchParams(searchParams);
    productsStore.fetch();
  };

  const handleInput = (value: string) => {
    productsStore.setSearchQuery(value);
    searchParams.set('search', value);
    setSearchParams(searchParams);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <Input name="search" placeholder="Search product" value={productsStore.searchQuery} onChange={handleInput} />
      <Button type="submit">Find Now</Button>
      <MultiDropdown
        className={styles.filter}
        getTitle={getTitle}
        options={store.options}
        value={productsStore.filters}
        onChange={handleChange}
      />
    </form>
  );
});
