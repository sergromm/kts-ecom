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
        <Text view="p-18">{id}</Text>
      </td>
      <td>
        <Text maxLines={1} view="p-18">
          {products}
        </Text>
      </td>
      <td>
        <Text view="p-18">{date}</Text>
      </td>
      <td>
        <Text view="p-18">{new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(total)}</Text>
      </td>
      <td>
        <Text className={styles.status} color="accent" view="p-18">
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
        <th style={{ width: 100 }}>
          <Text view="p-20" weight="medium">
            Number
          </Text>
        </th>
        <th style={{ width: 300 }}>
          <Text view="p-20" weight="medium">
            Order
          </Text>
        </th>
        <th style={{ width: 100 }}>
          <Text view="p-20" weight="medium">
            Date
          </Text>
        </th>
        <th style={{ width: 100 }}>
          <Text view="p-20" weight="medium">
            Total
          </Text>
        </th>
        <th style={{ width: 100 }}>
          <Text view="p-20" weight="medium">
            Status
          </Text>
        </th>
      </tr>
      {rows.map((row) => (
        <Row key={row.id} {...row} />
      ))}
    </table>
  );
};
