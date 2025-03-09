// frontend/pages/businesses/orders.tsx
import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Order } from '../../types/order';
import { User } from '../../types/user';
import { AuthService } from '../../services/authService';
import Link from 'next/link'; // Import Link

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUser = AuthService.getUser();
        setUser(currentUser);

        if (currentUser) {
          const response = await api.get(`/orders/business/${currentUser.id}`);
          setOrders(response.data);
        } else {
          setError('User not logged in.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading orders...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (orders.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No orders found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Orders</h2>
      <div>
        {orders.map((order) => (
          <div key={order.id} style={{ borderBottom: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
            <div>
              <strong>Order ID:</strong> <Link href={`/businesses/order/${order.id}`} style={{ color: '#007bff' }}>{order.id}</Link>
            </div>
            <div><strong>Total:</strong> Ksh {order.total}</div>
            <div><strong>Status:</strong> {order.status}</div>
            <div><strong>Items:</strong></div>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId}>
                  Product ID: {item.productId}, Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;