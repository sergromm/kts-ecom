import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import vidoe from 'assets/a8798f8d21b54ecbaac541576ca06bef.mp4';
import image from 'assets/hero-image-placeholder.jpg';
import { FadeIn } from 'components/FadeIn';
import { routerPaths } from 'config/routerPaths';
import userStore from 'store/user';
import { NavigationLinks } from './NavigationLinks';
import styles from './Auth.module.scss';

export const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleLogin = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        await userStore.getUserProfile(token);
        navigate(routerPaths.profile);
      }
    };

    handleLogin();
  }, [navigate]);

  return (
    <FadeIn className={styles.main}>
      <div className={styles.container}>
        <NavigationLinks />
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </div>
      <video className={styles.video} placeholder={image} poster={image} src={vidoe} autoPlay loop muted></video>
    </FadeIn>
  );
};
