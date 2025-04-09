// components/ProductGrid.tsx
import React from 'react';
import { Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isOnSale?: boolean;
  unit: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 120,
    image: '/images/tomatoes.jpg',
    isOnSale: true,
    unit: 'per kg',
  },
  {
    id: '2',
    name: 'Kienyeji Eggs',
    price: 350,
    image: '/images/eggs.jpg',
    unit: 'per tray',
  },
  {
    id: '3',
    name: 'Maize (Dry)',
    price: 75,
    image: '/images/maize.jpg',
    unit: 'per kg',
  },
];

interface Props {
  filter?: 'featured' | 'onsale';
}

const ProductGrid: React.FC<Props> = ({ filter }) => {
  const products = filter === 'onsale'
    ? mockProducts.filter(p => p.isOnSale)
    : mockProducts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="relative border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">On Sale</div>
          )}
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-green-800">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.unit}</p>
            <p className="text-orange-500 font-bold text-xl">Ksh {product.price}</p>
            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-1" /> Quick View</Button>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
