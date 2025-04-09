// frontend/pages/businesses/checkout.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "../../types/product";
import { api } from "../../utils/api";
import { DeliveryCreate } from "../../types/delivery";
import { User } from "../../types/user";
import { AuthService } from "../../services/authService";
import { Button } from "@/components/ui/button";

interface CartItem {
  product: Product;
  quantity: number;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [deliveryProvider, setDeliveryProvider] = useState("Sendy");
  const [paymentMethod, setPaymentMethod] = useState("M-Pesa");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

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
      setError("You must be logged in to place an order.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderResponse = await api.post("/orders", {
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        total: calculateTotal(),
        businessId: user.id,
        paymentMethod,
      });

      const orderId = orderResponse.data.id;

      const deliveryData: DeliveryCreate = {
        orderId,
        farmerId: cartItems[0].product.farmerId,
        businessId: user.id,
        deliveryAddress: (user as any).deliveryAddress || "Nairobi CBD",
        deliveryDate: new Date().toISOString().split("T")[0],
        deliveryTime: "10:00",
        deliveryStatus: "pending",
        deliveryFee: 100,
        provider: deliveryProvider,
      };

      await api.post("/deliveries", deliveryData);

      localStorage.removeItem("cart");
      setCartItems([]);

      router.push("/businesses/orders");
    } catch (err: any) {
      setError(err.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Placing order...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600 font-medium">
        Error: {error}
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-6 text-gray-600">Your cart is empty.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Checkout</h1>

      <div className="space-y-4 border-b pb-4">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} x Ksh {item.product.price}
              </p>
            </div>
            <p className="font-bold">
              Ksh {item.product.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right font-semibold text-lg">
        Total: Ksh {calculateTotal()}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block font-medium mb-1">🚚 Delivery Provider</label>
          <select
            className="w-full p-2 border rounded"
            value={deliveryProvider}
            onChange={(e) => setDeliveryProvider(e.target.value)}
          >
            <option value="Sendy">Sendy</option>
            <option value="Glovo">Glovo</option>
            <option value="Panda">Panda</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">💳 Payment Method</label>
          <select
            className="w-full p-2 border rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="M-Pesa">M-Pesa</option>
            <option value="Stripe">Stripe</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        <Button onClick={handlePlaceOrder} className="w-full mt-4">
          ✅ Confirm & Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
