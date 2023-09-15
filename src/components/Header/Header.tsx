import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/logo.svg';
import { Text } from 'components/Text';
import { Icon } from 'components/icons/Icon';
import styles from './Header.module.scss';

const Navigation: React.FC = () => {
  const nav = [
    { link: '/', title: 'Products' },
    { link: '/categories', title: 'Categories' },
    { link: '/about', title: 'About us' },
  ];
  const { pathname } = useLocation();

  return (
    <ul className={styles.menu}>
      {nav.map((item) => {
        const classes = classNames(styles.page, { [styles.page_active]: pathname === item.link });
        return (
          <li key={item.title}>
            <Link className={styles.link} to={item.link}>
              <Text className={classes} view="p-18">
                {item.title}
              </Text>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/">
          <img alt="logo" src={Logo} />
        </Link>
        <Navigation />
        <div className={styles.buttons}>
          <button className={styles.button}>
            <Icon height={30} width={30}>
              <svg fill="none" height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.375 9.58751V8.37501C9.375 5.56251 11.6375 2.80001 14.45 2.53751C17.8 2.21251 20.625 4.85001 20.625 8.13751V9.86251"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.25 27.5H18.75C23.775 27.5 24.675 25.4875 24.9375 23.0375L25.875 15.5375C26.2125 12.4875 25.3375 10 20 10H10C4.66253 10 3.78753 12.4875 4.12503 15.5375L5.06253 23.0375C5.32503 25.4875 6.22503 27.5 11.25 27.5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M19.3694 15H19.3806"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.6181 15H10.6294"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </Icon>
          </button>
          <button className={styles.button}>
            <Icon height={30} width={30}>
              <svg fill="none" height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M25.7374 27.5C25.7374 22.6625 20.9249 18.75 14.9999 18.75C9.07495 18.75 4.26245 22.6625 4.26245 27.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </Icon>
          </button>
        </div>
      </div>
    </header>
  );
}
