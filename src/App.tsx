import * as React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Button } from 'components/Button';
import { Cart } from 'components/Cart';
import { Header } from 'components/Header';
import { routerPaths } from 'config/routerPaths';
import { useQueryParamsStoreInit } from 'hooks/useQueryParamsStoreInit';
import { Product } from 'pages/Product';
import { Products } from 'pages/Products';
import { ProductModal } from 'pages/Products/components/ProductModal';

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useQueryParamsStoreInit();

  return (
    <>
      <Header handleOpenModal={() => setOpen(true)} />
      <Cart handleClose={() => setOpen(false)} open={open} />
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<Products />} path={routerPaths.root} />
        <Route path={routerPaths.products}>
          <Route element={<Product />} path={routerPaths.productId} />
        </Route>
        <Route element={<Button>hi</Button>} path={routerPaths.about} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route element={<ProductModal />} path={`${routerPaths.products}/${routerPaths.productId}`} />
        </Routes>
      )}
    </>
  );
};

export default React.memo(App);
