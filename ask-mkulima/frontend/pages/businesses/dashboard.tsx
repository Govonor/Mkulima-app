import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../../services/authService';
import { User } from '../../types/user';
import ChartComponent from '../../components/UI/Chart';
import { Order } from '../../types/order';
import { Product } from '../../types/product';
import { OrderService } from '../../services/orderService';
import { ProductService } from '../../services/productService';

const BusinessDashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loggedInUser = AuthService.getUser();
    setUser(loggedInUser);

    if (!loggedInUser || loggedInUser.role !== 'business') {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const ordersData = await OrderService.getOrdersByBusiness(user?.id || '');
      setOrders(ordersData);

      const productsData = await ProductService.getProductsByBusiness(user?.id || '');
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const salesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales',
        data: [150, 220, 180, 250],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const productData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Inventory',
        data: products.map((product) => product.quantity),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Business Dashboard</h1>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '30px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#555' }}>Welcome to your Business Dashboard!</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="/businesses/catalog" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>View Catalog</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/businesses/orders" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>Track Orders</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/businesses/cart" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>Shopping Cart</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/businesses/checkout" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>Checkout</a>
          </li>
        </ul>

        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2>Sales Trends</h2>
            <ChartComponent type="line" data={salesData} />
          </div>
          <div>
            <h2>Product Inventory</h2>
            <ChartComponent type="bar" data={productData} />
          </div>
          <div>
            <h2>Recent Orders</h2>
            {orders.length > 0 ? (
              <ul>
                {orders.slice(0, 5).map((order) => (
                  <li key={order.id}>
                    Order #{order.id} - Status: {order.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent orders.</p>
            )}
          </div>
          <div>
            <h2>Top Products</h2>
            {products.length > 0 ? (
              <ul>
                {products.slice(0, 5).map((product) => (
                  <li key={product.id}>
                    {product.name} - Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;