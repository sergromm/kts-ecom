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

type SearchProps = { productsStore: ProductsStore };

// NOTE: номально ли прокидывать стор в пропсах? ощущение что что-то не так делаю.
export const Search: React.FC<SearchProps> = observer(({ productsStore }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesStore = useLocalStore(() => new CategoriesStore());
  const shouldFetch = React.useRef(true);

  const handleSearchParams = (name: string, value: string) => {
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const getTitle = (value: Option[]) => {
    return productsStore.getFilterQuery(value) || 'Filters';
  };

  React.useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      const filter = searchParams.get('filter');
      const search = searchParams.get('search');

      // FIXME: возможно есть способ избавиться от обёртки :thinking:
      const awaitCategories = async () => {
        await categoriesStore.getCategories();
        categoriesStore.setValueByName(filter ?? '');
      };

      awaitCategories();

      productsStore.setFilters(filter ?? '');
      productsStore.setSearchQuery(search ?? '');
    }
  }, [categoriesStore, productsStore, searchParams]);

  const handleChange = (value: Option[]) => {
    categoriesStore.setValue(value);
    const filter = categoriesStore.getFilterQuery();
    handleSearchParams('filter', filter);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const search = data.get('search') as string;
    handleSearchParams('search', search);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <Input
        name="search"
        placeholder="Search product"
        value={productsStore.searchQuery}
        onChange={productsStore.setSearchQuery}
      />
      <Button type="submit">Find Now</Button>
      <MultiDropdown
        className={styles.filter}
        getTitle={getTitle}
        options={categoriesStore.options}
        value={categoriesStore.value}
        onChange={handleChange}
      />
    </form>
  );
});
