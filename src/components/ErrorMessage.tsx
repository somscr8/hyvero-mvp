import React from 'react';
import { X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <X className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onClose}
            className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;