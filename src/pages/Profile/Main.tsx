import { OrdersTable } from './components/OrdersTable/OrdersTable';
import { Promocode } from './components/Promocode';
import styles from './Profile.module.scss';

export const Main = () => {
  return (
    <section className={styles.root}>
      <Promocode />
      <OrdersTable />
    </section>
  );
};
