import React, { useState } from 'react';
import { Employee } from '../types';
import { useStore } from '../store';
import { Card, CardHeader, CardContent } from './common/Card';
import { EmployeeForm } from './employees/EmployeeForm';
import { EmployeeList } from './employees/EmployeeList';
import { DeleteConfirmDialog } from './common/DeleteConfirmDialog';

export const EmployeeRegistration: React.FC = () => {
  const { employees, addEmployee, removeEmployee } = useStore();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Employee | null>(null);

  const handleSubmit = (data: Omit<Employee, 'id'>) => {
    const employeeData: Employee = {
      ...data,
      id: editingEmployee?.id || Math.random().toString(36).substr(2, 9)
    };

    if (editingEmployee) {
      removeEmployee(editingEmployee.id);
    }
    
    addEmployee(employeeData);
    setEditingEmployee(null);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = (employee: Employee) => {
    setShowDeleteConfirm(employee);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      removeEmployee(showDeleteConfirm.id);
      if (editingEmployee?.id === showDeleteConfirm.id) {
        setEditingEmployee(null);
      }
      setShowDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Registration</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 md:sticky md:top-4 self-start">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h3>
          </CardHeader>
          <CardContent>
            <EmployeeForm
              onSubmit={handleSubmit}
              editingEmployee={editingEmployee}
              onCancelEdit={() => setEditingEmployee(null)}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent>
            <EmployeeList
              employees={employees}
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
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
      />
    </div>
  );
};