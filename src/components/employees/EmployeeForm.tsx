import React from 'react';
import { useForm } from 'react-hook-form';
import { Employee } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface EmployeeFormProps {
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  editingEmployee,
  onCancelEdit
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Employee, 'id'>>({
    defaultValues: editingEmployee || undefined
  });

  const handleFormSubmit = (data: Omit<Employee, 'id'>) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Employee Name"
        {...register('name', { required: 'Employee name is required' })}
        error={errors.name?.message}
      />

      <Input
        label="Designation"
        {...register('designation', { required: 'Designation is required' })}
        error={errors.designation?.message}
      />

      <Input
        label="Contact Number"
        {...register('contactNumber', {
          required: 'Contact number is required',
          pattern: {
            value: /^\d{10}$/,
            message: 'Please enter a valid 10-digit number'
          }
        })}
        error={errors.contactNumber?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={errors.email?.message}
      />

      <div className="flex justify-end space-x-3">
        {editingEmployee && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          {editingEmployee ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};