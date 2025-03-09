// frontend/pages/businesses/cart.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Product } from '../../types/product'; // Import Product interface
import { api } from '../../utils/api'; // Import API utility
import { OrderItem } from '../../components/OrderItem'; // Import OrderItem component

interface CartItem {
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load cart items from local storage or API
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart items to local storage whenever they change
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    router.push('/businesses/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart to proceed to checkout.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <div>
        {cartItems.map((cartItem) => (
          <OrderItem
            key={cartItem.product.id}
            item={cartItem.product}
            quantity={cartItem.quantity}
            onQuantityChange={(quantity) =>
              handleQuantityChange(cartItem.product.id, quantity)
            }
            onRemove={() => handleRemoveItem(cartItem.product.id)}
          />
        ))}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>Total: Ksh {calculateTotal()}</strong>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;