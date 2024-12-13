import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../../store';
import { Settings } from '../../../types';
import { Download, Upload } from 'lucide-react';

export const BackupSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm<Settings['backup']>({
    defaultValues: settings.backup
  });

  const onSubmit = (data: Settings['backup']) => {
    updateSettings({ ...settings, backup: data });
  };

  const handleExportData = () => {
    const { patients, invoices, tests } = useStore.getState();
    const data = { patients, invoices, tests };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healthcare_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Backup & Restore</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Auto-Backup Frequency
          </label>
          <select
            {...register('autoBackupFrequency')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="never">Never</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('encryptBackups')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Encrypt Backup Files
          </label>
        </div>

        <div className="space-y-4 pt-4">
          <button
            type="button"
            onClick={handleExportData}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>

          <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Import Data
            <input type="file" className="hidden" accept=".json" />
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