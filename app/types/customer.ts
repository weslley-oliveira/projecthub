// Define types for customer-related data

export interface CustomerContact {
  name: string;
  phone: string;
  email: string;
}

export interface CustomerAddress {
  street: string;
  number: string;
  complement?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Rate {
  weekdays: { [key: string]: number };
  saturday: { [key: string]: number };
  sunday: { [key: string]: number };
}

export interface Customer {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
  updatedAt: string;
  contact: CustomerContact;
  address: CustomerAddress;
  rate?: Rate;
  projects?: string[]; // Array de IDs dos projetos associados
} 