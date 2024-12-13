import React from 'react';
import { useStore } from '../../store';
import { Activity, Clock, FileText, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const { currentUser, patients, invoices } = useStore();
  
  const todayPatients = patients.filter(patient => {
    const today = new Date().toDateString();
    return new Date(patient.registrationDate).toDateString() === today;
  });

  const recentInvoices = invoices.slice(-5);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Welcome, {currentUser?.name}</h2>
        <p className="text-gray-600">Here's what's happening today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="inline-flex p-3 rounded-lg bg-blue-500">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mt-4">Today's Patients</h3>
          <p className="text-3xl font-bold">{todayPatients.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="inline-flex p-3 rounded-lg bg-green-500">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mt-4">Pending Reports</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="inline-flex p-3 rounded-lg bg-purple-500">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mt-4">Total Invoices</h3>
          <p className="text-3xl font-bold">{invoices.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <UserPlus className="h-5 w-5 mr-3 text-blue-500" />
              <span>New Registration</span>
            </Link>
            <Link
              to="/tests"
              className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <Activity className="h-5 w-5 mr-3 text-green-500" />
              <span>Manage Tests</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
          <div className="space-y-4">
            {recentInvoices.map((invoice, index) => {
              const patient = patients.find(p => p.prn === invoice.patientId);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">
                      {patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient'}
                    </p>
                    <p className="text-sm text-gray-500">{invoice.invoiceNumber}</p>
                  </div>
                  <span className="font-medium">₹{invoice.grossAmount}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};