import * as React from 'react';
import { Button } from 'components/Button';
import { ProductType } from 'entities/protuct';
import { useCart } from 'hooks/useCart';
import { Description } from '../Description';
import * as Footer from '../Footer';
import styles from './About.module.scss';

export type AboutProps = {
  product: ProductType;
};

export const About: React.FC<AboutProps> = ({ product }) => {
  const [pending, setPending] = React.useState(false);
  const { add } = useCart(setPending);

  return (
    <div className={styles.about}>
      <Description description={product.description} title={product.title} />
      <Footer.Root>
        <Footer.Price>${product.price}</Footer.Price>
        <Footer.Buttons>
          <Button loading={pending} onClick={add(product)}>
            Add to cart
          </Button>
        </Footer.Buttons>
      </Footer.Root>
    </div>
  );
};
