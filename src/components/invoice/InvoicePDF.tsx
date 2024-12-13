import React, { Suspense } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Invoice, Patient } from '../../types';
import { InvoiceDocument } from './InvoiceDocument';
import { Button } from '../common/Button';
import { Download } from 'lucide-react';
import { registerFonts } from '../../utils/pdf/config';

// Register fonts immediately when this module loads
registerFonts();

// Lazy load PDFViewer to avoid SSR issues
const PDFViewer = React.lazy(() => import('@react-pdf/renderer').then(module => ({
  default: module.PDFViewer
})));

interface InvoicePDFProps {
  invoice: Invoice;
  patient: Patient;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, patient }) => {
  const handleDownload = async () => {
    try {
      // Create the PDF document
      const doc = <InvoiceDocument invoice={invoice} patient={patient} />;
      
      // Generate PDF blob
      const blob = await pdf(doc).toBlob();
      
      // Create download URL
      const url = URL.createObjectURL(blob);
      
      // Create and trigger download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${patient.firstName}_${patient.lastName}_Invoice_${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          onClick={handleDownload} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>
      
      <Suspense fallback={
        <div className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading PDF viewer...</span>
        </div>
      }>
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
          <InvoiceDocument invoice={invoice} patient={patient} />
        </PDFViewer>
      </Suspense>
    </div>
  );
};