import React from 'react';
import { Report } from '../../types';

interface ReportStatusProps {
  status: Report['status'];
}

export const ReportStatus: React.FC<ReportStatusProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Under Process';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor()}`}>
      {getStatusText()}
    </span>
  );
};