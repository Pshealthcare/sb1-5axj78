import { Test } from './medical';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  mobileNumber: string;
  doctorId?: string;
  assignedTo?: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'follow-up' | 'test' | 'home-collection';
  address?: string;
  notes?: string;
  tests?: Test[];
  amount?: number;
  createdBy: string;
  createdAt: string;
  redirectToBilling?: boolean;
}