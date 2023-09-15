import { AxiosResponse } from 'axios';
import * as React from 'react';
import { ProductType } from 'entities/protuct';

export const useFetch = (callback: () => Promise<AxiosResponse>) => {
  const [data, setData] = React.useState<ProductType>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({});

  React.useEffect(() => {
    let ignore = false;

    setLoading(true);
    callback()
      .then((product) => {
        if (!ignore && !error) {
          setData(product.data);
        }
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [callback, error]);

  return { data, loading, errorMessage, error };
};
