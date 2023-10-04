import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { MultiDropdown, Option } from 'components/MultiDropdown';
import { useProductStore } from 'contexts/productStoreContext';
import { useLocalStore } from 'hooks/useLocalStore';
import { CategoriesStore } from 'store/categories';
import { debounce } from 'utils/debounce';
import styles from './Search.module.scss';

export const Search: React.FC = observer(() => {
  const productsStore = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const handleSearchParams = React.useCallback(
    (name: string, value: string) => {
      if (value) {
        searchParams.set(name, value);
      } else {
        searchParams.delete(name);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const getTitle = (value: Option[]) => {
    return productsStore?.getFilterQuery(value) || 'Filters';
  };

  React.useEffect(() => {
    const filter = searchParams.get('filter');
    const search = searchParams.get('search');

    const awaitCategories = async () => {
      await categoriesStore.getCategories();
      categoriesStore.setValueByName(filter ?? '');
    };

    awaitCategories();

    productsStore?.setFilters(filter ?? '');
    productsStore?.setSearchQuery(search ?? '');
  }, [categoriesStore, productsStore, searchParams]);

  const handleChange = React.useCallback(
    (value: Option[]) => {
      categoriesStore.setValue(value);
      const filter = categoriesStore.getFilterQuery();
      handleSearchParams('filter', filter);
    },
    [categoriesStore, handleSearchParams],
  );

  const delayChange = React.useMemo(
    () =>
      debounce((value: string) => {
        handleSearchParams('search', value);
      }, 30),
    [handleSearchParams],
  );

  return (
    <form className={styles.search}>
      <Input
        name="search"
        placeholder="Search product"
        value={productsStore?.searchQuery ?? ''}
        onChange={delayChange}
      />
      <Button onClick={(e) => e.preventDefault()}>Find Now</Button>
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
