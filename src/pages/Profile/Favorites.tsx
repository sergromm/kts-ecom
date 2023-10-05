import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FadeIn } from 'components/FadeIn';
import { Text } from 'components/Text';
import userStore from 'store/user';
import { FavoritesGrid } from './components/FavoritesGrid';
import styles from './Favorites.module.scss';

export const Favorites: React.FC = observer(() => {
  return (
    <FadeIn className={styles.favorites} duration={0.3} shift={10} tag="section">
      {userStore.favorites.length > 0 ? (
        <Text view="title" weight="bold">
          Your favorites
        </Text>
      ) : (
        <Text color="secondary" view="h-32" weight="bold">
          You don&apos;t have any favorites, yet
        </Text>
      )}
      <FavoritesGrid favorites={userStore.favorites} />
    </FadeIn>
  );
});
