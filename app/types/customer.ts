import { Address, Contact, Rate } from './common';

// Define types for customer-related data

export interface Customer {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
  updatedAt: string;
  contact: Contact;
  address: Address;
  rate?: Rate;
  projects?: string[]; // Array de IDs dos projetos associados
} 