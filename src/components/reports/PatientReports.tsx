import React, { useState } from 'react';
import { useStore } from '../../store';
import { Search } from 'lucide-react';
import { ReportUploadModal } from './ReportUploadModal';
import { PatientReportsTable } from './PatientReportsTable';
import { SearchInput } from '../common/SearchInput';

export const PatientReports: React.FC = () => {
  const { reports, patients, tests, currentUser, addReport, updateReport, removePatient } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const filteredReports = reports.filter(report => {
    const patient = patients.find(p => p.prn === report.patientId);
    if (!patient) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      patient.prn.toLowerCase().includes(searchLower) ||
      patient.firstName.toLowerCase().includes(searchLower) ||
      patient.lastName.toLowerCase().includes(searchLower) ||
      report.invoiceId.toLowerCase().includes(searchLower)
    );
  });

  const handleUpload = async (file: File, testResults: Report['testResults']) => {
    if (selectedInvoice) {
      const report = reports.find(r => r.invoiceId === selectedInvoice);
      if (report) {
        const fakeUrl = URL.createObjectURL(file);
        
        const updatedReport = {
          ...report,
          reportUrl: fakeUrl,
          uploadedBy: currentUser?.name || 'Unknown',
          uploadDate: new Date().toISOString(),
          status: 'completed',
          testResults
        } as Report;

        updateReport(updatedReport);
      }
    }
    setShowUploadModal(false);
    setSelectedInvoice(null);
  };

  const handleUploadClick = (invoiceId: string) => {
    setSelectedInvoice(invoiceId);
    setShowUploadModal(true);
  };

  const handleDeletePatient = (prn: string) => {
    if (window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      removePatient(prn);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Patient Reports</h2>

      <div className="mb-6">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by PRN, Name, or Invoice Number"
          icon={<Search className="w-5 h-5 text-gray-400" />}
        />
      </div>

      <PatientReportsTable
        reports={filteredReports}
        patients={patients}
        currentUserIsAdmin={currentUser?.role === 'admin'}
        onUploadClick={handleUploadClick}
        onDeletePatient={handleDeletePatient}
      />

      {showUploadModal && (
        <ReportUploadModal
          onClose={() => {
            setShowUploadModal(false);
            setSelectedInvoice(null);
          }}
          onUpload={handleUpload}
          tests={tests}
        />
      )}
    </div>
  );
};