import * as React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Text } from 'components/Text';
import { routerPaths } from 'config/routerPaths';
import styles from './Auth.module.scss';

const Navigation: React.FC<React.PropsWithChildren<{ to: string }>> = ({ to, children }) => {
  const { pathname } = useLocation();

  return (
    <NavLink className={styles.link} to={to}>
      <Text color={pathname === to ? 'primary' : 'secondary'} view="h-32" weight="bold">
        {children}
      </Text>
    </NavLink>
  );
};

export const NavigationLinks: React.FC = () => {
  return (
    <div className={styles.links}>
      <Navigation to={routerPaths.signup}>Sign up</Navigation>
      <Text view="h-32" weight="bold">
        /
      </Text>
      <Navigation to={routerPaths.signin}>Sign in</Navigation>
    </div>
  );
};
