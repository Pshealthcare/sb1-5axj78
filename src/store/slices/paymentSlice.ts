import { Payment, PaymentHistory } from '../../types/payment';

export interface PaymentState {
  paymentHistory: PaymentHistory[];
}

export interface PaymentActions {
  addPayment: (payment: Payment) => void;
  getPaymentHistory: (invoiceId: string) => Payment[];
  getTotalPaidAmount: (invoiceId: string) => number;
}

export const createPaymentSlice = (set: any, get: any) => ({
  paymentHistory: [],

  addPayment: (payment: Payment) =>
    set((state: PaymentState) => {
      const existingHistory = state.paymentHistory.find(h => h.invoiceId === payment.invoiceId);
      
      if (existingHistory) {
        return {
          paymentHistory: state.paymentHistory.map(h =>
            h.invoiceId === payment.invoiceId
              ? { ...h, payments: [...h.payments, payment] }
              : h
          )
        };
      }

      return {
        paymentHistory: [
          ...state.paymentHistory,
          { invoiceId: payment.invoiceId, payments: [payment] }
        ]
      };
    }),

  getPaymentHistory: (invoiceId: string) => {
    const history = get().paymentHistory.find((h: PaymentHistory) => h.invoiceId === invoiceId);
    return history?.payments || [];
  },

  getTotalPaidAmount: (invoiceId: string): number => {
    const payments = get().getPaymentHistory(invoiceId);
    return payments.reduce((sum: number, payment: Payment) => sum + Number(payment.amount), 0);
  }
});