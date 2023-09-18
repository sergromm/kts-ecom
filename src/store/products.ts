import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { productsAPI } from 'api/products';
import { Option } from 'components/MultiDropdown';
import { ProductType } from 'entities/protuct';
import queryStore from './queryStore';
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
  private _filters: string = '';
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

      _filters: observable,
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

  setFilters = (filters: string) => {
    this._filters = filters;

    // this.fetch();
  };

  fetch = async () => {
    const response = await productsAPI.getAll({
      offset: this._pagination.offset,
      filters: this._filters,
      query: this.searchQuery,
    });

    runInAction(() => {
      if (response) {
        this._products = response.data;
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
    this._qpReaction;
  }

  private readonly _qpReaction = reaction(
    () => {
      const filter = queryStore.getParam('filter');
      const search = queryStore.getParam('search');

      return { filter, search };
    },
    ({ filter, search }) => {
      this.setFilters((filter as string) ?? '');
      this.setSearchQuery((search as string) ?? '');
      this.fetch();
      console.log('search value change', { filter, search });
    },
  );
}
