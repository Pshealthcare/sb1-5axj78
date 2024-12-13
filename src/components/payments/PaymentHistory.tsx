import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../../store';
import { Payment } from '../../types/payment';

interface PaymentHistoryProps {
  invoiceId: string;
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ invoiceId }) => {
  const { getPaymentHistory } = useStore();
  const payments = getPaymentHistory(invoiceId);

  if (payments.length === 0) {
    return <p className="text-gray-500 text-sm">No payment history available</p>;
  }

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm text-gray-700">Payment History</h4>
      <div className="max-h-40 overflow-y-auto">
        {payments.map((payment: Payment) => (
          <div
            key={payment.id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded-md text-sm"
          >
            <div>
              <p className="font-medium">₹{payment.amount.toFixed(2)}</p>
              <p className="text-gray-500">{payment.paymentMode}</p>
              {payment.remarks && (
                <p className="text-gray-500 text-xs">{payment.remarks}</p>
              )}
            </div>
            <div className="text-right">
              <p>{format(new Date(payment.paymentDate), 'dd-MMM-yyyy')}</p>
              <p className="text-gray-500 text-xs">By: {payment.receivedBy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};