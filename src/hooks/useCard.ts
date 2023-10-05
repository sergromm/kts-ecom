import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'config/routerPaths';
import { ProductType } from 'entities/protuct';
import cartStore from 'store/cart';
import userStore from 'store/user';

export const useCard = (setPending: React.Dispatch<React.SetStateAction<boolean>>) => {
  const navigate = useNavigate();

  const toCheckout = React.useCallback(() => {
    navigate(routerPaths.checkout);
  }, [navigate]);

  const wrapper = React.useCallback(
    (callback: (...args: unknown[]) => Promise<void>) => async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setPending(true);
      await callback();
      setPending(false);
    },
    [setPending],
  );

  const add = React.useCallback(
    (product: ProductType) => (event: React.MouseEvent) => {
      wrapper(() => cartStore.add(product, toCheckout))(event);
    },
    [toCheckout, wrapper],
  );

  const remove = React.useCallback(
    (id: number) => (event: React.MouseEvent) => {
      wrapper(() => cartStore.remove(id))(event);
    },
    [wrapper],
  );

  const favorite = React.useCallback(
    (product: ProductType) => (event: React.MouseEvent) => {
      wrapper(() => userStore.favorite(product))(event);
    },
    [wrapper],
  );

  const removeFromFavorites = React.useCallback(
    (id: number) => (event: React.MouseEvent) => {
      wrapper(() => userStore.removeFromFavorites(id))(event);
    },
    [wrapper],
  );

  return { add, remove, favorite, removeFromFavorites };
};
