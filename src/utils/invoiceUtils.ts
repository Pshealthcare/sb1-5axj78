export const generateInvoiceNumber = (invoiceCount: number): string => {
  const sequence = invoiceCount.toString().padStart(8, '0');
  return `VIR${sequence}`;
};