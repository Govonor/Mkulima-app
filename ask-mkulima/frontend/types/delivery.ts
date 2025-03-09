export interface Delivery {
    id: number;
    orderId: number; // Reference to the order
    farmerId: number; // Reference to the farmer
    businessId: number; // Reference to the business
    deliveryAddress: string;
    deliveryDate: string;
    deliveryTime: string;
    deliveryStatus: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
    trackingNumber?: string; // Tracking number from a delivery service
    deliveryService?: string; // Name of the delivery service (e.g., Sendy, Glovo)
    estimatedArrivalTime?: string;
    actualArrivalTime?: string;
    deliveryFee: number;
    notes?: string; // Any additional notes about the delivery
    // Add other delivery-related properties
  }
  
  export interface DeliveryUpdate {
    deliveryStatus?: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
    trackingNumber?: string;
    deliveryService?: string;
    estimatedArrivalTime?: string;
    actualArrivalTime?: string;
    deliveryFee?: number;
    notes?: string;
  }
  
  export interface DeliveryCreate {
    orderId: number;
    farmerId: number;
    businessId: number;
    deliveryAddress: string;
    deliveryDate: string;
    deliveryTime: string;
    deliveryStatus: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
    trackingNumber?: string;
    deliveryService?: string;
    estimatedArrivalTime?: string;
    actualArrivalTime?: string;
    deliveryFee: number;
    notes?: string;
  }