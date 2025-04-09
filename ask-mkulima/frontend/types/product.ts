// Define the Product interface with all required fields
export interface Product {
  id: number; // Unique identifier for the product
  name: string; // Name of the product
  description?: string; // Optional description of the product
  price: number; // Price of the product
  unit: string; // Unit of the product (e.g., kg, bunch, piece)
  category: string; // Category the product belongs to (e.g., fruits, vegetables, grains)
  images?: string[]; // Array of image URLs (optional)
  farmerId: number; // ID of the farmer who listed the product
  availability: boolean; // Whether the product is available or not
  createdAt: string; // ISO string representing the product's creation date
  updatedAt: string; // ISO string representing the last update of the product
  certifications?: string[]; // Optional certifications (e.g., organic, fair trade)
  storageInstructions?: string; // Optional instructions for storing the product
  harvestDate?: string; // Date when the product was harvested
  quantityAvailable: number; // Quantity of the product available for sale
}

// Define the interface for creating a new product
export interface ProductCreate {
  name: string; // Name of the product
  description?: string; // Optional description
  price: number; // Price of the product
  unit: string; // Unit of the product (e.g., kg, bunch, piece)
  category: string; // Category (e.g., fruits, vegetables, grains)
  images?: string[]; // Array of image URLs (optional)
  farmerId: number; // Farmer ID who is listing the product
  availability: boolean; // Availability status of the product
  certifications?: string[]; // Optional certifications (e.g., organic, fair trade)
  storageInstructions?: string; // Storage instructions
  harvestDate?: string; // Harvest date
  quantityAvailable: number; // Quantity available for sale
}

// Define the interface for updating an existing product
export interface ProductUpdate {
  name?: string; // New name for the product (optional)
  description?: string; // New description (optional)
  price?: number; // New price (optional)
  unit?: string; // New unit (optional)
  category?: string; // New category (optional)
  images?: string[]; // New set of images (optional)
  availability?: boolean; // New availability status (optional)
  certifications?: string[]; // New certifications (optional)
  storageInstructions?: string; // New storage instructions (optional)
  harvestDate?: string; // New harvest date (optional)
  quantityAvailable?: number; // New available quantity (optional)
}
