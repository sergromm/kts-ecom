import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FadeIn } from 'components/FadeIn';
import { Text } from 'components/Text';
import userStore from 'store/user';
import { OrdersTable } from './components/OrdersTable/OrdersTable';
import { Promocode } from './components/Promocode';
import styles from './Profile.module.scss';

export const Main: React.FC = observer(() => {
  return (
    <FadeIn className={styles.content} duration={0.3} shift={10} tag="section">
      <Text view="title" weight="bold">
        Welcome, {userStore.profile.firstName}!
      </Text>
      <Promocode />
      <div className={styles.orders}>
        <Text view="p-24" weight="medium">
          Recent orders
        </Text>
        <OrdersTable />
      </div>
    </FadeIn>
  );
});
