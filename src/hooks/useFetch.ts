import { AxiosResponse } from 'axios';
import * as React from 'react';
import { ProductType } from 'api/products';

export const useFetch = (callback: () => Promise<AxiosResponse>) => {
  const [data, setData] = React.useState<ProductType>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;

    callback()
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
  }, [callback]);

  return { data, loading };
};
