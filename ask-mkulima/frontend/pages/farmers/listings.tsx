// frontend/pages/farmers/listings.tsx
import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Product } from '../../types/product';
import { AuthService } from '../../services/authService';
import { User } from '../../types/user';
import Link from 'next/link';

const Listings: React.FC = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUser = AuthService.getUser();
        setUser(currentUser);

        if (currentUser && currentUser.role === 'farmer') {
          const response = await api.get(`/products/farmer/${currentUser.id}`);
          setListings(response.data);
        } else {
          setError('User not logged in or not a farmer.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading listings...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (listings.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        No listings found. <Link href="/farmers/add-product">Add a product</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Listings</h2>
      <div>
        {listings.map((listing) => (
          <div key={listing.id} style={{ borderBottom: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
            <div>
              <strong>Product Name:</strong> <Link href={`/product/${listing.id}`} style={{ color: '#007bff' }}>{listing.name}</Link>
            </div>
            <div><strong>Price:</strong> Ksh {listing.price} / {listing.unit}</div>
            <div><strong>Availability:</strong> {listing.availability ? 'Available' : 'Unavailable'}</div>
            <div><strong>Quantity:</strong> {listing.quantityAvailable}</div>
            <div>
              <Link href={`/farmers/edit-listing/${listing.id}`}>Edit Listing</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;