import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-secondary-300 hover:border-primary-400'
        }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-secondary-400" />
      <p className="text-secondary-600 mb-2">
        {isDragActive
          ? 'Drop the file here'
          : 'Drag and drop a file here, or click to select'}
      </p>
      <p className="text-sm text-secondary-400">
        Supported formats: CSV, Excel, PDF
      </p>
    </div>
  );
}

export default FileUploader;