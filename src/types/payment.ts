export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMode: string;
  paymentDate: string;
  upiTransactionId?: string;
  receivedBy: string;
  remarks?: string;
}

export interface PaymentHistory {
  invoiceId: string;
  payments: Payment[];
}