import axios from 'axios';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Option } from 'components/MultiDropdown';
import { ProductType } from 'entities/protuct';
import queryStore from './queryStore';
import { ILocalStore } from './types';
import { Meta } from './utils';
interface IProductsStore {
  fetch: (start: number, end: number) => void;
}

type PrivateFields = '_products' | '_searchQuery' | '_filters' | '_meta';

const PRODUCTS_PER_PAGE = 9;
const INITIAL_COUNT = 0;
const INITIAL_LEFT_RANGE = 0;
const INITIAL_RIGHT_RANGE = PRODUCTS_PER_PAGE - 1;
const INITIAL_PAGE = 1;

export class ProductsStore implements IProductsStore, ILocalStore {
  private baseURL = 'https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1';
  private _products: ProductType[] = [];
  private _searchQuery: string = '';
  private _filters: string = '';
  private _meta = Meta.initial;
  private _from: number = INITIAL_LEFT_RANGE;
  private _to: number = INITIAL_RIGHT_RANGE;
  private _page: number = INITIAL_PAGE;
  private _count: number = INITIAL_COUNT;

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

  get page() {
    return this._page;
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

  setPage(page: number) {
    this._page = page;
  }

  private setRange() {
    this._from = 0;
    this._to = this._page * PRODUCTS_PER_PAGE - 1;
  }

  private getProducts = async ({
    from = 0,
    to = 8,
    filters = '',
    query = '',
  }): Promise<{ count: number; products: ProductType[] }> => {
    let path = `products?title=ilike.${query}*&select=*,category:categories!inner(name)`;
    if (filters?.length) {
      const filterPath = `&category.name=eq(any).{${filters}}`;
      path += filterPath;
    }
    const response = await axios.get<ProductType[]>(`${this.baseURL}/${path}`, {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
        Prefer: 'count=exact',
        Range: `${from}-${to}`,
      },
    });

    const [, count] = response.headers['content-range'].split('/');
    return { count: Number(count), products: response.data };
  };

  fetch = async () => {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    this.setRange();

    const { count, products } = await this.getProducts({
      filters: this._filters,
      from: this._from,
      to: this._to,
      query: this._searchQuery,
    });

    if (products) {
      runInAction(() => {
        this._meta = Meta.success;
        this._products = products;
        this._count = Number(count);
        this._page = this._page < Math.ceil(this._count / PRODUCTS_PER_PAGE) ? this._page + 1 : this._page;
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
    this._qpReaction();
  }

  private readonly _qpReaction = reaction(
    () => {
      const filter = queryStore.getParam('filter');
      const search = queryStore.getParam('search');
      const page = queryStore.getParam('page');

      return { filter, search, page };
    },
    ({ filter, search, page }) => {
      this.setFilters((filter as string) ?? '');
      this.setSearchQuery((search as string) ?? '');
      this.setPage(Number(page) ?? INITIAL_PAGE);
    },
  );
}
