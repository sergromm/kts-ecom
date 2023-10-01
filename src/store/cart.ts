import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';
import { Meta } from './utils';

type PrivateFields = '_cart' | '_cartId' | '_meta';
type CartItem = Omit<ProductType, 'description' | 'category'>;

class CartStore implements ILocalStore {
  private _cart: CartItem[] = [];
  private _cartId: string | null = '907d44d1-ff91-4621-a9a3-88622dc1ed32';
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cart: observable.ref,
      cart: computed,

      _meta: observable,
      meta: computed,

      _cartId: observable,
      cartId: computed,

      add: action,
      fetch: action,
      create: action,
      remove: action,
    });
  }

  get cart() {
    return this._cart;
  }

  get cartId() {
    return this._cartId;
  }

  get count() {
    return this._cart.length;
  }

  get total() {
    return this._cart.reduce((acc, product) => acc + product.price, 0);
  }

  get meta() {
    return this._meta;
  }

  create = async (id: string) => {
    if (id) {
      this._cartId = id;
      return;
    }

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
      },
    };

    const cartId = await axios.post('https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/carts', options);

    this._cartId = cartId.data;

    return;
  };

  add = (productId: number) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const body = {
      productId,
      cartId: this._cartId,
    };

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
      },
    };

    try {
      axios.post('https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/products_in_cart', body, options);
      this._meta = Meta.success;
      this.fetch();
    } catch {
      this._meta = Meta.error;
    }
  };

  remove = async (productId: number) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
      },
      params: {
        productId: `eq.${productId}`,
        cartId: `eq.${this._cartId}`,
      },
    };

    try {
      await axios.delete('https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/products_in_cart', options);
      this._meta = Meta.success;
      await this.fetch();
    } catch {
      this._meta = Meta.error;
    }
  };

  fetch = async () => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
      },
      params: {
        select: 'id,products(id, title, price, images)',
        id: `eq.${this._cartId}`,
      },
    };

    const cartItems = await axios.get<{ id: string; products: CartItem[] }[]>(
      'https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/carts',
      options,
    );
    if (cartItems) {
      runInAction(() => {
        this._cart = cartItems.data[0].products;
        this._meta = Meta.success;
        return;
      });
    } else {
      this._meta = Meta.error;
    }
  };

  destroy(): void {}
}

export default new CartStore();
