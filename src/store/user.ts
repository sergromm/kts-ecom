import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'sonner';
import { ProductType } from 'entities/protuct';
import { getAxiosError } from 'utils/getAxiosError';
import { ILocalStore } from './types';
import { Meta } from './utils';

type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  cartId: string;
};

type PrivateFields = '_token' | '_profile' | '_meta' | '_favorites';
export type AuthBody = { email: string; password: string };
const defaultProfileState = { id: '', firstName: '', lastName: '', avatar: '', cartId: '' };
class UserStore implements ILocalStore {
  private _token: string = '';
  private _favorites: ProductType[] = [];
  private _profile: Profile = defaultProfileState;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _token: observable,
      token: computed,

      _favorites: observable.ref,
      favorites: computed,

      _meta: observable,
      meta: computed,

      _profile: observable.shallow,
      profile: computed,

      signin: action,
      logout: action,
      getUserProfile: action,
      getFavorites: action,
      favorite: action,
      removeFromFavorites: action,
    });
  }

  get token() {
    return this._token;
  }

  get profile() {
    return this._profile;
  }

  get favorites() {
    return this._favorites;
  }

  get meta() {
    return this._meta;
  }

  signup = async ({
    email,
    password,
    data,
  }: {
    email: string;
    password: string;
    data: { firstName: string; lastName: string; avatar: string; cartId: string };
  }) => {
    try {
      await axios.post(
        'https://rzknhedkzukvgtstzbxj.supabase.co/auth/v1/signup',
        { email, password, data },
        {
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.SUPABASE_PUBLIC_KEY,
          },
        },
      );

      await this.signin({ email, password });
    } catch (error) {
      const message = getAxiosError(error);
      toast.error(message);
    }
  };

  signin = async (body: AuthBody) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_PUBLIC_KEY,
      },
      params: {
        grant_type: 'password',
      },
    };

    try {
      const response = await axios.post('https://rzknhedkzukvgtstzbxj.supabase.co/auth/v1/token', body, options);

      const user = await response.data;

      await this.getUserProfile(user.access_token);

      localStorage.setItem('access_token', user.access_token);
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });

      const message = getAxiosError(error);
      toast.error(message);
    }
  };

  getUserProfile = async (token: string) => {
    try {
      const response = await axios.get('https://rzknhedkzukvgtstzbxj.supabase.co/auth/v1/user', {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_PUBLIC_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      const { id, user_metadata } = await response.data;

      runInAction(() => {
        this._profile = { id, ...user_metadata };
        this._token = token;
        return;
      });
    } catch (error) {
      const message = getAxiosError(error);
      toast.error(message);
      localStorage.removeItem('access_token');
      localStorage.removeItem('cartId');
    }
  };

  favorite = async (product: ProductType) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const body = {
      userId: this._profile.id,
      productId: product.id,
    };

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
        Authorization: `Bearer ${this._token}`,
      },
    };

    try {
      await axios.post('https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/user_favorites', body, options);
      runInAction(() => {
        this._meta = Meta.success;
        this.getFavorites();
        toast(`${product.title} added to your favorites`);
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
        toast.error("Couldn't add to favorites");
      });
    }
  };

  removeFromFavorites = async (productId: number) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
        Authorization: `Bearer ${this._token}`,
      },
      params: {
        productId: `eq.${productId}`,
        userId: `eq.${this._profile.id}`,
      },
    };

    try {
      await axios.delete('https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/user_favorites', options);
      runInAction(() => {
        this._meta = Meta.success;
        this.getFavorites();
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
        toast.error("Couldn't remove from favorites");
      });
    }
  };

  getFavorites = async () => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
        Authorization: `Bearer ${this._token}`,
      },
      params: {
        select: 'product:products(*,category:categories!inner(name))',
        userId: `eq.${this._profile.id}`,
      },
    };

    const favorites = await axios.get<{ product: ProductType }[]>(
      'https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/user_favorites',
      options,
    );
    if (favorites) {
      runInAction(() => {
        this._favorites = favorites.data.map((favorite) => favorite.product);
        return;
      });
      this._meta = Meta.success;
    } else {
      this._meta = Meta.error;
    }
  };

  logout = async (token: string) => {
    try {
      await axios.post('https://rzknhedkzukvgtstzbxj.supabase.co/auth/v1/logout', null, {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_PUBLIC_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('cartId');
    } catch (error) {
      const message = getAxiosError(error);
      toast.error(message);
    }

    runInAction(() => {
      this._profile = defaultProfileState;
    });

    return;
  };

  destroy(): void {
    return;
  }
}

export default new UserStore();
