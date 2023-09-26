import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { productsAPI } from 'api/products';
import { Option } from 'components/MultiDropdown';
import { ProductType } from 'entities/protuct';
import queryStore from './queryStore';
import { ILocalStore } from './types';
interface IProductsStore {
  fetch: (start: number, end: number) => void;
}

type PrivateFields = '_products' | '_searchQuery' | '_filters';

const INITIAL_OFFSET = 9;
const INITIAL_LIMIT = 9;
const INITIAL_COUNT = 0;

export class ProductsStore implements IProductsStore, ILocalStore {
  private _products: ProductType[] = [];
  private _searchQuery: string = '';
  private _filters: string = '';
  private _limit: number = INITIAL_LIMIT;
  private _offset: number = INITIAL_OFFSET;
  private _count: number = INITIAL_COUNT;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,

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

  get limit() {
    return this._limit;
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
    // FIXME
    /**
     * запросы отправляются неоптимально. с каждым запросом увеличивается
     * размер возвращаемого массива, иначе ломается бесконечный скролл
     *
     *
     * нужно хендлить ошибки в try/catch
     */
    const response = await productsAPI.getAll({
      offset: this._offset,
      filters: this._filters,
      query: this.searchQuery,
    });

    runInAction(() => {
      if (response) {
        this._products = response.data;
        this._offset = response.pagination.offset;
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
