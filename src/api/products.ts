import axios from 'axios';
import { CategoryType } from 'entities/category';
import { ProductType } from 'entities/protuct';

const supabaseRoot = 'https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1';

// TODO(@sergromm):add pagination to all products request
// offset: number = 0, limit: number = 9
const getProducts = async (): Promise<ProductType[]> => {
  const products = await axios.get<ProductType[]>(`${supabaseRoot}/products?select=*,category:categories(name)`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
    },
  });
  return products.data;
};

const getProduct = async (id: number): Promise<ProductType> => {
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

const searchProducts = async (query: string): Promise<ProductType[]> => {
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

const filterProducts = async (queries: string): Promise<ProductType[]> => {
  const products = await axios.get<ProductType[]>(
    `${supabaseRoot}/products?select=*,category:categories!inner(name)&category.name=eq(any).{${queries}}`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
      },
    },
  );

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

export const API = { getProducts, getProduct, searchProducts, getCategories, filterProducts };
