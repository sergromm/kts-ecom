import { Text } from 'components/Text';
import styles from './Hero.module.scss';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Text tag="h1" view="title" weight="bold">
        Products
      </Text>
      <Text color="secondary" tag="p" view="p-20">
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
    </section>
  );
};
