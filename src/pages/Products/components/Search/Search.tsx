import * as React from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { MultiDropdown } from 'components/MultiDropdown';
import styles from './Search.module.scss';

export function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className={styles.search}>
      <Input placeholder="Search product" value={searchQuery} onChange={setSearchQuery} />
      <Button>Find Now</Button>
      <MultiDropdown
        className={styles.filter}
        getTitle={() => 'Filter'}
        options={[{ key: 'a', value: 'a' }]}
        value={[]}
        onChange={() => {}}
      />
    </div>
  );
}
