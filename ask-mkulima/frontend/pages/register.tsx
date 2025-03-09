// frontend/pages/register.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthService } from '../services/authService';
import { User } from '../types/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'farmer',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await AuthService.register({
          ...values,
          id: 0, // Placeholder
        });
        toast.success('Registration successful. Redirecting to login...');
        router.push('/login');
      } catch (err: any) {
        toast.error(err.message || 'Registration failed. Please try again.');
      }
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.firstName}</div>
            )}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.lastName}</div>
            )}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.email}</div>
            )}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.password}</div>
            )}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.confirmPassword}</div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role</label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="farmer">Farmer</option>
              <option value="business">Business</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.role}</div>
            )}
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Already have an account? <Link href="/login" style={{ color: '#007bff' }}>Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;