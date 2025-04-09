import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Order } from '../types/order';
import { Product } from '../types/product';
import { User } from '../types/user';
import { AuthService } from '../services/authService';
import { Card, CardContent, Typography, Grid, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import recharts

const FarmerDashboardComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [listings, setListings] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularProducts, setPopularProducts] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUser = AuthService.getUser();
        setUser(currentUser);

        if (currentUser && currentUser.role === 'farmer') {
          const ordersResponse = await api.get(`/orders/farmer/${currentUser.id}`);
          setOrders(ordersResponse.data);

          const listingsResponse = await api.get(`/products/farmer/${currentUser.id}`);
          setListings(listingsResponse.data);
        } else {
          setError('User not logged in or not a farmer.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate popular products
    const productCounts: { [key: string]: number } = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.product) {
          const productName = item.product.name;
          productCounts[productName] = (productCounts[productName] || 0) + item.quantity;
        }
      });
    });

    const sortedProducts = Object.entries(productCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5) // Get top 5
      .map(([name, count]) => ({ name, count }));

    setPopularProducts(sortedProducts);
  }, [orders]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading dashboard...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  // Calculate dashboard statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;
  const processingOrders = orders.filter((order) => order.status === 'processing').length;
  const deliveredOrders = orders.filter((order) => order.status === 'delivered').length;
  const totalListings = listings.length;
  const availableListings = listings.filter((listing) => listing.availability).length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {/* Existing Statistics Cards */}
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Total Orders
              </Typography>
              <Typography variant="h4" component="div">
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      {/* ... (other statistic cards) ... */}

      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Average Order Value
              </Typography>
              <Typography variant="h4" component="div">
                Ksh {averageOrderValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" component="div">
            Most Popular Products
          </Typography>
          <Box style={{ width: '100%', height: 300 }}>
            <BarChart data={popularProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FarmerDashboardComponent;