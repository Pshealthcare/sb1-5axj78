import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Test } from '../types';
import { useStore } from '../store';
import { Card, CardHeader, CardContent } from './common/Card';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { TestsTable } from './tables/TestsTable';
import { Search, Upload } from 'lucide-react';
import { BulkTestImport } from './tests/BulkTestImport';

export const TestManagement: React.FC = () => {
  const { tests, addTest, removeTest } = useStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Test>();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: Test) => {
    if (editingTest) {
      removeTest(editingTest.code);
      setEditingTest(null);
    }
    addTest(data);
    reset();
  };

  const handleEdit = (test: Test) => {
    setEditingTest(test);
    reset(test);
  };

  const handleDelete = (test: Test) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      removeTest(test.code);
      if (editingTest?.code === test.code) {
        setEditingTest(null);
        reset();
      }
    }
  };

  const handleBulkImport = (importedTests: Test[]) => {
    importedTests.forEach(test => {
      addTest(test);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Test Management</h2>
        <Button
          onClick={() => setShowBulkImport(true)}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Bulk Import
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 md:sticky md:top-4 self-start">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {editingTest ? 'Edit Test' : 'Add New Test'}
            </h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Test Code"
                {...register('code', { required: 'Test code is required' })}
                error={errors.code?.message}
                placeholder="Enter test code"
              />

              <Input
                label="Test Name"
                {...register('name', { required: 'Test name is required' })}
                error={errors.name?.message}
                placeholder="Enter test name"
              />

              <Input
                label="MRP"
                type="number"
                step="0.01"
                {...register('mrp', {
                  required: 'MRP is required',
                  min: { value: 0, message: 'MRP must be positive' }
                })}
                error={errors.mrp?.message}
                placeholder="Enter MRP"
              />

              <Input
                label="Offer Price"
                type="number"
                step="0.01"
                {...register('offerPrice', {
                  required: 'Offer price is required',
                  min: { value: 0, message: 'Offer price must be positive' }
                })}
                error={errors.offerPrice?.message}
                placeholder="Enter offer price"
              />

              <div className="flex space-x-3">
                <Button type="submit" className="flex-1">
                  {editingTest ? 'Update Test' : 'Add Test'}
                </Button>
                {editingTest && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setEditingTest(null);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Available Tests</h3>
              <div className="relative w-64">
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
              <TestsTable
                tests={filteredTests}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {showBulkImport && (
        <BulkTestImport
          onImport={handleBulkImport}
          onClose={() => setShowBulkImport(false)}
        />
      )}
    </div>
  );
};