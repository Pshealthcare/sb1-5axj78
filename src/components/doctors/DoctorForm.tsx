import React from 'react';
import { useForm } from 'react-hook-form';
import { Doctor } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface DoctorFormProps {
  onSubmit: (data: Omit<Doctor, 'id'>) => void;
  editingDoctor: Doctor | null;
  onCancelEdit: () => void;
}

export const DoctorForm: React.FC<DoctorFormProps> = ({
  onSubmit,
  editingDoctor,
  onCancelEdit
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Doctor, 'id'>>({
    defaultValues: editingDoctor || undefined
  });

  const handleFormSubmit = (data: Omit<Doctor, 'id'>) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Doctor Name"
        {...register('name', { required: 'Doctor name is required' })}
        error={errors.name?.message}
      />

      <Input
        label="Specialization"
        {...register('specialization', { required: 'Specialization is required' })}
        error={errors.specialization?.message}
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
        {editingDoctor && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
        </Button>
      </div>
    </form>
  );
};