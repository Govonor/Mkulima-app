// frontend/pages/businesses/orders.tsx
import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Order } from '../../types/order'; // Import Order interface
import { User } from '../../types/user'; // Import User interface
import { AuthService } from '../../services/authService'; // Import AuthService

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
          const response = await api.get(`/orders/business/${currentUser.id}`); // Fetch orders for the logged-in business
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
          <div key={order.id} style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
            <div>Order ID: {order.id}</div>
            <div>Total: Ksh {order.total}</div>
            <div>Status: {order.status}</div>
            <div>Items:</div>
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