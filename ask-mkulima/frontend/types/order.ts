import { Product } from './product';
import { Delivery } from './delivery'; 

export interface OrderItem {
  productId: number;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: number;
  businessId: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'returned';
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  orderNumber?: string; // Unique order number for tracking
  deliveryId?: number; // Reference to the delivery associated with the order
  delivery?: Delivery; // The full delivery object if fetched.
  paymentId?: number; // Reference to the payment associated with the order
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string; // Any additional notes about the order
  customerNotes?: string; // Notes added by the customer during checkout
  shippingAddress?: string; // Shipping address (if different from business address)
  billingAddress?: string; // Billing address
  discountAmount?: number; // Discount applied to the order
  taxAmount?: number; // Tax applied to the order
  shippingCost?: number; // Shipping cost
  estimatedDeliveryDate?: string; // Estimated delivery date
  actualDeliveryDate?: string; // Actual delivery date
  // Add other order-related properties
}

export interface OrderCreate {
  businessId: number;
  total: number;
  items: { productId: number; quantity: number }[];
  customerNotes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  discountAmount?: number;
  taxAmount?: number;
  shippingCost?: number;
  estimatedDeliveryDate?: string;
}

export interface OrderUpdate {
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'returned';
  total?: number;
  items?: { productId: number; quantity: number }[];
  businessId?: number;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  discountAmount?: number;
  taxAmount?: number;
  shippingCost?: number;
  actualDeliveryDate?: string;
}