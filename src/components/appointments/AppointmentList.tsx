import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useStore } from '../../store';
import { Card } from '../common/Card';
import { Calendar, Clock, User, FileText, IndianRupee, UserCheck, Bell } from 'lucide-react';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../../types/appointment';

export const AppointmentList: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, users, currentUser, cancelAppointment, updateAppointment } = useStore();
  const [filter, setFilter] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Filter assigned users (not employees) who can collect samples
  const assignableUsers = users.filter(user => 
    user.role === 'staff' && user.permissions?.includes('can_collect_samples')
  );

  const filteredAppointments = appointments.filter(app => {
    const isVisible = currentUser?.role === 'admin' || 
                     app.createdBy === currentUser?.id ||
                     app.assignedTo === currentUser?.id;

    if (!isVisible) return false;

    switch (filter) {
      case 'assigned':
        return !!app.assignedTo;
      case 'unassigned':
        return !app.assignedTo && app.status === 'scheduled';
      default:
        return true;
    }
  });

  const handleAssign = (appointment: Appointment, userId: string) => {
    updateAppointment({
      ...appointment,
      assignedTo: userId,
      status: 'scheduled'
    });

    // Show notification
    const assignedUser = users.find(u => u.id === userId);
    if (assignedUser) {
      setNotificationMessage(`New appointment assigned to ${assignedUser.name}`);
      setShowNotification(true);
      
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.play().catch(console.error);
    }
  };

  const handleComplete = (appointment: Appointment) => {
    updateAppointment({
      ...appointment,
      status: 'completed'
    });

    // Redirect to billing for home collection appointments
    if (appointment.type === 'home-collection') {
      navigate(`/billing/${appointment.patientId}`);
    }
  };

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="space-y-4">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center z-50">
          <Bell className="w-5 h-5 mr-2" />
          {notificationMessage}
        </div>
      )}

      {currentUser?.role === 'admin' && (
        <div className="flex space-x-2 mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'assigned' ? 'primary' : 'outline'}
            onClick={() => setFilter('assigned')}
          >
            Assigned
          </Button>
          <Button
            variant={filter === 'unassigned' ? 'primary' : 'outline'}
            onClick={() => setFilter('unassigned')}
          >
            Unassigned
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {appointment.patientName}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(appointment.date), 'dd MMM yyyy')}
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      {appointment.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>

              {appointment.tests && appointment.tests.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Tests
                  </h4>
                  <div className="mt-2 space-y-2">
                    {appointment.tests.map((test) => (
                      <div key={test.code} className="text-sm flex justify-between">
                        <span>{test.name}</span>
                        <span>{test.offerPrice}</span>
                      </div>
                    ))}
                  </div>
                  {appointment.amount && (
                    <div className="mt-2 text-sm font-medium flex justify-end">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      Total: {appointment.amount}
                    </div>
                  )}
                </div>
              )}

              {appointment.type === 'home-collection' && appointment.address && (
                <div className="mt-4 text-sm">
                  <h4 className="font-medium">Collection Address:</h4>
                  <p className="text-gray-600 mt-1">{appointment.address}</p>
                </div>
              )}

              <div className="mt-4 flex justify-between items-center">
                {currentUser?.role === 'admin' && appointment.status === 'scheduled' && (
                  <select
                    onChange={(e) => handleAssign(appointment, e.target.value)}
                    value={appointment.assignedTo || ''}
                    className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Assign User</option>
                    {assignableUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                )}

                <div className="flex space-x-2">
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => cancelAppointment(appointment.id)}
                      >
                        Cancel
                      </Button>
                      {appointment.assignedTo === currentUser?.id && (
                        <Button
                          onClick={() => handleComplete(appointment)}
                        >
                          Complete & Bill
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};