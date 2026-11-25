export interface SimAssignmentHistory {
  id: number;
  simCardId: number;
  iccid: string;
  customerId?: number;
  customerName?: string;
  assignedAt: string;
  unassignedAt?: string;
  active: boolean;
  note?: string;
}
