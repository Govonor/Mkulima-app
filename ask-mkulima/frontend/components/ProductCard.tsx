import React from 'react';
import { Product } from '../types/product';

const ProductCard: React.FC<Product> = ({ id, name, price, description, images }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
      {/* Check if there are images and display the first image */}
      {images && images.length > 0 && (
        <img
          src={images[0]} // Display the first image if available
          alt={name}
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      )}
      <h3>{name}</h3>
      <p>Price: Ksh {price}</p>
      {description && <p>{description}</p>}
    </div>
  );
};

export default ProductCard;
