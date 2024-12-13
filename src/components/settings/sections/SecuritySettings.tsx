import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../../store';
import { Settings } from '../../../types';

export const SecuritySettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm<Settings['security']>({
    defaultValues: settings.security
  });

  const onSubmit = (data: Settings['security']) => {
    updateSettings({ ...settings, security: data });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password Expiry (days)
          </label>
          <input
            type="number"
            {...register('passwordExpiryDays', {
              required: 'Password expiry is required',
              min: { value: 30, message: 'Minimum 30 days required' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.passwordExpiryDays && (
            <p className="mt-1 text-sm text-red-600">{errors.passwordExpiryDays.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            {...register('sessionTimeoutMinutes', {
              required: 'Session timeout is required',
              min: { value: 5, message: 'Minimum 5 minutes required' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.sessionTimeoutMinutes && (
            <p className="mt-1 text-sm text-red-600">{errors.sessionTimeoutMinutes.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('enforceStrongPasswords')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Enforce Strong Passwords
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('twoFactorAuth')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Enable Two-Factor Authentication
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};