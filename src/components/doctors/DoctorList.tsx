import React from 'react';
import { Doctor } from '../../types';
import { DoctorsTable } from '../tables/DoctorsTable';
import { SearchInput } from '../common/SearchInput';
import { Search } from 'lucide-react';

interface DoctorListProps {
  doctors: Doctor[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
}

export const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete
}) => {
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Registered Doctors</h3>
        <div className="relative w-64">
          <SearchInput
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </div>

      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        <DoctorsTable
          doctors={filteredDoctors}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};