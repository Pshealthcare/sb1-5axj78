import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { useStore } from '../../store';
import { Button } from '../common/Button';
import { Clock } from 'lucide-react';

interface AppointmentCalendarProps {
  doctorId?: string;
  type: string;
  onSlotSelect: (date: string, time: string) => void;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  doctorId,
  type,
  onSlotSelect
}) => {
  const { getAvailableSlots } = useStore();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const weekDays = Array.from({ length: 7 }, (_, i) => 
    addDays(startOfWeek(selectedDate), i)
  );

  // Different time slots for home collection vs regular appointments
  const timeSlots = type === 'home-collection' 
    ? [
        '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
        '09:00', '09:30', '10:00'
      ]
    : [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
      ];

  const availableSlots = getAvailableSlots(doctorId, format(selectedDate, 'yyyy-MM-dd'));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => (
          <Button
            key={date.toISOString()}
            variant={selectedDate.toDateString() === date.toDateString() ? 'primary' : 'outline'}
            onClick={() => setSelectedDate(date)}
            className="w-full"
          >
            <div className="text-center">
              <div className="text-xs">{format(date, 'EEE')}</div>
              <div className="text-lg font-semibold">{format(date, 'd')}</div>
            </div>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => {
          const isAvailable = type === 'home-collection' || 
            availableSlots.some(slot => slot.time === time);
          
          return (
            <Button
              key={time}
              variant={isAvailable ? 'outline' : 'secondary'}
              disabled={!isAvailable}
              onClick={() => onSlotSelect(format(selectedDate, 'yyyy-MM-dd'), time)}
              className="flex items-center justify-center py-2"
            >
              <Clock className="w-4 h-4 mr-2" />
              {time}
            </Button>
          );
        })}
      </div>
    </div>
  );
};