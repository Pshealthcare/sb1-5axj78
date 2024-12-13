import React from 'react';
import { useStore } from '../../../store';
import { User } from '../../../types';
import { Switch } from '../../common/Switch';
import { Button } from '../../common/Button';

export const UserPermissions: React.FC = () => {
  const { users, updateUserPermissions } = useStore();
  const [permissions, setPermissions] = React.useState<Record<string, string[]>>({});

  const permissionOptions = [
    'can_manage_patients',
    'can_manage_tests',
    'can_view_reports',
    'can_edit_reports',
    'can_manage_billing',
    'can_view_analytics'
  ];

  const handlePermissionChange = (userId: string, permission: string, enabled: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [userId]: enabled 
        ? [...(prev[userId] || []), permission]
        : (prev[userId] || []).filter(p => p !== permission)
    }));
  };

  const handleSave = () => {
    updateUserPermissions(permissions);
  };

  return (
    <div className="space-y-6">
      <div className="prose">
        <h3>User Permissions</h3>
        <p>Configure access levels and permissions for each user in the system.</p>
      </div>

      <div className="space-y-6">
        {users.filter(user => user.role !== 'admin').map(user => (
          <div key={user.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.username}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100">
                {user.role}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {permissionOptions.map(permission => (
                <div key={permission} className="flex items-center justify-between">
                  <span className="text-sm">
                    {permission.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                  <Switch
                    checked={permissions[user.id]?.includes(permission)}
                    onChange={(checked) => handlePermissionChange(user.id, permission, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Save Permissions
        </Button>
      </div>
    </div>
  );
};