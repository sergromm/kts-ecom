import * as React from 'react';

import cartStore from 'store/cart';

export const cartContext = React.createContext({
  cartStore,
});
