import React from 'react';
import { useStore } from '../../store';
import { Card } from '../common/Card';
import { Tabs } from '../common/Tabs';
import { GeneralSettings } from './sections/GeneralSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { UserPermissions } from './sections/UserPermissions';
import { BackupSettings } from './sections/BackupSettings';
import { AdminPasswordChange } from './sections/AdminPasswordChange';

export const AdminSettings: React.FC = () => {
  const tabs = [
    { id: 'general', label: 'General', component: GeneralSettings },
    { id: 'security', label: 'Security', component: SecuritySettings },
    { id: 'permissions', label: 'User Permissions', component: UserPermissions },
    { id: 'backup', label: 'Backup & Restore', component: BackupSettings },
    { id: 'password', label: 'Change Password', component: AdminPasswordChange }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Settings</h2>
      </div>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};