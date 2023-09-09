import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { API, ProductType } from 'api/products';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { Icon } from 'components/icons/Icon';
import styles from './Product.module.scss';
const Slider = React.lazy(() => import('./components/Slider'));

const useProduct = (id: number) => {
  const [data, setData] = React.useState<ProductType>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    let ignore = false;
    API.getProduct(id)
      .then((product) => {
        setLoading(true);
        if (!ignore) {
          setData(product.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);
  return { data, loading };
};

const Back = () => {
  return (
    <Link className={styles.back} to="/">
      <Icon height={32} width={32}>
        <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
        </svg>
      </Icon>
      <Text view="p-20">Back</Text>
    </Link>
  );
};

const About = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.about}>
      <div className={styles.description}>
        <Text tag="h1" view="title" weight="bold">
          White Aesthetic Chair
        </Text>
        <Text color="secondary" tag="p" view="p-20">
          Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort
          and support
        </Text>
      </div>
      <div className={styles.footer}>
        {children}
        <div className={styles.buttons}>
          <Button>Buy Now</Button>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

const Related = ({ children }: React.PropsWithChildren) => {
  return (
    <section className={styles.related}>
      <Text className={styles.related__title} tag="h2" view="title" weight="bold">
        Related Items
      </Text>
      <div className={styles.cards}>{children}</div>
    </section>
  );
};

export function Product() {
  const { productId } = useParams();
  const { data } = useProduct(Number(productId));
  return (
    <main className={styles.main}>
      <section className={styles.product}>
        <Back />
        <div className={styles.product__container}>
          <React.Suspense fallback={<h1>Loading...</h1>}>
            {data && <Slider description={data.description} images={data.images} />}
          </React.Suspense>
          <About>
            <Text tag="span" view="title" weight="bold">
              ${data?.price}
            </Text>
          </About>
        </div>
      </section>
      <Related>
        {data && (
          <>
            <Card image={data?.images[0]} subtitle={data.description} title={data.title} />
            <Card image={data?.images[0]} subtitle={data.description} title={data.title} />
            <Card image={data?.images[0]} subtitle={data.description} title={data.title} />
          </>
        )}
      </Related>
    </main>
  );
}
