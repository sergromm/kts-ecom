import { computed, makeObservable, observable, runInAction } from 'mobx';
import { API } from 'api/products';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';

interface IProductsStore {
  getProducts: () => void;
}

type PrivateFields = '_products';

export class ProductsStore implements IProductsStore, ILocalStore {
  private _products: ProductType[] = [];

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,
    });
  }

  get products() {
    return this._products;
  }

  async getProducts() {
    const response = await API.getProducts();

    runInAction(() => {
      if (response) {
        this._products = response;
        return;
      }
    });

    return 'error';
  }

  destroy(): void {
    return;
  }
}
