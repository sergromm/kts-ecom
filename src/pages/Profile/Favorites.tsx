import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Text } from 'components/Text';
import userStore from 'store/user';
import { FavoritesGrid } from './components/FavoritesGrid';
import styles from './Favorites.module.scss';

export const Favorites: React.FC = observer(() => {
  return (
    <div className={styles.favorites}>
      <Text view="title" weight="bold">
        Your favorites
      </Text>
      <FavoritesGrid favorites={userStore.favorites} />
    </div>
  );
});
