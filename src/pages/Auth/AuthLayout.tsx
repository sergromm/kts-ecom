import { motion } from 'framer-motion';
import * as React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import vidoe from 'assets/a8798f8d21b54ecbaac541576ca06bef.mp4';
import image from 'assets/hero-image-placeholder.jpg';
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

export const AuthLayout: React.FC = () => {
  return (
    <main className={styles.main}>
      <motion.form animate={{ opacity: 1 }} className={styles.form} initial={{ opacity: 0 }}>
        <div className={styles.links}>
          <Navigation to={routerPaths.signup}>Sign up</Navigation>
          <Text view="h-32" weight="bold">
            /
          </Text>
          <Navigation to={routerPaths.signin}>Sign in</Navigation>
        </div>
        <Outlet />
      </motion.form>
      <video className={styles.video} placeholder={image} poster={image} src={vidoe} autoPlay loop muted></video>
    </main>
  );
};
