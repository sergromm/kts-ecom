import { computed, makeObservable, observable, runInAction } from 'mobx';
import { productsAPI } from 'api/products';
import { Option } from 'components/MultiDropdown';
import { CategoryType } from 'entities/category';
import { ILocalStore } from './types';

interface ICategoriesStore {
  getCategories: () => void;
}

type PrivateFields = '_categories' | '_options';

export class CategoriesStore implements ICategoriesStore, ILocalStore {
  private _categories: CategoryType[] = [];
  private _options: Option[] = [];
  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      categories: computed,
      _options: observable.ref,
      options: computed,
    });
  }

  get categories() {
    return this._categories;
  }

  get options() {
    return this._options;
  }

  setOptions() {}

  async getCategories() {
    const response = await productsAPI.getCategories();

    runInAction(() => {
      if (response) {
        this._categories = response;
        this._options = this._categories.map((category) => ({
          key: category.name.toLowerCase(),
          value: category.name,
        }));
        return;
      }
    });

    return 'error';
  }

  destroy(): void {
    return;
  }
}
