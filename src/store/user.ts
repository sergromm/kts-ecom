import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'sonner';
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

  signup = async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(
      'https://rzknhedkzukvgtstzbxj.supabase.co/auth/v1/signup',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_PUBLIC_KEY,
        },
      },
    );

    return await response.data;
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
      toast.error("Couldn't loggin. Try again.");
    }
  };

  private getProfile = async (id: string) => {
    const response = await axios.get(`https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/profile?id.eq${id}&select=*`, {
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_PUBLIC_KEY,
      },
    });

    return await response.data;
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
      const user = await response.data;
      const [profile] = await this.getProfile(user.id);
      runInAction(() => {
        this._profile = profile;
        this._token = token;
        return;
      });
    } catch (error) {
      toast.error('Token expired. Signin again.');
      localStorage.removeItem('access_token');
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
      toast.error("Couldn't logout.");
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
