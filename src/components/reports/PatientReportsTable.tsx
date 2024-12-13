import React, { useState } from 'react';
import { format } from 'date-fns';
import { Download, Upload, Trash2, X } from 'lucide-react';
import { Report, Patient } from '../../types';
import { ReportStatus } from './ReportStatus';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';

interface PatientReportsTableProps {
  reports: Report[];
  patients: Patient[];
  currentUserIsAdmin: boolean;
  onUploadClick: (invoiceId: string) => void;
  onDeletePatient: (prn: string) => void;
}

export const PatientReportsTable: React.FC<PatientReportsTableProps> = ({
  reports,
  patients,
  currentUserIsAdmin,
  onUploadClick,
  onDeletePatient,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (prn: string) => {
    onDeletePatient(prn);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Details
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Number
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map(report => {
                const patient = patients.find(p => p.prn === report.patientId);
                if (!patient) return null;

                return (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {`${patient.title} ${patient.firstName} ${patient.lastName}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        PRN: {patient.prn}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.invoiceId}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <ReportStatus status={report.status} />
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.uploadDate ? format(new Date(report.uploadDate), 'dd-MMM-yyyy') : '-'}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col md:flex-row gap-2">
                        {report.reportUrl && (
                          <a
                            href={report.reportUrl}
                            download
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </a>
                        )}
                        {currentUserIsAdmin && (
                          <>
                            {report.status !== 'completed' && (
                              <button
                                onClick={() => onUploadClick(report.invoiceId)}
                                className="text-blue-600 hover:text-blue-900 flex items-center"
                              >
                                <Upload className="w-4 h-4 mr-1" />
                                Upload Report
                              </button>
                            )}
                            {showDeleteConfirm === patient.prn ? (
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleDelete(patient.prn)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setShowDeleteConfirm(null)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setShowDeleteConfirm(patient.prn)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};