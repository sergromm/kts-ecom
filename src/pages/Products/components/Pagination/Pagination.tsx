import classNames from 'classnames';
import * as React from 'react';
import { Text } from 'components/Text';
import { Icon } from 'components/icons/Icon';
import { usePagination } from 'hooks/usePagination';
import styles from './Pagination.module.scss';

export const Pagination: React.FC = () => {
  const { paginate, next, previous, active, setPage } = usePagination({ total: Math.ceil(30 / 9) });
  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={() => previous()}>
        <Icon height={31} width={31}>
          <svg fill="none" height="31" viewBox="0 0 31 31" width="31" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            />
          </svg>
        </Icon>
      </button>
      <ul className={styles.list}>
        {paginate().map((page, index) => {
          const classes = classNames(styles.item__button, { [styles.item__button_active]: active === page });
          const textColor = classNames({ seconadry: active === page }) as 'accent';
          return (
            <li className={styles.item} key={index}>
              {typeof page === 'string' ? (
                <div className={styles.item__button}>
                  <Text color={textColor}>{page}</Text>
                </div>
              ) : (
                <button className={classes} onClick={() => setPage(page)}>
                  <Text color={textColor}>{page}</Text>
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <button className={styles.button} onClick={() => next()}>
        <Icon height={31} width={31}>
          <svg fill="none" height="31" viewBox="0 0 31 31" width="31" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            />
          </svg>
        </Icon>
      </button>
    </div>
  );
};
