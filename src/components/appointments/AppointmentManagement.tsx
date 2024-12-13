import React from 'react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { AppointmentForm } from './AppointmentForm';
import { AppointmentList } from './AppointmentList';
import { Tabs } from '../common/Tabs';

export const AppointmentManagement: React.FC = () => {
  const tabs = [
    {
      id: 'schedule',
      label: 'Schedule Appointment',
      component: () => (
        <Card>
          <CardContent>
            <AppointmentForm />
          </CardContent>
        </Card>
      )
    },
    {
      id: 'list',
      label: 'Appointments',
      component: () => (
        <Card>
          <CardContent>
            <AppointmentList />
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Appointment Management</h2>
      <Tabs tabs={tabs} />
    </div>
  );
};