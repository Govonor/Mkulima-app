// ask-mkulima/frontend/services/productService.ts

import { Product } from '../types/product';

const API_URL = '/api/products'; // Update this if the API URL changes

// Function to fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.products;
};

// Function to create a new product
export const createProduct = async (newProduct: Product): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return await response.json();
};

// You can add other product-related service functions as needed
