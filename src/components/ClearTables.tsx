// src/components/ClearTables.tsx

import React from 'react';
import { db } from '../lib/db';

const ClearTables: React.FC = () => {
  const handleClearFilesTable = async () => {
    try {
      await db.files.clear();
      console.log('Files table cleared successfully!');
    } catch (error) {
      console.error('Error clearing files table:', error);
    }
  };

  const handleClearReportsTable = async () => {
    try {
      await db.reports.clear();
      console.log('Reports table cleared successfully!');
    } catch (error) {
      console.error('Error clearing reports table:', error);
    }
  };

  // Add more handlers for other tables as needed
  const handleClearOtherTable = async () => {
    try {
      await db.otherTable.clear();
      console.log('Other table cleared successfully!');
    } catch (error) {
      console.error('Error clearing other table:', error);
    }
  };

  return (
    <div className="overflow-hidden shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Clear Dexie Tables</h3>
        <p className="mt-1 text-sm text-gray-500">Click to clear data from the respective tables</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          <li className="px-4 py-4 sm:px-6 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">Clear Files Table</span>
            <button
              onClick={handleClearFilesTable}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
            >
              Clear
            </button>
          </li>
          <li className="px-4 py-4 sm:px-6 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">Clear Reports Table</span>
            <button
              onClick={handleClearReportsTable}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
            >
              Clear
            </button>
          </li>
          <li className="px-4 py-4 sm:px-6 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">Clear Other Table</span>
            <button
              onClick={handleClearOtherTable}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
            >
              Clear
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClearTables;
