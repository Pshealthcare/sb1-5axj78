import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../store';
import { Payment } from '../../types/payment';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { X } from 'lucide-react';

interface PaymentModalProps {
  invoiceId: string;
  balanceAmount: number;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  invoiceId,
  balanceAmount,
  onClose
}) => {
  const { addPayment, currentUser } = useStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Omit<Payment, 'id' | 'paymentDate'>>();
  const paymentMode = watch('paymentMode');

  const onSubmit = (data: Omit<Payment, 'id' | 'paymentDate'>) => {
    const payment: Payment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      invoiceId,
      paymentDate: new Date().toISOString(),
      receivedBy: currentUser?.name || 'Unknown'
    };

    addPayment(payment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Record Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Balance Amount: ₹{balanceAmount.toFixed(2)}
            </label>
          </div>

          <Input
            type="number"
            label="Payment Amount"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 1, message: 'Amount must be greater than 0' },
              max: { value: balanceAmount, message: 'Amount cannot exceed balance' }
            })}
            error={errors.amount?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
            <select
              {...register('paymentMode', { required: 'Payment mode is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
            </select>
            {errors.paymentMode && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentMode.message}</p>
            )}
          </div>

          {paymentMode === 'UPI' && (
            <Input
              label="UPI Transaction ID"
              {...register('upiTransactionId', {
                required: 'UPI Transaction ID is required for UPI payments'
              })}
              error={errors.upiTransactionId?.message}
            />
          )}

          <Input
            label="Remarks"
            {...register('remarks')}
            placeholder="Optional remarks"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Record Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};