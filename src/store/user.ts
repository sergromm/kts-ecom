import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'sonner';
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

type PrivateFields = '_token' | '_profile' | '_meta';
export type AuthBody = { email: string; password: string };
const defaultProfileState = { id: '', firstName: '', lastName: '', avatar: '', cartId: '' };
class UserStore implements ILocalStore {
  private _token: string = '';
  private _profile: Profile = defaultProfileState;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _token: observable,
      token: computed,

      _meta: observable,
      meta: computed,

      _profile: observable.shallow,
      profile: computed,

      signin: action,
      logout: action,
      getUserProfile: action,
    });
  }

  get token() {
    return this._token;
  }

  get profile() {
    return this._profile;
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
