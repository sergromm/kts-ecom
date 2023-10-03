import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'sonner';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';
import { Meta } from './utils';

type PrivateFields = '_cart' | '_cartId' | '_meta';
type CartItem = Omit<ProductType, 'description' | 'category'>;

class CartStore implements ILocalStore {
  private _cart: CartItem[] = [];
  private _cartId: string | null = '907d44d1-ff91-4621-a9a3-88622dc1ed32';
  private _meta: Meta = Meta.initial;
  private _discount: number = 0;
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

  get subtotal() {
    return this._cart.reduce((acc, product) => acc + product.price, 0);
  }

  get total() {
    return parseFloat((this.subtotal - this._discount).toFixed(2));
  }

  get discount() {
    return this._discount;
  }

  applyDiscount(amount: number) {
    this._discount = parseFloat((this.subtotal * (amount / 100)).toFixed(2));
  }

  get meta() {
    return this._meta;
  }

  set meta(value: Meta) {
    this._meta = value;
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

  add = async (product: ProductType, successAction?: () => void) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this.meta = Meta.loading;

    const body = {
      productId: product.id,
      cartId: this._cartId,
    };

    const options = {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
      },
    };

    try {
      await axios.post('https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1/products_in_cart', body, options);
      runInAction(() => {
        this.meta = Meta.success;
        toast(`${product.title} added to your cart`, {
          description: `Price: $${product.price}`,
          action: { label: 'checkout', onClick: successAction ? successAction : () => {} },
        });
      });
      this.fetch();
    } catch (error) {
      runInAction(() => {
        this.meta = Meta.error;
        toast.error('The product is already in your cart');
      });
    }
  };

  remove = async (productId: number) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this.meta = Meta.loading;

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
      this.meta = Meta.success;
      await this.fetch();
    } catch {
      this.meta = Meta.error;
    }
  };

  fetch = async () => {
    if (this._meta === Meta.loading) {
      return;
    }

    this.meta = Meta.loading;

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
        return;
      });
      this.meta = Meta.success;
    } else {
      this.meta = Meta.error;
    }
  };

  destroy(): void {}
}

export default new CartStore();
