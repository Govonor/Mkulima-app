
import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Order } from '../types/order';
import { User } from '../types/user';
import { AuthService } from '../services/authService';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material'; // Import MUI components

const BusinessDashboardComponent: React.FC = () => {
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

        if (currentUser && currentUser.role === 'business') {
          const response = await api.get(`/orders/business/${currentUser.id}`);
          setOrders(response.data);
        } else {
          setError('User not logged in or not a business.');
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
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
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

      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Pending Orders
              </Typography>
              <Typography variant="h4" component="div">
                {pendingOrders}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Processing Orders
              </Typography>
              <Typography variant="h4" component="div">
                {processingOrders}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Delivered Orders
              </Typography>
              <Typography variant="h4" component="div">
                {deliveredOrders}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Total Revenue
              </Typography>
              <Typography variant="h4" component="div">
                Ksh {totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BusinessDashboardComponent;