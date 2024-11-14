import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/auth';
import FormModal from '../components/FormModal';
import ErrorMessage from '../components/ErrorMessage';

function Templates() {
  const [user] = useAtom(userAtom);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [templates, setTemplates] = useState<Record<string, any[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sections = [
    {
      title: "Entities in Scope",
      tabs: [
        { id: "associated-entities", title: "Associated Entities" },
        { id: "reporting-entity", title: "Reporting Entity" },
        { id: "risk-assessment", title: "Risk Assessment" }
      ]
    },
    {
      title: "Contracts & 3P Services",
      tabs: [
        { id: "contracts-master", title: "Contracts Master" },
        { id: "intra-group", title: "Intra-group" }
      ]
    },
    {
      title: "ICT Service Providers",
      tabs: [
        { id: "ict-supply-chains", title: "ICT Supply Chains" },
        { id: "ict-risk-assessment", title: "Risk Assessment" },
        { id: "vendor-master", title: "Vendor Master" }
      ]
    }
  ];

  const loadTemplates = async (formId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/templates/${formId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch templates');
      }
      const data = await response.json();
      setTemplates(prev => ({
        ...prev,
        [formId]: data
      }));
    } catch (error) {
      console.error('Error loading templates:', error);
      setError(`Failed to load templates: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentSection = sections[activeTab];
    if (currentSection) {
      currentSection.tabs.forEach(tab => {
        loadTemplates(tab.id);
      });
    }
  }, [activeTab]);

  const handleCreate = (formId: string) => {
    setSelectedItem(null);
    setActiveForm(formId);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any, formId: string) => {
    setSelectedItem(item);
    setActiveForm(formId);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, formId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/templates/${formId}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete template');
        }
        await loadTemplates(formId);
      } catch (error) {
        console.error('Error deleting template:', error);
        setError(`Failed to delete template: ${error.message}`);
      }
    }
  };

  const handleFormSubmit = async (formId: string, data: any) => {
    try {
      const url = `http://localhost:5000/api/templates/${formId}${selectedItem ? `/${selectedItem.id}` : ''}`;
      const method = selectedItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save template');
      }
      
      await loadTemplates(formId);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving template:', error);
      setError(`Failed to save template: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <Sidebar sections={sections} activeTab={activeTab} setActiveTab={setActiveTab} />
        <ContentArea 
          activeSection={sections[activeTab]} 
          templates={templates}
          loading={loading}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formId={activeForm}
        item={selectedItem}
        onSubmit={(data) => handleFormSubmit(activeForm, data)}
      />

      {error && (
        <ErrorMessage 
          message={error} 
          onClose={() => setError(null)} 
        />
      )}
    </div>
  );
}

const Sidebar = ({ sections, activeTab, setActiveTab }) => (
  <div className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-100">
    <h2 className="text-lg font-semibold mb-4">Sections</h2>
    <div className="space-y-2">
      {sections.map((section, index) => (
        <button
          key={index}
          className={`w-full text-left px-4 py-2 rounded-lg font-medium text-gray-700 ${
            activeTab === index ? 'bg-primary-600 text-white' : 'hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab(index)}
        >
          {section.title}
        </button>
      ))}
    </div>
  </div>
);

const ContentArea = ({ activeSection, templates, loading, onCreate, onEdit, onDelete }) => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  if (!activeSection?.tabs?.length) {
    return (
      <div className="w-full md:w-3/4 p-4">
        <div className="text-center text-gray-500">No data available</div>
      </div>
    );
  }

  const activeTab = activeSection.tabs[activeSubTab];
  const tableData = templates[activeTab.id] || [];

  return (
    <div className="w-full md:w-3/4 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{activeSection.title}</h2>
        <button
          onClick={() => onCreate(activeTab.id)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New
        </button>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {activeSection.tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium ${
                activeSubTab === index
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveSubTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading templates...</p>
          </div>
        ) : tableData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No entries found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(tableData[0].data).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {Object.entries(item.data).map(([key, value]) => (
                      <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {value as string}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(item, activeTab.id)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id, activeTab.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;