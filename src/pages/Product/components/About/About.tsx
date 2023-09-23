import * as React from 'react';
import { Button } from 'components/Button';
import { ProductType } from 'entities/protuct';
import { Description } from '../Description';
import * as Footer from '../Footer';
import styles from './About.module.scss';

export type AboutProps = {
  product: ProductType;
};

export const About: React.FC<AboutProps> = ({ product }) => {
  return (
    <div className={styles.about}>
      <Description description={product.description} title={product.title} />
      {/* NOTE(@sergromm): maybe i should compose components **hmmm** */}
      <Footer.Root>
        <Footer.Price>${product.price}</Footer.Price>
        <Footer.Buttons>
          <Button>Buy now</Button>
          <Button>Add to cart</Button>
        </Footer.Buttons>
      </Footer.Root>
    </div>
  );
};
