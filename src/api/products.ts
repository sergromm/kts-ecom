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

// TODO(@sergromm):add pagination to all products request
const getAll = async (args: RequestArguments): Promise<RequestReturn<ProductType[]>> => {
  const { offset = 0, limit = 9, query, filters } = args;
  let path = `products?title=ilike.${query}*&select=*,category:categories!inner(name)`;
  const filterPath = `&category.name=eq(any).{${filters}}`;
  // const paginate = `&limit=9&offset=${offset}`;

  if (filters?.length) {
    path += filterPath;
  }

  const products = await axios.get<ProductType[]>(`${supabaseRoot}/${path}`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
      Prefer: 'count=exact',
      // Range: `${from}-${to}`,
    },
  });

  const [, count] = products.headers['content-range'].split('/');

  return { data: products.data, pagination: { offset: offset + limit, count: Number(count), limit } };
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

const search = async (query: string): Promise<ProductType[]> => {
  const products = await axios.get<ProductType[]>(
    `${supabaseRoot}/products?title=ilike.${query}*&select=*,category:categories(name)'`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
      },
    },
  );
  return products.data;
};

const filter = async (filters: string, query: string): Promise<ProductType[]> => {
  let path = `products?title=ilike.${query}*&select=*,category:categories!inner(name)`;
  const filterPath = `&category.name=eq(any).{${filters}}`;

  if (filters.length) {
    path += filterPath;
  }

  const products = await axios.get<ProductType[]>(`${supabaseRoot}/${path}`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
      Prefer: 'count=exact',
      Range: '0-8',
    },
  });

  return products.data;
};

const getCategories = async (): Promise<CategoryType[]> => {
  const categories = await axios.get<CategoryType[]>(`${supabaseRoot}/categories`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
    },
  });
  return categories.data;
};

export const productsAPI = { getAll, getOne, search, getCategories, filter };
