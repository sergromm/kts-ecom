import { computed, makeObservable, observable, runInAction } from 'mobx';
import { API } from 'api/products';
import { CategoryType } from 'entities/category';
import { ILocalStore } from './types';

interface ICategoriesStore {
  getCategories: () => void;
}

type PrivateFields = '_categories';

export class CategoriesStore implements ICategoriesStore, ILocalStore {
  private _categories: CategoryType[] = [];

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      categories: computed,
    });
  }

  get categories() {
    return this._categories;
  }

  getOptions() {
    return this._categories.map((category) => ({ key: category.name.toLowerCase(), value: category.name }));
  }

  async getCategories() {
    const response = await API.getCategories();

    runInAction(() => {
      if (response) {
        this._categories = response;
        return;
      }
    });

    return 'error';
  }

  destroy(): void {
    return;
  }
}
