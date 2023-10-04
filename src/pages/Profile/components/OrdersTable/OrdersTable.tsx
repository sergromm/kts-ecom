import * as React from 'react';

import { Text } from 'components/Text';
import styles from './OrdersTable.styles.module.scss';

type RowProps = {
  id: number;
  products: string;
  date: string;
  total: number;
  status: 'paid' | 'delivered';
};

const Row: React.FC<RowProps> = ({ id, products, date, total, status }) => {
  return (
    <tr>
      <td>
        <Text>{id}</Text>
      </td>
      <td>
        <Text>{products}</Text>
      </td>
      <td>
        <Text>{date}</Text>
      </td>
      <td>
        <Text>{new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(total)}</Text>
      </td>
      <td>
        <Text className={styles.status} color="accent">
          {status}
        </Text>
      </td>
    </tr>
  );
};

const rows: RowProps[] = [
  {
    id: 849234,
    products: 'Plant With Clay Stand, Wooden Cupboard 3 Row , White Aesthetic Chair',
    date: '20.09.2022',
    total: 22_500,
    status: 'paid',
  },
  {
    id: 835012,
    products: 'Oval Gold Mirror, Working Desk Setup',
    date: '03.11.2021',
    total: 15_000,
    status: 'delivered',
  },
];

export const OrdersTable: React.FC = () => {
  return (
    <table className={styles.table}>
      <tr className={styles.header}>
        <th style={{ width: 100 }}>Number</th>
        <th>
          <Text>Order</Text>
        </th>
        <th>
          <Text>Date</Text>
        </th>
        <th>
          <Text>Total</Text>
        </th>
        <th>
          <Text>Status</Text>
        </th>
      </tr>
      {rows.map((row) => (
        <Row key={row.id} {...row} />
      ))}
    </table>
  );
};
