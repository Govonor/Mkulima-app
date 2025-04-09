import React from "react";
import { useCart } from "@/stores/useCart";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const BusinessCartPage = () => {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 border-b pb-4 sm:flex-row flex-col"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              )}

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Ksh {item.price.toFixed(2)} per unit
                </p>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-20 border px-2 py-1 rounded"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">
              Total: Ksh {getTotal().toFixed(2)}
            </p>
            <Button
              className="mt-4"
              onClick={() => router.push("/businesses/checkout")}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessCartPage;
