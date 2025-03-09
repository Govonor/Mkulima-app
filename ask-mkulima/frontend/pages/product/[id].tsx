import { useRouter } from 'next/router';
import React from 'react';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Product Detail: {id}</div>;
};

export default ProductDetail;