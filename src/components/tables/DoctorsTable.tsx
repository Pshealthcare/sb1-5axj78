import React from 'react';
import { DataTable } from './DataTable';
import { Doctor } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';

interface DoctorsTableProps {
  doctors: Doctor[];
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (doctor: Doctor) => void;
}

export const DoctorsTable: React.FC<DoctorsTableProps> = ({
  doctors,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Specialization', accessor: 'specialization' },
    { header: 'Contact', accessor: 'contactNumber' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Actions',
      accessor: (doctor: Doctor) => (
        <div className="flex space-x-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(doctor)}
              className="flex items-center"
            >
              <Pencil size={16} className="mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(doctor)}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={doctors} />;
};