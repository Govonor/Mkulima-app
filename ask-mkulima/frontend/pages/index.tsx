import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

const Home: React.FC = () => { // Corrected component definition
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data: { products: Product[] }) => setProducts(data.products));
  }, []);

  return (
    <div>
      <h1>Welcome to Ask Mkulima</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Ksh {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home; 