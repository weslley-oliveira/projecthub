import { Address, Contact, Rate } from './common';

// Define types for project-related data

export type { Contact };

export interface AddressData extends Address {}

export interface ProjectRequirements {
  cscsCard: boolean;
  fullPPE: boolean;
  additionalRequirements?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "Active" | "On Leave" | "Unavailable";
  finishedTime?: string;
  address?: Address;
  contact?: Contact;
  workforce?: WorkforceType[];
  requirements?: ProjectRequirements;
}

export interface WorkforceType {
  type: "Fitter" | "Porter" | "Driver" | "Supervisor";
  quantity: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "Pending" | "Confirmed" | "In Progress" | "Completed" | "Canceled";
  team: TeamMember[];
  startTime?: string;
  finishedTime?: string;
  address?: Address;
  contact?: Contact;
  workforce?: WorkforceType[];
} 