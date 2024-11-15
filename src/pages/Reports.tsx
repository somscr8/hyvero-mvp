import React, { useState, useEffect } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { saveAs } from 'file-saver';

function Reports() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    // Load reports from local storage or database (if using Dexie or similar for persistent storage)
    const savedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    setReports(savedReports);
  }, []);

  // Function to generate, rename, and download the report
  const generateReport = async () => {
    const filePath = '../../uploads/report.xlsx'; // Path to the source report file
    const fileName = `ICT_Report_${new Date().toISOString().split('T')[0]}.xlsx`;

    try {
      // Fetch the report file
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Failed to fetch the report file.');

      const blob = await response.blob();

      // Save the file locally with the new name
      saveAs(blob, fileName);

      // Update reports list
      const newReport = { id: Date.now(), name: fileName, generatedAt: new Date() };
      const updatedReports = [...reports, newReport];
      setReports(updatedReports);

      // Save reports list to local storage (or database if using persistent storage)
      localStorage.setItem('reports', JSON.stringify(updatedReports));
    } catch (error) {
      console.error('Error downloading the report:', error);
    }
  };

  // Function to handle downloading from the reports list
  const downloadReport = async (reportName: string) => {
    const filePath = `../../uploads/${reportName}`;

    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Failed to fetch the report file.');

      const blob = await response.blob();
      saveAs(blob, reportName);
    } catch (error) {
      console.error('Error downloading the report:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">View and generate compliance reports</p>
      </div>

      {/* Generate Report Button */}
      <div className="mb-4">
        <button
          onClick={generateReport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          Generate Report
        </button>
      </div>

      {/* Reports List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reports</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {reports.length === 0 ? (
              <li className="px-4 py-4 sm:px-6">No reports generated yet.</li>
            ) : (
              reports.map((report) => (
                <li key={report.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileSpreadsheet className="h-5 w-5 text-primary-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        <p className="text-sm text-gray-500">
                          Generated on {new Date(report.generatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadReport(report.name)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200"
                    >
                      Download
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports;
