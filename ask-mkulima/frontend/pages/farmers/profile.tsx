// frontend/pages/farmers/profile.tsx
import React, { useState, useEffect } from 'react';
import { AuthService } from '../../services/authService';
import { Farmer } from '../../types/user';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material'; // Import MUI components

const FarmerProfile: React.FC = () => {
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const validationSchema = Yup.object().shape({
    farmName: Yup.string().required('Farm Name is required'),
    farmLocation: Yup.string().required('Farm Location is required'),
    farmSize: Yup.number().required('Farm Size is required').positive('Farm Size must be positive'),
    contactNumber: Yup.string().required("Contact Number is required"),
    deliveryRadius: Yup.number().positive("Delivery Radius must be positive").nullable(),
    yearsOfExperience: Yup.number().positive("Years of Experience must be positive").nullable(),
    // Add other fields as needed
  });

  const formik = useFormik({
    initialValues: {
      farmName: '',
      farmLocation: '',
      farmSize: 0,
      contactNumber: "",
      deliveryRadius: null,
      yearsOfExperience: null,
      // Add other fields as needed
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Reinitialize when farmer data changes
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        await api.put(`/farmers/${farmer?.id}`, values);
        setFarmer({ ...farmer, ...values });
        setIsEditing(false);
        toast.success('Profile updated successfully.');
      } catch (err: any) {
        setError(err.message || 'Failed to update farmer profile.');
        toast.error('Failed to update profile.');
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchFarmerProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUser = AuthService.getUser();
        if (currentUser && currentUser.role === 'farmer') {
          const response = await api.get(`/farmers/${currentUser.id}`);
          setFarmer(response.data);
          formik.setValues(response.data); // Set formik values
        } else {
          setError('User not logged in or not a farmer.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load farmer profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    formik.resetForm({ values: farmer }); // Reset formik values
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (!farmer) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Profile not found.</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Farmer Profile
        </Typography>
        {isEditing ? (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Farm Name"
              name="farmName"
              value={formik.values.farmName}
              onChange={formik.handleChange}
              error={formik.touched.farmName && Boolean(formik.errors.farmName)}
              helperText={formik.touched.farmName && formik.errors.farmName}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Farm Location"
              name="farmLocation"
              value={formik.values.farmLocation}
              onChange={formik.handleChange}
              error={formik.touched.farmLocation && Boolean(formik.errors.farmLocation)}
              helperText={formik.touched.farmLocation && formik.errors.farmLocation}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Farm Size"
              type="number"
              name="farmSize"
              value={formik.values.farmSize}
              onChange={formik.handleChange}
              error={formik.touched.farmSize && Boolean(formik.errors.farmSize)}
              helperText={formik.touched.farmSize && formik.errors.farmSize}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
              helperText={formik.touched.contactNumber && formik.errors.contactNumber}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Delivery Radius (km)"
              type="number"
              name="deliveryRadius"
              value={formik.values.deliveryRadius || ""}
              onChange={formik.handleChange}
              error={formik.touched.deliveryRadius && Boolean(formik.errors.deliveryRadius)}
              helperText={formik.touched.deliveryRadius && formik.errors.deliveryRadius}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Years of Experience"
              type="number"
              name="yearsOfExperience"
              value={formik.values.yearsOfExperience || ""}
              onChange={formik.handleChange}
              error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
              helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
              fullWidth
              margin="normal"
            />

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <div>
            <Typography variant="body1"><strong>Farm Name:</strong> {farmer.farmName}</Typography>
            <Typography variant="body1"><strong>Farm Location:</strong> {farmer.farmLocation}</Typography>
            <Typography variant="body1"><strong>Farm Size:</strong> {farmer.farmSize}</Typography>
            <Typography variant="body1"><strong>Contact Number:</strong> {farmer.contactNumber}</Typography>
            <Typography variant="body1"><strong>Delivery Radius:</strong> {farmer.deliveryRadius} km</Typography>
            <Typography variant="body1"><strong>Years of Experience:</strong> {farmer.yearsOfExperience}</Typography>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            </Box>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default FarmerProfile;