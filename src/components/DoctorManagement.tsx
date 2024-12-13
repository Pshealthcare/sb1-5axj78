import React, { useState } from 'react';
import { Doctor } from '../types';
import { useStore } from '../store';
import { Card, CardHeader, CardContent } from './common/Card';
import { DoctorForm } from './doctors/DoctorForm';
import { DoctorList } from './doctors/DoctorList';
import { DeleteConfirmDialog } from './common/DeleteConfirmDialog';

export const DoctorManagement: React.FC = () => {
  const { doctors, addDoctor, removeDoctor } = useStore();
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Doctor | null>(null);

  const handleSubmit = (data: Omit<Doctor, 'id'>) => {
    const doctorData: Doctor = {
      ...data,
      id: editingDoctor?.id || Math.random().toString(36).substr(2, 9)
    };

    if (editingDoctor) {
      removeDoctor(editingDoctor.id);
    }
    
    addDoctor(doctorData);
    setEditingDoctor(null);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
  };

  const handleDelete = (doctor: Doctor) => {
    setShowDeleteConfirm(doctor);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      removeDoctor(showDeleteConfirm.id);
      if (editingDoctor?.id === showDeleteConfirm.id) {
        setEditingDoctor(null);
      }
      setShowDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Doctor Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 md:sticky md:top-4 self-start">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
            </h3>
          </CardHeader>
          <CardContent>
            <DoctorForm
              onSubmit={handleSubmit}
              editingDoctor={editingDoctor}
              onCancelEdit={() => setEditingDoctor(null)}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent>
            <DoctorList
              doctors={doctors}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        message="Are you sure you want to delete this doctor? This action cannot be undone."
      />
    </div>
  );
};