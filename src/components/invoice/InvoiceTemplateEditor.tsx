import React, { useState } from 'react';
import { useStore } from '../../store';
import { Settings } from '../../types';
import { Building, Type, Image, Layout, Save } from 'lucide-react';
import { Card } from '../common/Card';

export const InvoiceTemplateEditor: React.FC = () => {
  // ... existing state and handlers remain the same ...

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoice Template Editor</h2>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="md:sticky md:top-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Layout className="w-5 h-5 mr-2" />
              Section Order & Visibility
            </h3>
            <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
              {/* Section order content remains the same */}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2" />
              Typography & Styling
            </h3>
            <div className="max-h-[calc(100vh-24rem)] overflow-y-auto">
              {/* Typography settings content remains the same */}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2" />
              Logo Settings
            </h3>
            <div className="max-h-[calc(100vh-24rem)] overflow-y-auto">
              {/* Logo settings content remains the same */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};