import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Back } from 'components/Back';
import { Button } from 'components/Button';
import { CartList, CartItem } from 'components/Cart';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import cartStore from 'store/cart';
import styles from './Checkout.module.scss';

export const Checkout: React.FC = observer(() => {
  const isEmpty = cartStore.count === 0;

  cartStore.applyDiscount(12);

  return (
    <main className={styles.main}>
      <Back />
      <section className={styles.content}>
        <form className={styles.form}>
          <fieldset className={styles.fieldset} disabled={isEmpty}>
            <Text view="p-20" weight="medium">
              City
            </Text>
            <Input name="city" placeholder="City" value="" onChange={() => {}} />
          </fieldset>
          <fieldset className={styles.fieldset} disabled={isEmpty}>
            <Text view="p-20" weight="medium">
              Address
            </Text>
            <Input name="address" placeholder="Address" value="" onChange={() => {}} />
          </fieldset>
          <fieldset className={styles.fieldset} disabled={isEmpty}>
            <Text view="p-20" weight="medium">
              Recipient’s details
            </Text>
            <div className={styles.details}>
              <label className={styles.label}>
                <Text>First name</Text>
                <Input name="firstName" placeholder="First name" value="" onChange={() => {}} />
              </label>
              <label className={styles.label}>
                <Text>Last name</Text>
                <Input name="lastName" placeholder="Last name" value="" onChange={() => {}} />
              </label>
              <label className={styles.label}>
                <Text>Phone</Text>
                <Input name="phone" placeholder="Phone" value="" onChange={() => {}} />
              </label>
              <label className={styles.label}>
                <Text>E-mail</Text>
                <Input name="email" placeholder="E-mail" value="" onChange={() => {}} />
              </label>
            </div>
          </fieldset>
          <Button disabled={isEmpty}>Checkout</Button>
        </form>
        {isEmpty || (
          <div className={styles.list}>
            <CartList>
              {cartStore.cart.map((product) => {
                return <CartItem key={product.id} product={product} />;
              })}
            </CartList>
            <div className={styles.footer}>
              <Text className={styles.text}>
                Subtotal:&nbsp;
                <Text tag="span" view="p-18">
                  ${cartStore.subtotal}
                </Text>
              </Text>
              <Text className={styles.text}>
                Discount:&nbsp;
                <Text tag="span" view="p-18">
                  ${cartStore.discount}
                </Text>
              </Text>
              <Text className={styles.text} view="p-24" weight="medium">
                Total:&nbsp;
                <Text tag="span" view="p-24" weight="medium">
                  ${cartStore.total}
                </Text>
              </Text>
            </div>
          </div>
        )}
      </section>
    </main>
  );
});
