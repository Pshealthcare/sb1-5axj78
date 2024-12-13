import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { Invoice, Patient } from '../../types';
import { styles } from './styles/invoiceStyles';
import { numberToWords } from '../../utils/numberToWords';
import { InvoiceHeader } from './components/InvoiceHeader';
import { InvoiceDivider } from './components/InvoiceDivider';
import { PatientInfo } from './components/PatientInfo';
import { TestsTable } from './components/TestsTable';
import { InvoiceSummary } from './components/InvoiceSummary';
import { InvoiceFooter } from './components/InvoiceFooter';
import { DEFAULT_SETTINGS } from '../../store/constants';

interface InvoiceDocumentProps {
  invoice: Invoice;
  patient: Patient;
}

export const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ 
  invoice, 
  patient
}) => {
  const { hospitalName, address, contactNumber } = DEFAULT_SETTINGS.general;
  const amountInWords = numberToWords(Number(invoice.paidAmount) || 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceHeader
          hospitalName={hospitalName}
          address={address}
          phone={contactNumber}
        />

        <InvoiceDivider text="Healthcare Invoice" />

        <PatientInfo
          patient={patient}
          invoice={invoice}
        />

        <TestsTable tests={invoice.tests} />

        <InvoiceSummary
          grossAmount={Number(invoice.grossAmount) || 0}
          discountAmount={Number(invoice.discountAmount) || 0}
          paidAmount={Number(invoice.paidAmount) || 0}
          balanceAmount={Number(invoice.balanceAmount) || 0}
          amountInWords={amountInWords}
          discountRemark={invoice.discountRemark}
        />

        <InvoiceFooter />
      </Page>
    </Document>
  );
};