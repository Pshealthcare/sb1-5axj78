import React from 'react';
import { useStore } from '../../store';
import { GeneralSettings } from './sections/GeneralSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { BackupSettings } from './sections/BackupSettings';

export const SystemSettings: React.FC = () => {
  const { updateSettings } = useStore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">System Settings</h2>
      
      <div className="space-y-6">
        <GeneralSettings />
        <SecuritySettings />
        <BackupSettings />
      </div>
    </div>
  );
};