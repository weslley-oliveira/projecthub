import { Customer, CustomerContact, CustomerAddress } from "@/app/types/customer";

export interface Rate {
  weekdays: { [key: string]: number };
  saturday: { [key: string]: number };
  sunday: { [key: string]: number };
}

// Extendendo a interface Customer para incluir campos específicos do mock
export interface MockCustomer extends Customer {
  totalSpent: number;
  projectsCount: number;
  rate?: Rate;
}

export const mockCustomers: MockCustomer[] = [
  {
    id: "1",
    name: "João Silva",
    status: "Active",
    createdAt: "2024-03-04",
    updatedAt: "2024-03-04",
    contact: {
      name: "João Silva",
      phone: "(11) 99999-9999",
      email: "joao@empresa.com"
    },
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      city: "São Paulo",
      postcode: "01001-000",
      country: "Brasil"
    },
    projects: ["1", "2", "3"],
    totalSpent: 15000,
    projectsCount: 3
  },
  {
    id: "2",
    name: "Maria Santos",
    status: "Active",
    createdAt: "2024-03-03",
    updatedAt: "2024-03-03",
    contact: {
      name: "Maria Santos",
      phone: "(11) 98888-8888",
      email: "maria@empresa.com"
    },
    address: {
      street: "Av. Paulista",
      number: "1000",
      complement: "Sala 101",
      city: "São Paulo",
      postcode: "01310-100",
      country: "Brasil"
    },
    projects: ["4", "5", "6", "7", "8"],
    totalSpent: 25000,
    projectsCount: 5
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    status: "Inactive",
    createdAt: "2024-03-02",
    updatedAt: "2024-03-02",
    contact: {
      name: "Pedro Oliveira",
      phone: "(11) 97777-7777",
      email: "pedro@empresa.com"
    },
    address: {
      street: "Rua Augusta",
      number: "456",
      complement: "Loja 12",
      city: "São Paulo",
      postcode: "01001-000",
      country: "Brasil"
    },
    projects: ["9", "10"],
    totalSpent: 8000,
    projectsCount: 2
  }
];

export const getCustomerById = (id: string): MockCustomer | undefined => {
  return mockCustomers.find(customer => customer.id === id);
};

export const addCustomer = (customer: Omit<MockCustomer, "id" | "createdAt" | "updatedAt" | "totalSpent" | "projectsCount">): MockCustomer => {
  const newCustomer: MockCustomer = {
    ...customer,
    id: String(mockCustomers.length + 1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalSpent: 0,
    projectsCount: 0
  };
  mockCustomers.push(newCustomer);
  return newCustomer;
};

export const updateCustomer = (id: string, customer: Partial<MockCustomer>): MockCustomer | undefined => {
  const index = mockCustomers.findIndex(c => c.id === id);
  if (index === -1) return undefined;

  mockCustomers[index] = {
    ...mockCustomers[index],
    ...customer,
    updatedAt: new Date().toISOString()
  };
  return mockCustomers[index];
};

export const deleteCustomer = (id: string): boolean => {
  const index = mockCustomers.findIndex(c => c.id === id);
  if (index === -1) return false;

  mockCustomers.splice(index, 1);
  return true;
}; 