export interface Rate {
  weekdays: { [key: string]: number };
  saturday: { [key: string]: number };
  sunday: { [key: string]: number };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: "active" | "inactive";
  createdAt: string;
  totalSpent: number;
  projects: number;
  rate?: Rate;
}

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "(11) 99999-9999",
    company: "Empresa ABC",
    address: "Rua das Flores, 123 - São Paulo, SP",
    status: "active",
    createdAt: "2024-03-04",
    totalSpent: 15000,
    projects: 3
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@empresa.com",
    phone: "(11) 98888-8888",
    company: "Empresa XYZ",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    status: "active",
    createdAt: "2024-03-03",
    totalSpent: 25000,
    projects: 5
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@empresa.com",
    phone: "(11) 97777-7777",
    company: "Empresa 123",
    address: "Rua Augusta, 456 - São Paulo, SP",
    status: "inactive",
    createdAt: "2024-03-02",
    totalSpent: 8000,
    projects: 2
  }
];

export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.id === id);
};

export const addCustomer = (customer: Omit<Customer, "id" | "createdAt" | "totalSpent" | "projects">): Customer => {
  const newCustomer: Customer = {
    ...customer,
    id: String(mockCustomers.length + 1),
    createdAt: new Date().toISOString(),
    totalSpent: 0,
    projects: 0
  };
  mockCustomers.push(newCustomer);
  return newCustomer;
};

export const updateCustomer = (id: string, customer: Partial<Customer>): Customer | undefined => {
  const index = mockCustomers.findIndex(c => c.id === id);
  if (index === -1) return undefined;

  mockCustomers[index] = {
    ...mockCustomers[index],
    ...customer
  };
  return mockCustomers[index];
};

export const deleteCustomer = (id: string): boolean => {
  const index = mockCustomers.findIndex(c => c.id === id);
  if (index === -1) return false;

  mockCustomers.splice(index, 1);
  return true;
}; 