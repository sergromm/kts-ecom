import * as React from 'react';
import { ProductsStore } from 'store/products';

export const ProductStoreContext = React.createContext<ProductsStore | null>(null);

export const useProductStore = () => {
  const context = React.useContext(ProductStoreContext);
  return context;
};
