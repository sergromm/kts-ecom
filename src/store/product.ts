import { computed, makeObservable, observable, runInAction, action } from 'mobx';
import { ProductType } from 'entities/protuct';
import { ProductsApiStore } from './productsApi';
import { ILocalStore } from './types';
import { Meta } from './utils';

interface IProductStore {
  getProduct: (id: string) => void;
}

type PrivateFields = '_product' | '_meta' | '_related';

export class ProductStore implements IProductStore, ILocalStore {
  private _product: ProductType | undefined;
  private _meta: Meta = Meta.initial;
  private _related: ProductType[] = [];
  private api: ProductsApiStore = new ProductsApiStore();

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      product: computed,

      _meta: observable,
      meta: computed,

      _related: observable.ref,
      related: computed,

      getProduct: action,
      getRelated: action,
    });
  }

  get product() {
    return this._product;
  }

  get meta() {
    return this._meta;
  }

  get related() {
    return this._related;
  }

  getProduct = async (id: string) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const product = await this.api.getOne(Number(id));

    if (product) {
      runInAction(() => {
        this._meta = Meta.success;
        this._product = product;
        return;
      });
    } else {
      this._meta = Meta.error;
    }
  };

  getRelated = async (category: string) => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const offset = 2;

    const { products } = await this.api.getMany({ filters: category, from: 0, to: offset });

    if (products) {
      runInAction(() => {
        this._meta = Meta.success;
        this._related = products;
        return;
      });
    } else {
      this._meta = Meta.error;
    }
  };

  destroy(): void {
    return;
  }
}
