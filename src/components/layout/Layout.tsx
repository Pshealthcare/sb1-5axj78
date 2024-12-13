import React from 'react';
import { CollapsibleSidebar } from './CollapsibleSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <CollapsibleSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-[95%] md:max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};