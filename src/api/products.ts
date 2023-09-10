import axios, { AxiosResponse } from 'axios';

const root = 'https://api.escuelajs.co/api/v1';

export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
};

type AsyncReturn<T> = Promise<AxiosResponse<T>>;

const getProducts = async (offset: number = 0, limit: number = 9): AsyncReturn<ProductType[]> => {
  const products = await axios.get<ProductType[]>(`${root}/products?offset=${offset}&limit=${limit}`);
  return products;
};

const getProduct = async (id: number): AsyncReturn<ProductType> => {
  const product = await axios.get(`${root}/products/${id}`);
  return product;
};
const getCategories = async (): AsyncReturn<CategoryType> => {
  const categories = await axios.get(`${root}/categories`);
  return categories;
};

export const API = { getProducts, getProduct, getCategories };
