import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { productsAPI } from 'api/products';
import { Option } from 'components/MultiDropdown';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';
interface IProductsStore {
  fetch: () => void;
  search: (query: string) => void;
  filter: (queries: string, query: string) => void;
}

type PrivateFields = '_products' | '_searchQuery' | '_filters';
export class ProductsStore implements IProductsStore, ILocalStore {
  private _products: ProductType[] = [];
  private _searchQuery: string = '';
  private _filters: Option[] = [];

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,

      _searchQuery: observable,
      setSearchQuery: action,
      searchQuery: computed,

      _filters: observable.ref,
      setFilters: action,
      filters: computed,
      filter: action,
    });
  }

  get products() {
    return this._products;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  get filters() {
    return this._filters;
  }

  setSearchQuery = (value: string) => {
    this._searchQuery = value;
  };

  setFilters = (values: Option[]) => {
    this._filters = values;
    this.filter();
  };

  async fetch() {
    const response = await productsAPI.getAll();

    runInAction(() => {
      if (response) {
        this._products = response;
        return;
      }
    });

    return 'error';
  }

  async search(query: string) {
    const response = await productsAPI.search(query);

    runInAction(() => {
      if (response) {
        this._products = response;
        return;
      }
    });

    return 'error';
  }

  getFilterQuery(values: Option[]) {
    return values.map((filter) => filter.value).join(', ');
  }

  async filter() {
    const filtersQuery = this.getFilterQuery(this._filters);
    const response = await productsAPI.filter(filtersQuery, this._searchQuery);

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

  // private readonly queriesChange = reaction(
  //   () =>
  // )
}
