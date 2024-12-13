import React, { useState } from 'react';
import { useStore } from '../store';
import { InvoicePDF } from './InvoicePDF';
import { Trash2, FileDown, Search, IndianRupee } from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { Card } from './common/Card';
import { PaymentModal } from './payments/PaymentModal';
import { PaymentHistory } from './payments/PaymentHistory';

export const PatientSummary: React.FC = () => {
  const { 
    patients, 
    invoices, 
    removePatient, 
    getTotalPaidAmount 
  } = useStore();
  
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.date);
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    const patient = patients.find(p => p.prn === invoice.patientId);

    if (fromDate && toDate) {
      if (!(invoiceDate >= fromDate && invoiceDate <= toDate)) {
        return false;
      }
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
        (patient && (
          patient.prn.toLowerCase().includes(searchLower) ||
          patient.firstName.toLowerCase().includes(searchLower) ||
          patient.lastName.toLowerCase().includes(searchLower) ||
          patient.mobileNumber.includes(searchTerm)
        ))
      );
    }

    return true;
  });

  const handleDeletePatient = (prn: string) => {
    removePatient(prn);
    setShowConfirmDelete(null);
  };

  const exportToExcel = () => {
    const exportData = filteredInvoices.map(invoice => {
      const patient = patients.find(p => p.prn === invoice.patientId);
      if (!patient) return null;

      const totalPaid = getTotalPaidAmount(invoice.invoiceNumber);
      const balanceAmount = invoice.grossAmount - invoice.discountAmount - totalPaid;

      return {
        'Date': format(new Date(invoice.date), 'dd-MMM-yyyy'),
        'PRN': patient.prn,
        'Invoice No': invoice.invoiceNumber,
        'Patient Name': `${patient.title} ${patient.firstName} ${patient.lastName}`,
        'Age': patient.age,
        'Gender': patient.gender,
        'Mobile': patient.mobileNumber,
        'Address': patient.address,
        'Ref Doctor': invoice.refDoctor,
        'Gross Amount': invoice.grossAmount,
        'Discount Amount': invoice.discountAmount,
        'Discount Remark': invoice.discountRemark || '',
        'Paid Amount': totalPaid,
        'Balance Amount': balanceAmount,
        'Payment Mode': invoice.paymentMode,
        'Registered By': invoice.registeredBy
      };
    }).filter(Boolean);

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patient Summary');

    const fromDate = dateRange.from ? format(new Date(dateRange.from), 'dd-MM-yyyy') : 'all';
    const toDate = dateRange.to ? format(new Date(dateRange.to), 'dd-MM-yyyy') : 'all';
    const fileName = `patient-summary_${fromDate}_to_${toDate}.xlsx`;

    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Summary</h2>
        <button
          onClick={exportToExcel}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export to Excel
        </button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Date</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To Date</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Search</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by PRN, Invoice, Name or Mobile"
                className="block w-full pl-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PRN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice, index) => {
                  const patient = patients.find(p => p.prn === invoice.patientId);
                  if (!patient) return null;

                  const totalPaid = getTotalPaidAmount(invoice.invoiceNumber);
                  const balanceAmount = invoice.grossAmount - invoice.discountAmount - totalPaid;
                  
                  return (
                    <tr key={invoice.invoiceNumber} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {format(new Date(invoice.date), 'dd-MMM-yyyy')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {patient.prn}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {`${patient.title} ${patient.firstName} ${patient.lastName}`}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {invoice.grossAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {invoice.discountAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {totalPaid.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {balanceAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          onClick={() => setSelectedInvoice(index)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Invoice
                        </button>
                        {balanceAmount > 0 && (
                          <button
                            onClick={() => setShowPaymentModal(invoice.invoiceNumber)}
                            className="text-green-600 hover:text-green-900 inline-flex items-center"
                          >
                            <IndianRupee className="w-4 h-4 mr-1" />
                            Add Payment
                          </button>
                        )}
                        <button
                          onClick={() => setShowConfirmDelete(patient.prn)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {selectedInvoice !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 h-5/6 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Invoice Preview</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <InvoicePDF
              invoice={filteredInvoices[selectedInvoice]}
              patient={patients.find(p => p.prn === filteredInvoices[selectedInvoice].patientId)!}
            />
          </div>
        </div>
      )}

      {showPaymentModal && (
        <PaymentModal
          invoiceId={showPaymentModal}
          balanceAmount={
            (() => {
              const invoice = invoices.find(i => i.invoiceNumber === showPaymentModal);
              if (!invoice) return 0;
              const totalPaid = getTotalPaidAmount(invoice.invoiceNumber);
              return invoice.grossAmount - invoice.discountAmount - totalPaid;
            })()
          }
          onClose={() => setShowPaymentModal(null)}
        />
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this patient? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDelete(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePatient(showConfirmDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};