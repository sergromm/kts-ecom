import { Link } from 'react-router-dom';
import { Text } from 'components/Text';
import { Icon } from 'components/icons/Icon';
import styles from './Back.module.scss';

export function Back() {
  return (
    <Link className={styles.back} to="/">
      <Icon height={32} width={32}>
        <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
        </svg>
      </Icon>
      <Text view="p-20">Back</Text>
    </Link>
  );
}
