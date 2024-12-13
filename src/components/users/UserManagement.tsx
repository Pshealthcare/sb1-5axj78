import React, { useState } from 'react';
import { useStore } from '../../store';
import { UserForm } from './UserForm';
import { UserList } from './UserList';
import { User } from '../../types';

export const UserManagement: React.FC = () => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { users, addUser, removeUser, updateUser } = useStore();

  const handleSubmit = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      updateUser({ ...userData, id: editingUser.id });
      setEditingUser(null);
    } else {
      addUser({
        ...userData,
        id: Math.random().toString(36).substr(2, 9)
      });
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (userId: string) => {
    removeUser(userId);
    if (editingUser?.id === userId) {
      setEditingUser(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserForm
          onSubmit={handleSubmit}
          editingUser={editingUser}
          onCancelEdit={handleCancelEdit}
        />
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};