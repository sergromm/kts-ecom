import axios from 'axios';
import { CategoryType } from 'entities/category';
import { ProductType } from 'entities/protuct';

const supabaseRoot = 'https://rzknhedkzukvgtstzbxj.supabase.co/rest/v1';

// TODO(@sergromm):add pagination to all products request
// offset: number = 0, limit: number = 9
const getProducts = async (): Promise<ProductType[]> => {
  const products = await axios.get<ProductType[]>(`${supabaseRoot}/products?select=*,categories(*)'`, {
    headers: {
      apikey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6a25oZWRrenVrdmd0c3R6YnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNjEzNTYsImV4cCI6MjAwOTgzNzM1Nn0.P-_ZrD7GgOZqYZtK-PQXZtmeVPz4mPjmNWyyzk-2GsI',
    },
  });
  return products.data;
};

const getProduct = async (id: number): Promise<ProductType> => {
  const product = await axios.get<ProductType[]>(`${supabaseRoot}/products?id=eq.${id}&select=*,categories(*)`, {
    headers: {
      apikey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6a25oZWRrenVrdmd0c3R6YnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNjEzNTYsImV4cCI6MjAwOTgzNzM1Nn0.P-_ZrD7GgOZqYZtK-PQXZtmeVPz4mPjmNWyyzk-2GsI',
    },
  });

  return product.data[0];
};

const getCategories = async (): Promise<CategoryType[]> => {
  const categories = await axios.get<CategoryType[]>(`${supabaseRoot}/categories`, {
    headers: {
      apikey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6a25oZWRrenVrdmd0c3R6YnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNjEzNTYsImV4cCI6MjAwOTgzNzM1Nn0.P-_ZrD7GgOZqYZtK-PQXZtmeVPz4mPjmNWyyzk-2GsI',
    },
  });
  return categories.data;
};

export const API = { getProducts, getProduct, getCategories };
