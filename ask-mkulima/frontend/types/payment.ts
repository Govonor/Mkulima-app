// frontend/types/payment.ts

export interface Payment {
    id: number;
    orderId: number;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentMethod: string; // e.g., M-Pesa, Credit Card, Bank Transfer
    paymentDate: string; // ISO string representing the payment date
    transactionId?: string; // Optional transaction ID
    notes?: string; // Optional notes about the payment
    // Add other payment-related properties
  }
  
  export interface PaymentCreate {
    orderId: number;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentMethod: string;
    paymentDate: string;
    transactionId?: string;
    notes?: string;
  }
  
  export interface PaymentUpdate {
    status?: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
    notes?: string;
  }