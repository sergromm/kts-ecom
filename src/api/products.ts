import axios, { AxiosResponse } from 'axios';

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

const getProducts = async (): AsyncReturn<ProductType[]> => {
  const products = await axios.get<ProductType[]>('https://api.escuelajs.co/api/v1/products?offset=0&limit=9');
  return products;
};

const getProduct = async (id: number): AsyncReturn<ProductType> => {
  const product = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  return product;
};
const getCategories = async (): AsyncReturn<CategoryType> => {
  const categories = await axios.get('https://api.escuelajs.co/api/v1/categories');
  return categories;
};

export const API = { getProducts, getProduct, getCategories };
