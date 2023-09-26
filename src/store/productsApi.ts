import axios from 'axios';
import { makeObservable, action } from 'mobx';
import { CategoryType } from 'entities/category';
import { ProductType } from 'entities/protuct';
import { ILocalStore } from './types';

interface IProductsApiStore {
  getMany: (args: GetAllArgs) => Promise<GetAllReturn>;
  getOne: (id: number) => Promise<ProductType>;
  getCategories: () => Promise<CategoryType[]>;
}
type GetAllArgs = {
  offset?: number;
  filters?: string;
  query?: string;
};

type GetAllReturn = {
  count: number;
  products: ProductType[];
};

export class ProductsApiStore implements IProductsApiStore, ILocalStore {
  private baseURL = 'https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1';

  constructor() {
    makeObservable(this, {
      getMany: action,
      getOne: action,
      getCategories: action,
    });
  }

  getMany = async ({ offset = 8, filters = '', query = '' }: GetAllArgs) => {
    let path = `products?title=ilike.${query}*&select=*,category:categories!inner(name)`;
    if (filters?.length) {
      const filterPath = `&category.name=eq(any).{${filters}}`;
      path += filterPath;
    }

    const response = await axios.get<ProductType[]>(`${this.baseURL}/${path}`, {
      headers: {
        apikey: process.env.SUPABASE_PUBLIC_KEY,
        Prefer: 'count=exact',
        Range: `0-${offset}`,
      },
    });

    const [, count] = response.headers['content-range'].split('/');
    return { count: Number(count), products: response.data };
  };

  getOne = async (id: number) => {
    console.log(process.env.SUPABASE_PUBLIC_KEY)
    const product = await axios.get<ProductType[]>(
      `${this.baseURL}/products?id=eq.${id}&select=*,category:categories(name)`,
      {
        headers: {
          apikey:process.env.SUPABASE_PUBLIC_KEY,
        },
      },
    );

    return product.data[0];
  };

  getCategories = async (): Promise<CategoryType[]> => {
    const categories = await axios.get<CategoryType[]>(`${this.baseURL}/categories`, {
      headers: {
        apikey:process.env.SUPABASE_PUBLIC_KEY,
      },
    });
    return categories.data;
  };

  destroy(): void {}
}
