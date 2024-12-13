import React from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { Invoice, Patient } from '../types';
import { InvoiceDocument } from './invoice/InvoiceDocument';

interface InvoicePDFProps {
  invoice: Invoice;
  patient: Patient;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = (props) => {
  const handleDownload = async () => {
    const blob = await pdf(<InvoiceDocument {...props} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${props.patient.firstName}_${props.patient.lastName}_Invoice.pdf`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <PDFViewer style={{ width: '100%', height: '80vh' }}>
        <InvoiceDocument {...props} />
      </PDFViewer>
      <button
        onClick={handleDownload}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Download PDF
      </button>
    </div>
  );
};