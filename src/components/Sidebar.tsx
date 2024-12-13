import React from 'react';
import { 
  Users, 
  PlusCircle, 
  FileText, 
  UserPlus, 
  LogOut, 
  UserCog, 
  FileCheck, 
  Layout, 
  FileEdit 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-primary-800 min-h-screen p-4 flex flex-col">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="text-primary-800 text-xl font-bold">PS</span>
        </div>
        <span className="text-white text-xl font-bold">Healthcare</span>
      </div>
      
      <nav className="space-y-2 flex-1">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
        >
          <Layout size={20} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => navigate('/patients')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
        >
          <Users size={20} />
          <span>Patient Registration</span>
        </button>
        
        <button
          onClick={() => navigate('/tests')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
        >
          <PlusCircle size={20} />
          <span>New Tests Add</span>
        </button>
        
        <button
          onClick={() => navigate('/summary')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
        >
          <FileText size={20} />
          <span>Patient Summary</span>
        </button>

        <button
          onClick={() => navigate('/reports')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
        >
          <FileCheck size={20} />
          <span>Patient Reports</span>
        </button>

        {currentUser?.role === 'admin' && (
          <>
            <button
              onClick={() => navigate('/employees')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
            >
              <UserPlus size={20} />
              <span>Register Employee</span>
            </button>

            <button
              onClick={() => navigate('/doctors')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
            >
              <UserCog size={20} />
              <span>Doctor Manage</span>
            </button>

            <button
              onClick={() => navigate('/invoice-template')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700"
            >
              <FileEdit size={20} />
              <span>Invoice Template</span>
            </button>
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700 mt-auto border-t border-primary-700 pt-4"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};