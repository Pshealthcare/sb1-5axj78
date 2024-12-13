export interface Test {
  code: string;
  name: string;
  mrp: number;
  offerPrice: number;
}

export interface Invoice {
  invoiceNumber: string;
  patientId: string;
  date: string;
  tests: Test[];
  grossAmount: number;
  discountAmount: number;
  discountRemark?: string;
  paidAmount: number;
  balanceAmount: number;
  paymentMode: string;
  upiTransactionId?: string;
  refDoctor: string;
  registeredBy: string;
}

export interface Report {
  id: string;
  patientId: string;
  invoiceId: string;
  reportUrl: string;
  uploadedBy: string;
  uploadDate: string;
  reportType: string;
  status: 'pending' | 'processing' | 'completed';
  testResults?: {
    testCode: string;
    testName: string;
    result: string;
    normalRange?: string;
    remarks?: string;
  }[];
}