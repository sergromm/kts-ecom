import * as React from 'react';
import { API } from 'api/products';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { MultiDropdown } from 'components/MultiDropdown';
import styles from './Search.module.scss';

const { data: categories } = await API.getCategories();

export function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const options = categories.map((category) => ({ key: category.name.toLowerCase(), value: category.name }));
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
}
