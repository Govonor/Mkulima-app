// frontend/pages/businesses/checkout.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Product } from '../../types/product';
import { api } from '../../utils/api';
import { DeliveryCreate } from '../../types/delivery'; // Import DeliveryCreate type
import { User } from '../../types/user'; // Import User type
import { AuthService } from '../../services/authService'; // Import AuthService

interface CartItem {
  product: Product;
  quantity: number;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load cart items from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    // Load user data
    const currentUser = AuthService.getUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setError('You must be logged in to place an order.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Create order in backend
      const orderResponse = await api.post('/orders', {
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        total: calculateTotal(),
        businessId: user.id,
      });

      const orderId = orderResponse.data.id;

      // Create delivery in backend
      const deliveryData: DeliveryCreate = {
        orderId: orderId,
        farmerId: cartItems[0].product.farmerId, // Assuming all items from same farmer for simplicity
        businessId: user.id,
        deliveryAddress: (user as any).deliveryAddress, // Type assertion
        deliveryDate: new Date().toISOString().split('T')[0], // Today's date
        deliveryTime: '10:00', // Default time
        deliveryStatus: 'pending',
        deliveryFee: 100, // Example fee
      };

      await api.post('/deliveries', deliveryData);

      // Clear cart
      localStorage.removeItem('cart');
      setCartItems([]);

      router.push('/businesses/orders'); // Redirect to orders page
    } catch (err: any) {
      setError(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Placing order...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (cartItems.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Your cart is empty.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.product.id} style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
            {item.product.name} - Quantity: {item.quantity} - Price: Ksh {item.product.price * item.quantity}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>Total: Ksh {calculateTotal()}</strong>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;