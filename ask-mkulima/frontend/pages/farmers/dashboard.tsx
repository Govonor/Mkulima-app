// frontend/pages/farmers/dashboard.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../../services/authService';
import { User } from '../../types/user';
import ChartComponent from '../../components/ui/Chart'; // Import ChartComponent

const FarmerDashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = AuthService.getUser();
    setUser(loggedInUser);

    if (!loggedInUser || loggedInUser.role !== 'farmer') {
      router.push('/login');
      return;
    }
  }, [router]);

  // Sample data for crop yield
  const cropYieldData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Crop Yield (kg)',
        data: [100, 120, 150, 130, 180, 200],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Sample data for sales performance
  const salesPerformanceData = {
    labels: ['Potatoes', 'Tomatoes', 'Carrots', 'Onions'],
    datasets: [
      {
        label: 'Sales Revenue (KES)',
        data: [5000, 7000, 4000, 6000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Farmer Dashboard</h1>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '30px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#555' }}>Welcome to your Farmer Dashboard!</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="/farmers/listings" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>Manage Listings</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/farmers/orders" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>View Orders</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/farmers/payments" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>Payment History</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/farmers/profile" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>Profile Settings</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="/farmers/add-product" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1em' }}>Add Product</a>
          </li>
        </ul>

        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2>Crop Yield Over Time</h2>
            <ChartComponent type="line" data={cropYieldData} />
          </div>
          <div>
            <h2>Sales Performance</h2>
            <ChartComponent type="bar" data={salesPerformanceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;