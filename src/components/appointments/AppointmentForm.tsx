import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../store';
import { Test } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { AppointmentCalendar } from './AppointmentCalendar';
import { SearchInput } from '../common/SearchInput';
import { Search } from 'lucide-react';

interface AppointmentFormData {
  patientName: string;
  mobileNumber: string;
  type: 'consultation' | 'follow-up' | 'test' | 'home-collection';
  address: string;
  notes?: string;
}

export const AppointmentForm: React.FC = () => {
  const { tests, currentUser, addAppointment } = useStore();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AppointmentFormData>();
  const [selectedSlot, setSelectedSlot] = React.useState<{ date: string; time: string } | null>(null);
  const [selectedTests, setSelectedTests] = React.useState<Test[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const appointmentType = watch('type');

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestSelect = (test: Test) => {
    if (!selectedTests.find(t => t.code === test.code)) {
      setSelectedTests([...selectedTests, test]);
    }
    setSearchTerm('');
  };

  const handleTestRemove = (testCode: string) => {
    setSelectedTests(selectedTests.filter(test => test.code !== testCode));
  };

  const calculateTotalAmount = () => {
    return selectedTests.reduce((sum, test) => sum + Number(test.offerPrice), 0);
  };

  const handleSlotSelect = (date: string, time: string) => {
    setSelectedSlot({ date, time });
  };

  const onSubmit = (data: AppointmentFormData) => {
    if (!selectedSlot || !currentUser) return;

    const appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      date: selectedSlot.date,
      time: selectedSlot.time,
      status: 'scheduled',
      tests: selectedTests,
      amount: calculateTotalAmount(),
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
      redirectToBilling: appointmentType === 'home-collection'
    };

    addAppointment(appointment);
    setSelectedSlot(null);
    setSelectedTests([]);
    setValue('type', '');
    setValue('address', '');
    setValue('notes', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Patient Name"
          {...register('patientName', { required: 'Patient name is required' })}
          error={errors.patientName?.message}
        />

        <Input
          label="Mobile Number"
          {...register('mobileNumber', {
            required: 'Mobile number is required',
            pattern: {
              value: /^\d{10}$/,
              message: 'Please enter a valid 10-digit number'
            }
          })}
          error={errors.mobileNumber?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Appointment Type</label>
          <select
            {...register('type', { required: 'Please select appointment type' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="test">Test</option>
            <option value="home-collection">Home Blood Collection</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
      </div>

      {appointmentType === 'home-collection' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Home Address</label>
          <textarea
            {...register('address', { 
              required: appointmentType === 'home-collection' ? 'Address is required for home collection' : false 
            })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Please provide your complete address for home collection"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        <h4 className="font-medium">Select Tests</h4>
        <div className="relative">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tests..."
            icon={<Search className="w-5 h-5 text-gray-400" />}
          />
          {searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {filteredTests.map(test => (
                <button
                  key={test.code}
                  type="button"
                  onClick={() => handleTestSelect(test)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  <span className="font-medium">{test.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({test.code})</span>
                  <span className="float-right">₹{test.offerPrice}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedTests.length > 0 && (
          <div className="space-y-2">
            {selectedTests.map(test => (
              <div key={test.code} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <div>
                  <span className="font-medium">{test.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({test.code})</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>₹{test.offerPrice}</span>
                  <button
                    type="button"
                    onClick={() => handleTestRemove(test.code)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <span className="font-medium">Total: ₹{calculateTotalAmount()}</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <Input
          label="Notes"
          {...register('notes')}
          placeholder="Any additional notes or requirements"
          multiline
          rows={3}
        />
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-medium mb-4">Select Appointment Slot</h4>
        <AppointmentCalendar
          type={appointmentType}
          onSlotSelect={handleSlotSelect}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!selectedSlot || selectedTests.length === 0}
        >
          Schedule Appointment
        </Button>
      </div>
    </form>
  );
};