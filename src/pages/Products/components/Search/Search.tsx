import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { MultiDropdown } from 'components/MultiDropdown';
import { useLocalStore } from 'hooks/useLocalStore';
import { CategoriesStore } from 'store/categories';
import styles from './Search.module.scss';

export const Search = observer(() => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const store = useLocalStore(() => new CategoriesStore());

  React.useEffect(() => {
    store.getCategories();
  }, [store]);

  const options = store.getOptions();

  return (
    <div className={styles.search}>
      <Input placeholder="Search product" value={searchQuery} onChange={setSearchQuery} />
      <Button loading>Find Now</Button>
      <MultiDropdown
        className={styles.filter}
        getTitle={() => 'Filter'}
        options={options}
        value={[]}
        onChange={() => {}}
      />
    </div>
  );
});
