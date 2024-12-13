import React, { useState } from 'react';
import { Report } from '../../types';

interface ReportUploadModalProps {
  onClose: () => void;
  onUpload: (file: File, testResults: Report['testResults']) => void;
  tests: { code: string; name: string }[];
}

export const ReportUploadModal: React.FC<ReportUploadModalProps> = ({
  onClose,
  onUpload,
  tests
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [testResults, setTestResults] = useState<Report['testResults']>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddResult = () => {
    setTestResults([...testResults, {
      testCode: '',
      testName: '',
      result: '',
      normalRange: '',
      remarks: ''
    }]);
  };

  const handleResultChange = (index: number, field: keyof Report['testResults'][0], value: string) => {
    const updatedResults = [...testResults];
    updatedResults[index] = {
      ...updatedResults[index],
      [field]: value
    };
    setTestResults(updatedResults);
  };

  const handleTestSelect = (index: number, testCode: string, testName: string) => {
    const updatedResults = [...testResults];
    updatedResults[index] = {
      ...updatedResults[index],
      testCode,
      testName
    };
    setTestResults(updatedResults);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && testResults.length > 0) {
      onUpload(selectedFile, testResults);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upload Report</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Report File (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Test Results</h4>
                <button
                  type="button"
                  onClick={handleAddResult}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Result
                </button>
              </div>

              {testResults.map((result, index) => (
                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Test</label>
                    <select
                      value={result.testCode}
                      onChange={(e) => {
                        const test = tests.find(t => t.code === e.target.value);
                        if (test) {
                          handleTestSelect(index, test.code, test.name);
                        }
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Test</option>
                      {tests.map(test => (
                        <option key={test.code} value={test.code}>
                          {test.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Result</label>
                    <input
                      type="text"
                      value={result.result}
                      onChange={(e) => handleResultChange(index, 'result', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Normal Range</label>
                    <input
                      type="text"
                      value={result.normalRange}
                      onChange={(e) => handleResultChange(index, 'normalRange', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                    <input
                      type="text"
                      value={result.remarks}
                      onChange={(e) => handleResultChange(index, 'remarks', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedFile || testResults.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Upload Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};