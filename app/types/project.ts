// Define types for project-related data

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  department: string;
  status: "Active" | "On Leave" | "Unavailable";
}

export interface Contact {
  name: string;
  phone: string;
}

export interface WorkforceType {
  type: "Fitter" | "Porter" | "Driver" | "Supervisor";
  quantity: number;
}

export interface AddressData {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
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
  address?: AddressData;
  contact?: Contact;
  workforce?: WorkforceType[];
} 