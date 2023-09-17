import { computed, makeObservable, observable, runInAction } from 'mobx';
import { API } from 'api/products';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';

interface IProductsStore {
  fetch: () => void;
  search: (query: string) => void;
  filter: (queries: string) => void;
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

  async fetch() {
    const response = await API.getProducts();

    runInAction(() => {
      if (response) {
        this._products = response;
        return;
      }
    });

    return 'error';
  }

  async search(query: string) {
    const response = await API.searchProducts(query);

    runInAction(() => {
      if (response) {
        this._products = response;
        return;
      }
    });

    return 'error';
  }

  async filter(queries: string) {
    const response = await API.filterProducts(queries);

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
