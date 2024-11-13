import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/auth';
import FormModal from '../components/FormModal';

function Templates() {
  const [user] = useAtom(userAtom);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const sections = [
    {
      title: "Entities in Scope",
      tabs: [
        { 
          id: "associated-entities",
          title: "Associated Entities",
          data: [
            { id: 1, name: "Entity A", type: "Subsidiary", country: "USA", lastUpdated: "2024-03-15" },
            { id: 2, name: "Entity B", type: "Branch", country: "UK", lastUpdated: "2024-03-14" }
          ]
        },
        { 
          id: "reporting-entity",
          title: "Reporting Entity",
          data: [
            { id: 1, name: "Main Corp", type: "Parent", authority: "FCA", country: "UK" },
            { id: 2, name: "Sub Corp", type: "Subsidiary", authority: "SEC", country: "USA" }
          ]
        },
        { 
          id: "risk-assessment",
          title: "Risk Assessment",
          data: [
            { id: 1, function: "Trading", criticality: "High", lastAssessment: "2024-03-10" },
            { id: 2, function: "Settlement", criticality: "Medium", lastAssessment: "2024-03-09" }
          ]
        }
      ]
    },
    {
      title: "Contracts & 3P Services",
      tabs: [
        { 
          id: "contracts-master",
          title: "Contracts Master",
          data: [
            { id: 1, reference: "CTR-001", provider: "Tech Corp", startDate: "2024-01-01", endDate: "2024-12-31" },
            { id: 2, reference: "CTR-002", provider: "Cloud Inc", startDate: "2024-02-01", endDate: "2025-01-31" }
          ]
        },
        { 
          id: "intra-group",
          title: "Intra-group",
          data: [
            { id: 1, reference: "IG-001", entity: "Subsidiary A", service: "IT Support" },
            { id: 2, reference: "IG-002", entity: "Branch B", service: "Data Processing" }
          ]
        }
      ]
    },
    {
      title: "ICT Service Providers",
      tabs: [
        { 
          id: "ict-supply-chains",
          title: "ICT Supply Chains",
          data: [
            { id: 1, provider: "Tech Solutions", service: "Cloud Storage", rank: "Tier 1" },
            { id: 2, provider: "Data Corp", service: "Processing", rank: "Tier 2" }
          ]
        },
        { 
          id: "ict-risk-assessment",
          title: "Risk Assessment",
          data: [
            { id: 1, provider: "Tech Solutions", risk: "Medium", lastAudit: "2024-02-15" },
            { id: 2, provider: "Data Corp", risk: "Low", lastAudit: "2024-02-10" }
          ]
        },
        { 
          id: "vendor-master",
          title: "Vendor Master",
          data: [
            { id: 1, name: "Tech Solutions", country: "USA", type: "Corporation" },
            { id: 2, name: "Data Corp", country: "UK", type: "Limited" }
          ]
        }
      ]
    }
  ];

  const handleCreate = (formId) => {
    setSelectedItem(null);
    setActiveForm(formId);
    setIsModalOpen(true);
  };

  const handleEdit = (item, formId) => {
    setSelectedItem(item);
    setActiveForm(formId);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, formId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // Implement delete API call
        console.log(`Deleting item ${id} from ${formId}`);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <Sidebar sections={sections} activeTab={activeTab} setActiveTab={setActiveTab} />
        <ContentArea 
          activeSection={sections[activeTab]} 
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
      />
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

const ContentArea = ({ activeSection, onCreate, onEdit, onDelete }) => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  // Add null checks and default values
  if (!activeSection?.tabs?.length) {
    return (
      <div className="w-full md:w-3/4 p-4">
        <div className="text-center text-gray-500">No data available</div>
      </div>
    );
  }

  const activeTab = activeSection.tabs[activeSubTab] || activeSection.tabs[0];
  const tableData = activeTab?.data || [];

  if (!tableData.length) {
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
        <div className="text-center text-gray-500 mt-8">No entries found</div>
      </div>
    );
  }

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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(tableData[0] || {}).map((key) => (
                  key !== 'id' && (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </th>
                  )
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {Object.entries(item).map(([key, value]) => (
                    key !== 'id' && (
                      <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {value}
                      </td>
                    )
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
      </div>
    </div>
  );
};

export default Templates;