import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

function Reports() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">View and generate compliance reports</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reports</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <li key={item} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-5 w-5 text-primary-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Report #{item}</p>
                      <p className="text-sm text-gray-500">Generated on March {item}, 2024</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200">
                    Download
                  </button>
                </div>
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-primary-600 rounded-full"
                      style={{ width: `${item * 25}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item * 25}% Complete</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports;