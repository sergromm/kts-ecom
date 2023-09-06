import * as React from 'react';
import { Product } from 'api/products';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Input } from 'components/Input';
import { MultiDropdown } from 'components/MultiDropdown';
import { Text } from 'components/Text';
import styles from './Main.module.scss';

type MainProps = {
  products: Product[];
};

export function Main({ products }: MainProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <main className={styles.main}>
      <section className={styles.text__container}>
        <Text tag="h1" view="title" weight="bold">
          Products
        </Text>
        <Text color="secondary" tag="p" view="p-20">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </section>

      <section className={styles.catalogue}>
        <div className={styles.search}>
          <Input value={searchQuery} onChange={setSearchQuery} />
          <Button>Find Now</Button>
          <MultiDropdown
            className={styles.filter}
            getTitle={() => ''}
            options={[{ key: 'a', value: 'a' }]}
            value={[]}
            onChange={() => {}}
          ></MultiDropdown>
        </div>

        <div className={styles.products}>
          <Text className={styles.total} view="title" weight="bold">
            Total Producst{' '}
            <Text color="accent" tag="span" view="p-20" weight="bold">
              {products.length}
            </Text>
          </Text>

          <div className={styles.cards}>
            {products.map((product) => {
              return (
                <Card
                  actionSlot={<Button>Add to Cart</Button>}
                  captionSlot={product.category.name}
                  contentSlot={`$${product.price}`}
                  image={product.images[0]}
                  key={product.id}
                  subtitle={product.description}
                  title={product.title}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
