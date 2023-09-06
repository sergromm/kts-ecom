import axios, { AxiosResponse } from 'axios';

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

type AsyncReturn<T> = Promise<AxiosResponse<T>>;

const getProducts = async (): AsyncReturn<Product[]> => {
  const products = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products?offset=0&limit=9');
  return products;
};

const getProduct = async (id: number): AsyncReturn<Product> => {
  const product = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  return product;
};
const getCategories = async (): AsyncReturn<Category> => {
  const categories = await axios.get('https://api.escuelajs.co/api/v1/categories');
  return categories;
};

export const API = { getProducts, getProduct, getCategories };
