import React from 'react';
import { useStore } from '../../store';
import { Users, FileText, UserPlus, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { AdminPasswordChange } from '../settings/sections/AdminPasswordChange';

export const AdminDashboard: React.FC = () => {
  const { users, patients, employees, doctors } = useStore();

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Patients', value: patients.length, icon: Activity, color: 'bg-green-500' },
    { title: 'Total Employees', value: employees.length, icon: UserPlus, color: 'bg-purple-500' },
    { title: 'Total Doctors', value: doctors.length, icon: FileText, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className={`inline-flex p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mt-4">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <Link
              to="/users"
              className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <Users className="h-5 w-5 mr-3 text-blue-500" />
              <span>Manage Users</span>
            </Link>
            <Link
              to="/invoice-template"
              className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <FileText className="h-5 w-5 mr-3 text-gray-500" />
              <span>Invoice Template</span>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {patients.slice(-5).map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{`${patient.firstName} ${patient.lastName}`}</p>
                  <p className="text-sm text-gray-500">Registered on {new Date(patient.registrationDate).toLocaleDateString()}</p>
                </div>
                <span className="text-sm text-gray-500">{patient.prn}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-2">
          <AdminPasswordChange />
        </Card>
      </div>
    </div>
  );
};