import { computed, makeObservable, observable, runInAction } from 'mobx';
import { API } from 'api/products';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';

interface IProductStore {
  getProduct: (id: string) => void;
}

type PrivateFields = '_product';

export class ProductStore implements IProductStore, ILocalStore {
  private _product!: ProductType;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      product: computed,
    });
  }

  get product() {
    return this._product;
  }

  async getProduct(id: string) {
    const response = await API.getProduct(Number(id));

    runInAction(() => {
      if (response) {
        this._product = response;
        return;
      }
    });

    return 'error';
  }

  destroy(): void {
    return;
  }
}
