import React, { useState } from 'react';
import { Test } from '../../types';
import { Button } from '../common/Button';
import { Upload, X } from 'lucide-react';
import * as XLSX from 'xlsx';

interface BulkTestImportProps {
  onImport: (tests: Test[]) => void;
  onClose: () => void;
}

export const BulkTestImport: React.FC<BulkTestImportProps> = ({ onImport, onClose }) => {
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<Test[]>([]);

  const validateTests = (tests: any[]): Test[] => {
    return tests.filter(test => {
      return (
        test.code && 
        test.name && 
        !isNaN(Number(test.mrp)) && 
        !isNaN(Number(test.offerPrice))
      );
    }).map(test => ({
      code: String(test.code),
      name: String(test.name),
      mrp: Number(test.mrp),
      offerPrice: Number(test.offerPrice)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        const validTests = validateTests(data);
        if (validTests.length === 0) {
          setError('No valid test data found in the file');
          return;
        }
        
        setPreview(validTests);
        setError('');
      } catch (err) {
        setError('Error reading file. Please ensure it\'s a valid Excel file.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleImport = () => {
    if (preview.length > 0) {
      onImport(preview);
      onClose();
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        code: 'TEST001',
        name: 'Sample Test',
        mrp: 1000,
        offerPrice: 800
      }
    ];
    
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'test_import_template.xlsx');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Bulk Import Tests</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Button
              variant="outline"
              onClick={downloadTemplate}
              className="text-sm"
            >
              Download Template
            </Button>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload Excel file</span>
              <span className="text-xs text-gray-500 mt-1">(.xlsx or .xls)</span>
            </label>
          </div>

          {error && (
            <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          {preview.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Preview ({preview.length} tests)</h4>
              <div className="max-h-60 overflow-y-auto border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Code</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">MRP</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Offer Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.map((test, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">{test.code}</td>
                        <td className="px-4 py-2 text-sm">{test.name}</td>
                        <td className="px-4 py-2 text-sm">{test.mrp}</td>
                        <td className="px-4 py-2 text-sm">{test.offerPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={preview.length === 0}
            >
              Import {preview.length} Tests
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};