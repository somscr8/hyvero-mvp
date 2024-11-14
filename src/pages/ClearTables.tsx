// src/pages/ClearTables.tsx

import React from 'react';
import { db } from '../lib/db';

const ClearTables: React.FC = () => {
  const handleClearUsers = async () => {
    await db.clearUsers();
    alert('Users table has been cleared!');
  };

  const handleClearTemplates = async () => {
    await db.clearTemplates();
    alert('Templates table has been cleared!');
  };

  const handleClearReports = async () => {
    await db.clearReports();
    alert('Reports table has been cleared!');
  };

  const handleClearFiles = async () => {
    await db.clearFiles();
    alert('Files table has been cleared!');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">Clear Database Tables</h1>
      <p className="text-sm text-gray-500 mb-6">Click the buttons below to clear specific tables in the database.</p>

      <div className="space-y-4">
        <button
          onClick={handleClearUsers}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Clear Users Table
        </button>
        <button
          onClick={handleClearTemplates}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Clear Templates Table
        </button>
        <button
          onClick={handleClearReports}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Clear Reports Table
        </button>
        <button
          onClick={handleClearFiles}
          className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          Clear Files Table
        </button>
      </div>
    </div>
  );
};

export default ClearTables;
