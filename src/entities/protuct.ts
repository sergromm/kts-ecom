import { CategoryType } from './category';

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  categories: CategoryType;
  images: string[];
};
