import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../types';
import { useStore } from '../store';
import { getAddressFromPincode, validatePincode } from '../utils/pincodeUtils';

export const PatientRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { addPatient, currentUser } = useStore();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Patient & { pincode: string }>();
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);

  const generatePRN = (mobileNumber: string) => {
    const timestamp = new Date().getTime().toString().slice(-8);
    return `PSH${timestamp}`;
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value;
    setPincodeError(null);

    if (pincode.length === 6 && validatePincode(pincode)) {
      setIsLoadingAddress(true);
      const address = await getAddressFromPincode(pincode);
      setIsLoadingAddress(false);

      if (address) {
        setValue('address', address);
      } else {
        setPincodeError('Invalid pincode or unable to fetch address');
      }
    }
  };

  const onSubmit = (data: Omit<Patient, 'prn' | 'registrationDate' | 'registeredBy'>) => {
    const patientData: Patient = {
      ...data,
      prn: generatePRN(data.mobileNumber),
      registrationDate: new Date().toISOString(),
      registeredBy: currentUser?.name || 'Unknown'
    };
    
    addPatient(patientData);
    navigate(`/billing/${patientData.prn}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Patient Registration</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <select
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Baby">Baby</option>
            <option value="Master">Master</option>
          </select>
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Middle Name</label>
          <input
            type="text"
            {...register('middleName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            {...register('age', { 
              required: 'Age is required',
              min: { value: 0, message: 'Age must be positive' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            {...register('mobileNumber', {
              required: 'Mobile number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            {...register('pincode', {
              required: 'Pincode is required',
              pattern: {
                value: /^[1-9][0-9]{5}$/,
                message: 'Please enter a valid 6-digit pincode'
              }
            })}
            onChange={handlePincodeChange}
            maxLength={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>}
          {pincodeError && <p className="mt-1 text-sm text-red-600">{pincodeError}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <div className="relative">
          <textarea
            {...register('address', {
              required: 'Address is required',
              validate: value => value.split(/\s+/).length <= 30 || 'Address should not exceed 30 words'
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
          {isLoadingAddress && (
            <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save & Continue to Billing
        </button>
      </div>
    </form>
  );
};