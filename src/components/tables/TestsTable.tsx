import React from 'react';
import { DataTable } from './DataTable';
import { Test } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';

interface TestsTableProps {
  tests: Test[];
  onEdit?: (test: Test) => void;
  onDelete?: (test: Test) => void;
}

export const TestsTable: React.FC<TestsTableProps> = ({
  tests,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { header: 'Code', accessor: 'code' },
    { header: 'Name', accessor: 'name' },
    { 
      header: 'MRP', 
      accessor: (test: Test) => Number(test.mrp).toFixed(2) 
    },
    { 
      header: 'Offer Price', 
      accessor: (test: Test) => Number(test.offerPrice).toFixed(2) 
    },
    {
      header: 'Actions',
      accessor: (test: Test) => (
        <div className="flex space-x-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(test);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                onDelete(test);
              }}
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

  return <DataTable columns={columns} data={tests} />;
};