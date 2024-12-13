import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../../store';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordChange: React.FC = () => {
  const { currentUser, changePassword } = useStore();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<PasswordChangeForm>();

  const onSubmit = (data: PasswordChangeForm) => {
    if (currentUser) {
      const success = changePassword(currentUser.id, data.currentPassword, data.newPassword);
      if (success) {
        reset();
        alert('Password changed successfully');
      } else {
        alert('Current password is incorrect');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="prose">
        <h3>Change Password</h3>
        <p>Update your account password. Choose a strong password that you haven't used before.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="password"
          label="Current Password"
          {...register('currentPassword', { required: 'Current password is required' })}
          error={errors.currentPassword?.message}
        />

        <Input
          type="password"
          label="New Password"
          {...register('newPassword', {
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must include uppercase, lowercase, number and special character'
            }
          })}
          error={errors.newPassword?.message}
        />

        <Input
          type="password"
          label="Confirm New Password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === watch('newPassword') || 'Passwords do not match'
          })}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="w-full">
          Change Password
        </Button>
      </form>
    </div>
  );
};