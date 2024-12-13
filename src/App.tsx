import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { Layout } from './components/layout/Layout';
import { Login } from './components/Login';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { PatientRegistration } from './components/PatientRegistration';
import { BillingPage } from './components/BillingPage';
import { TestManagement } from './components/TestManagement';
import { PatientSummary } from './components/PatientSummary';
import { PatientReports } from './components/reports/PatientReports';
import { EmployeeRegistration } from './components/EmployeeRegistration';
import { DoctorManagement } from './components/DoctorManagement';
import { UserManagement } from './components/users/UserManagement';
import { AppointmentManagement } from './components/appointments/AppointmentManagement';
import { Unauthorized } from './components/auth/Unauthorized';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  const currentUser = useStore(state => state.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                {currentUser?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Layout>
                <PatientRegistration />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing/:patientId"
          element={
            <ProtectedRoute>
              <Layout>
                <BillingPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <Layout>
                <TestManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <Layout>
                <PatientSummary />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout>
                <PatientReports />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <EmployeeRegistration />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <DoctorManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Layout>
                <AppointmentManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;