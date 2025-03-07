// Tipos compartilhados entre diferentes módulos da aplicação

export interface Address {
  street: string;
  number: string;
  complement?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Contact {
  name: string;
  phone: string;
  email?: string;
}

export interface Rate {
  weekdays: { [key: string]: number };
  saturday: { [key: string]: number };
  sunday: { [key: string]: number };
} 