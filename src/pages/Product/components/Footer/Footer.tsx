import * as React from 'react';
import { Text } from 'components/Text';
import styles from './Footer.module.scss';

export type FooterProps = {
  prop?: string;
};

export const Price: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Text tag="span" view="title" weight="bold">
      {children}
    </Text>
  );
};

export const Buttons: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.buttons}>{children}</div>;
};

export const Footer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};
