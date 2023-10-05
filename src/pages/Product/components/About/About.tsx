import * as React from 'react';
import { Button } from 'components/Button';
import { ProductType } from 'entities/protuct';
import { useCard } from 'hooks/useCard';
import cartStore from 'store/cart';
import { Description } from '../Description';
import * as Footer from '../Footer';
import styles from './About.module.scss';

export type AboutProps = {
  product: ProductType;
};

export const About: React.FC<AboutProps> = ({ product }) => {
  const [pending, setPending] = React.useState(false);
  const { add } = useCard(setPending);
  const inCart = cartStore.cart.some((p) => p.id === product.id);

  return (
    <div className={styles.about}>
      <Description description={product.description} title={product.title} />
      <Footer.Root>
        <Footer.Price>${product.price}</Footer.Price>
        <Footer.Buttons>
          <Button disabled={inCart} loading={pending} onClick={add(product)}>
            Add to cart
          </Button>
        </Footer.Buttons>
      </Footer.Root>
    </div>
  );
};
