export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}
