import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formFields, dropdownOptions } from '../lib/formFields';

function FormModal({ isOpen, onClose, formId, item }) {
  const fields = formFields[formId];
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: item || {}
  });

  if (!isOpen || !fields) return null;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/templates/${formId}${item ? `/${item.id}` : ''}`, {
        method: item ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Failed to save data');

      onClose();
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getFieldComponent = (field) => {
    switch (field.type) {
      case 'list':
        return (
          <select
            {...register(field.name, { required: field.required })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select...</option>
            {dropdownOptions[field.name]?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            {...register(field.name, { required: field.required })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        );
      default:
        return (
          <input
            type="text"
            {...register(field.name, { required: field.required })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg max-w-3xl w-full mx-auto shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">
              {item ? 'Edit Entry' : 'New Entry'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {getFieldComponent(field)}
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">This field is required</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                {item ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormModal;