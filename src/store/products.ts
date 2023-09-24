import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Option } from 'components/MultiDropdown';
import { ProductType } from 'entities/protuct';
import { ProductsApiStore } from './productsApi';
import queryStore from './queryStore';
import { ILocalStore } from './types';
import { Meta } from './utils';
interface IProductsStore {
  fetch: (start: number, end: number) => void;
}

type PrivateFields = '_products' | '_searchQuery' | '_filters' | '_meta';

const INITIAL_OFFSET = 8;
const INITIAL_LIMIT = 9;
const INITIAL_COUNT = 0;

export class ProductsStore implements IProductsStore, ILocalStore {
  private _products: ProductType[] = [];
  private _searchQuery: string = '';
  private _filters: string = '';
  private _meta = Meta.initial;
  private _limit: number = INITIAL_LIMIT;
  private _offset: number = INITIAL_OFFSET;
  private _count: number = INITIAL_COUNT;
  private api: ProductsApiStore = new ProductsApiStore();

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,

      _meta: observable,
      meta: computed,

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

  get meta() {
    return this._meta;
  }

  get count() {
    return this._count;
  }

  get offset() {
    return this._offset;
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
  };

  setPaginationOffset(offset: string) {
    this._offset = Number(offset);
  }

  fetch = async () => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    //NOTE
    /**
     *  не знаю должны ли фильтры, оффсет и запрос принадлежать стору с продуктами.
     *  такое ощущение, что они должны быть внутри стора с api
     */

    const { count, products } = await this.api.getMany({
      filters: this._filters,
      offset: this._offset,
      query: this._searchQuery,
    });

    if (products) {
      runInAction(() => {
        this._meta = Meta.success;
        this._products = products;
        this._offset = this._offset + this._limit;
        this._count = Number(count);
        return;
      });
    } else {
      this._meta = Meta.error;
    }
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
      const offset = queryStore.getParam('offset');

      return { filter, search, offset };
    },
    ({ filter, search, offset }) => {
      this.setFilters((filter as string) ?? '');
      this.setSearchQuery((search as string) ?? '');
      this.setPaginationOffset((offset as string) ?? '');
      this.fetch();
    },
  );
}
