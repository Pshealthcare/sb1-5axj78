export const isPositiveNumber = (value: number): boolean => {
  return typeof value === 'number' && !isNaN(value) && value > 0;
};

export const isValidAmount = (amount: number): boolean => {
  return isPositiveNumber(amount) && Number.isFinite(amount);
};

export const isValidDiscount = (discount: number, total: number): boolean => {
  return isValidAmount(discount) && discount <= total;
};

export const isValidPhoneNumber = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};