import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Test, Patient, Invoice } from '../types';
import { useStore } from '../store';
import { InvoicePDF } from './InvoicePDF';
import { generateInvoiceNumber } from '../utils/invoiceUtils';

export const BillingPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  
  const { tests, getPatientByPRN, employees, doctors, addInvoice, invoices } = useStore();
  const patient = getPatientByPRN(patientId || '');
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Invoice>({
    defaultValues: {
      discountAmount: 0,
      paidAmount: 0,
      paymentMode: '',
      discountRemark: '',
      refDoctor: '',
      registeredBy: ''
    }
  });

  const paymentMode = watch('paymentMode');

  useEffect(() => {
    if (!patient) {
      navigate('/dashboard');
    }
  }, [patient, navigate]);

  const filteredTests = tests.filter(test => 
    !selectedTests.find(selected => selected.code === test.code) && 
    (test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(doctorSearchTerm.toLowerCase())
  );

  const grossAmount = selectedTests.reduce((sum, test) => sum + Number(test.offerPrice), 0);
  const paidAmount = Number(watch('paidAmount')) || 0;
  const discountAmount = Number(watch('discountAmount')) || 0;
  const balanceAmount = grossAmount - discountAmount - paidAmount;

  useEffect(() => {
    setValue('balanceAmount', balanceAmount);
    setValue('grossAmount', grossAmount);
  }, [grossAmount, paidAmount, discountAmount, setValue]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleTestSelect = (test: Test) => {
    if (!selectedTests.find(t => t.code === test.code)) {
      setSelectedTests([...selectedTests, test]);
      setSearchTerm('');
    }
  };

  const handleTestRemove = (testCode: string) => {
    setSelectedTests(selectedTests.filter(test => test.code !== testCode));
  };

  const handleDoctorSelect = (doctorName: string) => {
    setValue('refDoctor', doctorName, { shouldValidate: true });
    setDoctorSearchTerm('');
  };

  const onFormSubmit = (data: Partial<Invoice>) => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test');
      return;
    }

    if (data.paymentMode === 'UPI' && !data.upiTransactionId) {
      alert('Please enter UPI Transaction ID');
      return;
    }

    const invoice: Invoice = {
      ...data as Invoice,
      invoiceNumber: generateInvoiceNumber(invoices.length + 1),
      patientId: patient.prn,
      tests: selectedTests,
      date: new Date().toISOString(),
      balanceAmount: Number(balanceAmount),
      grossAmount: Number(grossAmount),
      discountAmount: Number(data.discountAmount || 0),
      paidAmount: Number(data.paidAmount || 0),
      registeredBy: data.registeredBy || patient.registeredBy
    };

    addInvoice(invoice);
    setCurrentInvoice(invoice);
    setShowInvoice(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {showInvoice ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Invoice Preview</h2>
            <div className="space-x-4">
              <button
                onClick={() => setShowInvoice(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back to Billing
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                New Registration
              </button>
            </div>
          </div>
          {currentInvoice && <InvoicePDF invoice={currentInvoice} patient={patient} />}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Billing Details</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">
                  {`${patient.title} ${patient.firstName} ${patient.middleName ? patient.middleName + ' ' : ''}${patient.lastName}`}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PRN</p>
                <p className="font-medium">{patient.prn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age/Gender</p>
                <p className="font-medium">{`${patient.age} / ${patient.gender}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p className="font-medium">{patient.mobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{format(new Date(), 'dd-MMM-yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Invoice Number</p>
                <p className="font-medium">{generateInvoiceNumber(invoices.length + 1)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{patient.address}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Ref Doctor
                </label>
                <input
                  type="text"
                  value={doctorSearchTerm}
                  onChange={(e) => setDoctorSearchTerm(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search doctor..."
                />
                {doctorSearchTerm && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {filteredDoctors.map(doctor => (
                      <button
                        key={doctor.id}
                        type="button"
                        onClick={() => handleDoctorSelect(doctor.name)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {doctor.name} - {doctor.specialization}
                      </button>
                    ))}
                  </div>
                )}
                <input 
                  type="text"
                  {...register('refDoctor', { required: 'Ref Doctor is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  readOnly
                />
                {errors.refDoctor && (
                  <p className="mt-1 text-sm text-red-600">{errors.refDoctor.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registered By
                </label>
                <select
                  {...register('registeredBy', { required: 'Registered By is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
                {errors.registeredBy && (
                  <p className="mt-1 text-sm text-red-600">{errors.registeredBy.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Search Tests
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search by test name or code..."
                />
                {searchTerm && (
                  <div className="mt-2 border rounded-md shadow-sm">
                    {filteredTests.map(test => (
                      <button
                        key={test.code}
                        type="button"
                        onClick={() => handleTestSelect(test)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b last:border-b-0"
                      >
                        <span className="font-medium">{test.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({test.code})</span>
                        <span className="float-right">₹{test.offerPrice}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Selected Tests</h4>
                <div className="space-y-2">
                  {selectedTests.map(test => (
                    <div
                      key={test.code}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                    >
                      <div>
                        <span className="font-medium">{test.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({test.code})</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>₹{test.offerPrice}</span>
                        <button
                          type="button"
                          onClick={() => handleTestRemove(test.code)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gross Amount
                  </label>
                  <input
                    type="number"
                    value={grossAmount}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Amount
                  </label>
                  <input
                    type="number"
                    {...register('discountAmount')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Remark
                  </label>
                  <input
                    type="text"
                    {...register('discountRemark')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Mode
                  </label>
                  <select
                    {...register('paymentMode', { required: 'Payment mode is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                  {errors.paymentMode && (
                    <p className="mt-1 text-sm text-red-600">{errors.paymentMode.message}</p>
                  )}
                </div>

                {paymentMode === 'UPI' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      UPI Transaction ID
                    </label>
                    <input
                      type="text"
                      {...register('upiTransactionId', {
                        required: 'UPI Transaction ID is required when using UPI payment'
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter UPI Transaction ID"
                    />
                    {errors.upiTransactionId && (
                      <p className="mt-1 text-sm text-red-600">{errors.upiTransactionId.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    {...register('paidAmount', { required: 'Paid amount is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.paidAmount && (
                    <p className="mt-1 text-sm text-red-600">{errors.paidAmount.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Balance Amount
                  </label>
                  <input
                    type="number"
                    value={balanceAmount}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                disabled={selectedTests.length === 0}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Invoice
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};