import axios from 'axios';
import { CategoryType } from 'entities/category';
import { ProductType } from 'entities/protuct';

const supabaseRoot = 'https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1';

type RequestReturn<T> = {
  data: T;
  pagination: {
    offset: number;
    count: number;
    limit: number;
  };
};

type RequestArguments = {
  limit?: number;
  offset?: number;
  query?: string;
  filters?: string;
};

const getAll = async (args: RequestArguments): Promise<RequestReturn<ProductType[]>> => {
  const { offset = 0, limit = 9, query, filters } = args;
  let path = `products?title=ilike.${query}*&select=*,category:categories!inner(name)`;
  const filterPath = `&category.name=eq(any).{${filters}}`;
  if (filters?.length) {
    path += filterPath;
  }

  const products = await axios.get<ProductType[]>(`${supabaseRoot}/${path}`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
      Prefer: 'count=exact',
      Range: `0-${offset - 1}`,
    },
  });

  const [, count] = products.headers['content-range'].split('/');

  return {
    data: products.data,
    pagination: {
      offset: offset + limit,
      count: Number(count),
      limit: limit,
    },
  };
};

const getOne = async (id: number): Promise<ProductType> => {
  const product = await axios.get<ProductType[]>(
    `${supabaseRoot}/products?id=eq.${id}&select=*,category:categories(name)`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
      },
    },
  );

  return product.data[0];
};

const getCategories = async (): Promise<CategoryType[]> => {
  const categories = await axios.get<CategoryType[]>(`${supabaseRoot}/categories`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
    },
  });
  return categories.data;
};

export const productsAPI = { getAll, getOne, getCategories };
