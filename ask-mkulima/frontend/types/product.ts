// frontend/types/product.ts

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    unit: string; // e.g., kg, bunch, piece
    category: string; // e.g., fruits, vegetables, grains
    images?: string[]; // Array of image URLs
    farmerId: number; // ID of the farmer who listed the product
    availability: boolean; // Indicates if the product is currently available
    createdAt: string; // ISO string representing the creation date
    updatedAt: string; // ISO string representing the last update date
    certifications?: string[]; // Optional certifications (e.g., organic)
    storageInstructions?: string; // Instructions for storing the product
    harvestDate?: string; // Date when the product was harvested
    quantityAvailable: number; // The amount of the product that is available.
    // Add other product-related properties
  }
  
  export interface ProductCreate {
    name: string;
    description?: string;
    price: number;
    unit: string;
    category: string;
    images?: string[];
    farmerId: number;
    availability: boolean;
    certifications?: string[];
    storageInstructions?: string;
    harvestDate?: string;
    quantityAvailable: number;
  }
  
  export interface ProductUpdate {
    name?: string;
    description?: string;
    price?: number;
    unit?: string;
    category?: string;
    images?: string[];
    availability?: boolean;
    certifications?: string[];
    storageInstructions?: string;
    harvestDate?: string;
    quantityAvailable?: number;
  }