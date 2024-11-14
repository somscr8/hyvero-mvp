import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, Trash, Download } from 'lucide-react';
import { db } from '../lib/db';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/auth';
import { Document, Page } from 'react-pdf'; // For PDF viewing
import * as XLSX from 'xlsx'; // For Excel file parsing
import Papa from 'papaparse'; // For CSV parsing

function Files() {
  const [user] = useAtom(userAtom);
  const [files, setFiles] = useState<any[]>([]); // Array to hold the file objects
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any | null>(null); // Holds the file to be viewed
  const [filePreview, setFilePreview] = useState<string | null>(null); // To hold the preview data URL
  const [csvData, setCsvData] = useState<any[]>([]); // For CSV file content
  const [excelData, setExcelData] = useState<any[]>([]); // For Excel file content

  // Fetch files from Dexie database when component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      const allFiles = await db.files.toArray();
      setFiles(allFiles);
    };
    fetchFiles();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return;

    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        // Add the file to the Dexie database
        await db.files.add({
          name: file.name,
          size: file.size,
          type: file.type,
          data: arrayBuffer,
          uploadedBy: user.id!,
          uploadedAt: new Date(),
        });
        // After adding the file, fetch files again to update the listing
        const allFiles = await db.files.toArray();
        setFiles(allFiles);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024, // 10MB max size
  });

  const openModal = (file: any) => {
    setSelectedFile(file);
    if (file.type.startsWith('image')) {
      // For image files, display a preview
      const previewUrl = URL.createObjectURL(new Blob([file.data]));
      setFilePreview(previewUrl);
    } else if (file.type === 'application/pdf') {
      // For PDFs, set file preview to null and handle it in the modal
      setFilePreview(null);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // For Excel files, set file preview to null and handle it in the modal
      setFilePreview(null);
      parseExcel(file);
    } else if (file.type === 'text/csv') {
      // For CSV files, set file preview to null and handle it in the modal
      setFilePreview(null);
      parseCSV(file);
    } else {
      setFilePreview(null); // For unsupported files, show no preview
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setCsvData([]);
    setExcelData([]);
    setIsModalOpen(false);
  };

  const deleteFile = async (fileId: number) => {
    await db.files.delete(fileId);
    setFiles(files.filter((file) => file.id !== fileId)); // Update the UI
  };

  const downloadFile = (file: any) => {
    const blob = new Blob([file.data], { type: file.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL after download
  };

  const parseCSV = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      const csvText = reader.result as string;
      Papa.parse(csvText, {
        complete: (result) => {
          setCsvData(result.data); // Set parsed CSV data
        },
      });
    };
    reader.readAsText(new Blob([file.data])); // Ensure file.data is read as text
  };

  const parseExcel = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(excelData); // Set parsed Excel data
    };
    reader.readAsArrayBuffer(new Blob([file.data]));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Files</h1>
        <p className="mt-1 text-sm text-gray-500">Upload and manage your files</p>
      </div>

      <div {...getRootProps()} className="max-w-2xl">
        <div
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 rounded-lg ${
            isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 border-dashed'
          }`}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <input {...getInputProps()} />
              <p className="pl-1">Drag and drop files here, or click to select files</p>
            </div>
            <p className="text-xs text-gray-500">Any file up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Uploads</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {files.map((file) => (
              <li key={file.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileType className="h-5 w-5 text-primary-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded on {new Date(file.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Preview Button Removed */}
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => downloadFile(file)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* File View Modal */}
      {isModalOpen && selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 w-96">
            <h3 className="text-lg font-medium text-gray-900">File Preview</h3>
            <p className="text-sm text-gray-500">Type: {selectedFile.type}</p>
            <p className="text-sm text-gray-500">
              Uploaded on: {new Date(selectedFile.uploadedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Uploaded by: {selectedFile.uploadedBy}</p>

            {filePreview ? (
              <div className="mt-4">
                <img src={filePreview} alt="Preview" className="max-w-full h-auto" />
              </div>
            ) : selectedFile.type === 'application/pdf' ? (
              <div className="mt-4">
                <Document file={{ data: selectedFile.data }}>
                  <Page pageNumber={1} />
                </Document>
              </div>
            ) : selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
              <div className="mt-4">
                <h3 className="font-semibold">Excel Data</h3>
                <pre>{JSON.stringify(excelData, null, 2)}</pre>
              </div>
            ) : selectedFile.type === 'text/csv' ? (
              <div className="mt-4">
                <h3 className="font-semibold">CSV Data</h3>
                <pre>{JSON.stringify(csvData, null, 2)}</pre>
              </div>
            ) : (
              <p className="mt-4">No preview available</p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Files;
