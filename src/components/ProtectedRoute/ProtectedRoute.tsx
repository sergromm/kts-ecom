import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { routerPaths } from 'config/routerPaths';
import userStore from 'store/user';

type RouterKeys = keyof typeof routerPaths;
type ProtectedRouteProps = { redirect: (typeof routerPaths)[RouterKeys] };

export const ProtectedRoute: React.FC<React.PropsWithChildren<ProtectedRouteProps>> = observer(
  ({ redirect, children }) => {
    if (!userStore.profile.id) {
      return <Navigate to={redirect} />;
    }

    return children;
  },
);
