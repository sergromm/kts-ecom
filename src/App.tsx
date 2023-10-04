import { action } from 'mobx';
import * as React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Button } from 'components/Button';
import { Cart } from 'components/Cart';
import { Header } from 'components/Header';
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute';
import { routerPaths } from 'config/routerPaths';
import { useQueryParamsStoreInit } from 'hooks/useQueryParamsStoreInit';
import { AuthLayout, SignIn, SignUp } from 'pages/Auth';
import { Categories } from 'pages/Categories';
import { Checkout } from 'pages/Checkout';
import { Product } from 'pages/Product';
import { Products } from 'pages/Products';
import { ProductModal } from 'pages/Products/components/ProductModal';
import { Favorites, Main, Orders, ProfileLayout } from 'pages/Profile';
import cartStore from 'store/cart';
import userStore from 'store/user';

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  React.useEffect(() => {
    const handleLogin = action(async () => {
      const token = localStorage.getItem('access_token');

      if (token) {
        await userStore.getUserProfile(token);
      }
      cartStore.fetch();
    });

    handleLogin();
  }, []);

  useQueryParamsStoreInit();

  return (
    <>
      <Header handleOpenModal={() => setOpen(true)} />
      <Cart handleClose={() => setOpen(false)} open={open} />
      <Toaster position="bottom-center" richColors />
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<Products />} path={routerPaths.root} />
        <Route path={routerPaths.products}>
          <Route element={<Product />} path={routerPaths.productId} />
        </Route>
        <Route element={<Categories />} path={routerPaths.categories} />
        <Route element={<Checkout />} path={routerPaths.checkout} />
        <Route element={<Button>hi</Button>} path={routerPaths.about} />
        <Route
          element={
            <ProtectedRoute redirect={routerPaths.signin}>
              <ProfileLayout />
            </ProtectedRoute>
          }
        >
          <Route element={<Main />} path={routerPaths.profile.root} />
          <Route element={<Orders />} path={routerPaths.profile.orders} />
          <Route element={<Favorites />} path={routerPaths.profile.favorites} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<SignUp />} path={routerPaths.signup} />
          <Route element={<SignIn />} path={routerPaths.signin} />
        </Route>
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
