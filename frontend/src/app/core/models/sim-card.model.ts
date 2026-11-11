import { Customer } from './customer.model';

export type SimType = 'PHYSICAL' | 'ESIM';
export type SimStatus = 'IN_STOCK' | 'RESERVED' | 'ASSIGNED' | 'ACTIVE' | 'SUSPENDED' | 'TERMINATED';

export interface SimCard {
  id: number;
  iccid: string;
  imsi?: string;
  type: SimType;
  status: SimStatus;
  note?: string;
  customerId?: number;
  customerName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SimCardRequest {
  iccid: string;
  imsi?: string;
  type: SimType;
  status?: SimStatus;
  note?: string;
  customerId?: number;
}
