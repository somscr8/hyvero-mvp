import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType } from 'lucide-react';
import { db } from '../lib/db';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/auth';

function Files() {
  const [user] = useAtom(userAtom);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return;

    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        await db.files.add({
          name: file.name,
          size: file.size,
          type: file.type,
          data: arrayBuffer,
          uploadedBy: user.id!,
          uploadedAt: new Date()
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Files</h1>
        <p className="mt-1 text-sm text-gray-500">Upload and manage your files</p>
      </div>

      <div {...getRootProps()} className="max-w-2xl">
        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 rounded-lg ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 border-dashed'
        }`}>
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
            {[1, 2, 3].map((item) => (
              <li key={item} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileType className="h-5 w-5 text-primary-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">document-{item}.pdf</p>
                      <p className="text-xs text-gray-500">Uploaded on March {item}, 2024</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-900">
                    Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Files;