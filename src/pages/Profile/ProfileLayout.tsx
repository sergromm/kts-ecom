import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Text } from 'components/Text';
import { routerPaths } from 'config/routerPaths';
import userStore from 'store/user';
import styles from './Profile.module.scss';

const NavItem: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  return (
    <li>
      <NavLink className={styles.link} to={path}>
        <Text view="p-24">{title}</Text>
      </NavLink>
    </li>
  );
};

const profileRoutes = [
  {
    path: routerPaths.profile.root,
    title: 'Main',
  },
  {
    path: routerPaths.profile.me,
    title: 'Profile',
  },
  {
    path: routerPaths.profile.orders,
    title: 'Orders',
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
      <aside>
        <ul className={styles.links}>
          {profileRoutes.map((route) => (
            <NavItem key={route.path} {...route} />
          ))}
          <li>
            <button className={styles.logout} onClick={handleLogout}>
              <Text view="p-24">Logout</Text>
            </button>
          </li>
        </ul>
      </aside>
      <section className={styles.content}>
        <Text view="title" weight="bold">
          Welcome, {userStore.profile.firstName}!
        </Text>

        <Outlet />
      </section>
    </main>
  );
});
