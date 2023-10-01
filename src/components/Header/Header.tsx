import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from 'assets/logo.svg';
import { Text } from 'components/Text';
import { CartIcon } from 'components/icons/CartIcon';
import { ProfileIcon } from 'components/icons/ProfileIcon';
import { routerPaths } from 'config/routerPaths';
import cartStore from 'store/cart';
import styles from './Header.module.scss';

const Navigation: React.FC = () => {
  const nav = [
    { link: routerPaths.root, title: 'Products' },
    { link: routerPaths.categories, title: 'Categories' },
    { link: routerPaths.about, title: 'About us' },
  ];
  const { pathname } = useLocation();

  return (
    <ul className={styles.menu}>
      {nav.map((item) => {
        const classes = classNames(styles.page, { [styles.page_active]: pathname === item.link });
        return (
          <li key={item.title}>
            <NavLink className={styles.link} to={item.link}>
              <Text className={classes} view="p-18">
                {item.title}
              </Text>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

type HeaderProps = {
  handleOpenModal: () => void;
};

export const Header: React.FC<HeaderProps> = observer(({ handleOpenModal }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <Navigation />
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleOpenModal}>
            <CartIcon height={30} width={30} />
            <AnimatePresence>
              {cartStore.count > 0 && (
                <motion.div
                  animate={{ scale: 1 }}
                  className={styles.indicator}
                  exit={{ scale: 0 }}
                  initial={{ scale: 0 }}
                >
                  <motion.div
                    animate={{ opacity: 0, scale: 1 }}
                    className={styles.glow}
                    initial={{ opacity: 1, scale: 1.5 }}
                    transition={{
                      type: 'tween',
                      duration: 0.4,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button className={styles.button}>
            <ProfileIcon height={30} width={30} />
          </button>
        </div>
      </div>
    </header>
  );
});
