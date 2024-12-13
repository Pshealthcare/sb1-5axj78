import { format } from 'date-fns';

export const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '0.00';
  return numAmount.toFixed(2);
};

export const formatDate = (date: string): string => {
  try {
    return format(new Date(date), 'dd-MMM-yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return format(new Date(), 'dd-MMM-yyyy');
  }
};

export const formatPatientName = (title: string, firstName: string, lastName: string): string => {
  return [title, firstName, lastName].filter(Boolean).join(' ').trim();
};