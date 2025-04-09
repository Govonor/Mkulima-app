import type { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Tomatoes',
    price: 30,
    description: 'Fresh ripe tomatoes grown locally.',
    imageUrl: '/images/tomatoes.jpg',
  },
  {
    id: 2,
    name: 'Cabbage',
    price: 50,
    description: 'Green cabbage, perfect for salads and stews.',
    imageUrl: '/images/cabbage.jpg',
  },
  {
    id: 3,
    name: 'Potatoes',
    price: 20,
    description: 'High-quality potatoes, locally grown.',
    imageUrl: '/images/potatoes.jpg',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // If the request is a GET request, return the list of products
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    // If the request is a POST request, add a new product
    try {
      const { name, price, description, imageUrl } = req.body;
      const newProduct: Product = {
        id: products.length + 1,
        name,
        price,
        description,
        imageUrl,
      };
      products.push(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error adding product' });
    }
  } else {
    // Return method not allowed for any non-GET, non-POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
