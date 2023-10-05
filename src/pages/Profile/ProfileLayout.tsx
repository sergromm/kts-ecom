import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Text } from 'components/Text';
import { routerPaths } from 'config/routerPaths';
import userStore from 'store/user';
import styles from './Profile.module.scss';

const NavItem: React.FC<{ path: string; title: string }> = observer(({ path, title }) => {
  React.useEffect(() => {
    userStore.getFavorites();
  }, []);
  return (
    <li>
      <NavLink className={styles.link} to={path}>
        <Text className={styles.favorite} view="p-24">
          {title}{' '}
          {path === routerPaths.profile.favorites ? (
            userStore.favorites.length > 0 ? (
              <Text color="accent" tag="span" view="p-20">
                {userStore.favorites.length}
              </Text>
            ) : null
          ) : null}
        </Text>
      </NavLink>
    </li>
  );
});

const profileRoutes = [
  {
    path: routerPaths.profile.root,
    title: 'Main',
  },
  {
    path: routerPaths.profile.favorites,
    title: 'Favorites',
  },
];

export const ProfileLayout: React.FC = observer(() => {
  const handleLogout = React.useCallback(() => {
    runInAction(() => {
      userStore.logout(userStore.token!);
    });
  }, []);

  return (
    <main className={styles.main}>
      <ul className={styles.links}>
        {profileRoutes.map((route) => (
          <NavItem key={route.path} {...route} />
        ))}
        <li className={styles.bottom}>
          <button className={styles.logout} onClick={handleLogout}>
            <Text className={styles.text} view="p-24">
              Logout
            </Text>
          </button>
        </li>
      </ul>
      <Outlet />
    </main>
  );
});
