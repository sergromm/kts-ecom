import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { API, Product } from 'api/products';
// import { Slider } from './components/Slider';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { Icon } from 'components/icons/Icon';
import styles from './Product.module.scss';
const Slider = React.lazy(() => import('./components/Slider'));

const useProduct = (id: number) => {
  const [data, setData] = React.useState<Product>();
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

export function ProductPage() {
  const { productId } = useParams();
  const { data } = useProduct(Number(productId));
  return (
    <main className={styles.main}>
      <section className={styles.product}>
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
        <div className={styles.product__container}>
          <React.Suspense fallback={<h1>Loading...</h1>}>
            {data && (
              <Slider
                description={data.description}
                images={[
                  ...data.images,
                  'https://images.unsplash.com/photo-1688377051459-aebb99b42bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
                ]}
              />
            )}
          </React.Suspense>
          <div className={styles.about}>
            <div className={styles.description}>
              <Text tag="h1" view="title" weight="bold">
                White Aesthetic Chair
              </Text>
              <Text color="secondary" tag="p" view="p-20">
                Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day
                comfort and support
              </Text>
            </div>
            <div className={styles.footer}>
              <Text tag="span" view="title" weight="bold">
                ${data?.price}
              </Text>
              <div className={styles.buttons}>
                <Button>Buy Now</Button>
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.related}>
        <Text className={styles.related__title} tag="h2" view="title" weight="bold">
          Related Items
        </Text>
        <div className={styles.cards}>
          {data && (
            <>
              <Card image={data?.images[0]} subtitle={data.description} title={data.title} />
              <Card image={data?.images[0]} subtitle={data.description} title={data.title} />
              <Card image={data?.images[0]} subtitle={data.description} title={data.title} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
