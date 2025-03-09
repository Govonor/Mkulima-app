// frontend/types/user.ts

export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'farmer' | 'business';
    token?: string;
    isVerified?: boolean;
    // Common user properties
  }
  
  export interface Farmer extends User {
    farmName: string;
    farmLocation: string;
    farmSize: number;
    primaryCrops: string[];
    farmingPractices: string[];
    certifications?: string[];
    contactNumber: string;
    deliveryCapabilities: boolean;
    paymentMethods: string[];
    registrationNumber?: string;
    produceImages?: string[];
    yearsOfExperience: number;
    storageFacilities: boolean;
    transportationAvailability: boolean;
    deliveryRadius?: number; // Maximum distance the farmer can deliver (in km)
    preferredDeliveryDays?: string[]; // Days of the week the farmer prefers to deliver
    preferredDeliveryTimes?: string[]; // Time slots the farmer prefers for deliveries
    deliveryVehicles?: string[]; // Types of vehicles the farmer uses for delivery
    // Add other farmer-specific properties
  }
  
  export interface Business extends User {
    businessName: string;
    businessLocation: string;
    businessType: string;
    contactNumber: string;
    deliveryAddress: string;
    preferredPaymentMethods: string[];
    businessRegistrationNumber?: string;
    deliveryInstructions?: string; // Special instructions for delivery
    preferredDeliveryDays?: string[]; // Days of the week the business prefers deliveries
    preferredDeliveryTimes?: string[]; // Time slots the business prefers for deliveries
    // Add other business-specific properties
  }