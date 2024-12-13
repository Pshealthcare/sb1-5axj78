import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../../store';
import { Card } from '../../common/Card';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { Lock } from 'lucide-react';

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const AdminPasswordChange: React.FC = () => {
  const { currentUser, changePassword } = useStore();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<PasswordChangeForm>();
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const onSubmit = (data: PasswordChangeForm) => {
    if (currentUser) {
      const success = changePassword(currentUser.id, data.currentPassword, data.newPassword);
      if (success) {
        setSuccessMessage('Password changed successfully');
        setErrorMessage('');
        reset();
      } else {
        setErrorMessage('Current password is incorrect');
        setSuccessMessage('');
      }
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-5 h-5 text-primary-800" />
        <h3 className="text-lg font-semibold">Change Admin Password</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          type="password"
          label="Current Password"
          {...register('currentPassword', { 
            required: 'Current password is required' 
          })}
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

        {successMessage && (
          <div className="p-3 bg-green-50 text-green-800 rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-800 rounded-md">
            {errorMessage}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit">
            Change Password
          </Button>
        </div>
      </form>
    </Card>
  );
};