import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { productsAPI } from 'api/products';
import { Option } from 'components/MultiDropdown';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';
interface IProductsStore {
  fetch: (start: number, end: number) => void;
}

type Pagination = {
  offset: number;
  count: number;
  limit: number;
};

type PrivateFields = '_products' | '_searchQuery' | '_filters' | '_pagination';

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 9;
const INITIAL_COUNT = 0;

export class ProductsStore implements IProductsStore, ILocalStore {
  private _products: ProductType[] = [];
  private _searchQuery: string = '';
  private _filters: Option[] = [];
  private _pagination: Pagination = {
    offset: INITIAL_OFFSET,
    limit: INITIAL_LIMIT,
    count: INITIAL_COUNT,
  };

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,

      _pagination: observable.ref,
      pagination: computed,

      _searchQuery: observable,
      setSearchQuery: action,
      searchQuery: computed,

      _filters: observable.ref,
      setFilters: action,
      filters: computed,

      fetch: action,
    });
  }

  get products() {
    return this._products;
  }

  get pagination() {
    return this._pagination;
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

    // this.fetch();
  };

  fetch = async () => {
    const filtersQuery = this.getFilterQuery(this._filters);
    const response = await productsAPI.getAll({
      offset: this._pagination.offset,
      filters: filtersQuery,
      query: this.searchQuery,
    });

    runInAction(() => {
      if (response) {
        this._products = [...this._products, ...response.data];
        this._pagination = response.pagination;
        return;
      }
    });

    return 'error';
  };

  getFilterQuery = (values: Option[]) => {
    return values.map((filter) => filter.value).join(', ');
  };

  destroy(): void {
    return;
  }

  // private readonly queriesChange = reaction(
  //   () =>
  // )
}
