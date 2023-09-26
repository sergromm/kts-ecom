import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { productsAPI } from 'api/products';
import { Option } from 'components/MultiDropdown';
import { CategoryType } from 'entities/category';
import { ILocalStore } from './types';
interface ICategoriesStore {
  getCategories: () => void;
}

type PrivateFields = '_categories' | '_options' | '_value';

export class CategoriesStore implements ICategoriesStore, ILocalStore {
  private _categories: CategoryType[] = [];
  private _options: Option[] = [];
  private _value: Option[] = [];

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      categories: computed,

      _options: observable.ref,
      options: computed,

      _value: observable.ref,
      setValue: action,
      setValueByName: action,

      getFilterQuery: action,
    });
  }

  get categories() {
    return this._categories;
  }

  get options() {
    return this._options;
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
  };

  destroy(): void {
    return;
  }
}
