// frontend/pages/farmers/payments.tsx
import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Payment } from '../../types/payment'; 
import { User } from '../../types/user';
import { AuthService } from '../../services/authService';

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUser = AuthService.getUser();
        setUser(currentUser);

        if (currentUser && currentUser.role === 'farmer') {
          const response = await api.get(`/payments/farmer/${currentUser.id}`);
          setPayments(response.data);
        } else {
          setError('User not logged in or not a farmer.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading payments...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (payments.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No payments found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Payments</h2>
      <div>
        {payments.map((payment) => (
          <div key={payment.id} style={{ borderBottom: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
            <div><strong>Payment ID:</strong> {payment.id}</div>
            <div><strong>Order ID:</strong> {payment.orderId}</div>
            <div><strong>Amount:</strong> Ksh {payment.amount}</div>
            <div><strong>Status:</strong> {payment.status}</div>
            <div><strong>Payment Method:</strong> {payment.paymentMethod}</div>
            <div><strong>Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;