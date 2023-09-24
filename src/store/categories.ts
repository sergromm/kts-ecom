import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Option } from 'components/MultiDropdown';
import { CategoryType } from 'entities/category';
import { ProductsApiStore } from './productsApi';
import { ILocalStore } from './types';
import { Meta } from './utils';
interface ICategoriesStore {
  getCategories: () => void;
}

type PrivateFields = '_categories' | '_options' | '_value' | '_meta';

export class CategoriesStore implements ICategoriesStore, ILocalStore {
  private _categories: CategoryType[] = [];
  private _options: Option[] = [];
  private _value: Option[] = [];
  private _meta: Meta = Meta.initial;
  private api: ProductsApiStore = new ProductsApiStore();

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      categories: computed,

      _options: observable.ref,
      options: computed,

      _meta: observable,
      meta: computed,

      _value: observable.ref,
      setValue: action,
      setValueByName: action,

      getFilterQuery: action,
      getCategories: action,
    });
  }

  get categories() {
    return this._categories;
  }

  get options() {
    return this._options;
  }

  get meta() {
    return this._meta;
  }

  get value() {
    return this._value;
  }

  setValueByName = (value: string) => {
    // FIXME: использовать hashmap для быстрого доступа по ключу
    const values = value.split(',');
    const selected = this.options.filter((option) => values.includes(option.value));
    this.setValue(selected);
  };

  setValue = (value: Option[]) => {
    this._value = value;
  };

  getFilterQuery() {
    return this._value.map((value) => value.value).join(',');
  }

  getCategories = async () => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const response = await this.api.getCategories();

    if (response) {
      runInAction(() => {
        this._meta = Meta.success;
        this._categories = response;
        this._options = this._categories.map((category) => ({
          key: category.name.toLowerCase(),
          value: category.name,
        }));
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
