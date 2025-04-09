// app/wishlist/page.tsx or pages/Wishlist.tsx
"use client";

import React from "react";
import { useWishlist } from "@/stores/useWishlist";
import ProductGrid from "@/components/ProductGrid";
import { mockProducts } from "@/lib/data"; // Assume this is your mock product source

const Wishlist = () => {
  const { items } = useWishlist();

  const wishlistedProducts = mockProducts.filter(product =>
    items.includes(product.id)
  );

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
        My Wishlist ❤️
      </h1>

      {wishlistedProducts.length > 0 ? (
        <ProductGrid products={wishlistedProducts} />
      ) : (
        <div className="text-center text-gray-500 text-lg mt-10">
          You haven't added any products to your wishlist yet.
        </div>
      )}
    </div>
  );
};

export default Wishlist;
