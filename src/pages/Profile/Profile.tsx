import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'components/Text';
import cartStore from 'store/cart';
import userStore from 'store/user';

export const Profile: React.FC = observer(() => {
  return (
    <main>
      <Text view="title">Welcome, {userStore.profile.firstName}!</Text>
      <aside>
        <ul>
          <li>
            <Link to="/profile">Main</Link>
          </li>
          <li>
            <Link to="/profile/me">Profile</Link>
          </li>
          <li>
            <Link to="/profile/history">History</Link>
          </li>
          <li>
            <Link to="/profile/favorites">Favorites</Link>
          </li>
          <li>
            <button
              onClick={() => {
                runInAction(() => {
                  userStore.logout(userStore.token!);
                  cartStore.cartId = '';
                  console.log(cartStore.cartId);
                });
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </main>
  );
});
