import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { routerPaths } from 'config/routerPaths';
import userStore from 'store/user';

type RouterKeys = keyof Omit<typeof routerPaths, 'profile'>;
type ProfileKeys = keyof (typeof routerPaths)['profile'];
type RouterPaths = Omit<typeof routerPaths, 'profile'>;
type ProfilePaths = (typeof routerPaths)['profile'];
type ProtectedRouteProps = {
  redirect: RouterPaths[RouterKeys] | ProfilePaths[ProfileKeys];
};

export const ProtectedRoute: React.FC<React.PropsWithChildren<ProtectedRouteProps>> = observer(
  ({ redirect, children }) => {
    if (!userStore.profile.id) {
      return <Navigate to={redirect} />;
    }

    return children;
  },
);
