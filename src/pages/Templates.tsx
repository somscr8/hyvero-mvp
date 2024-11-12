import React, { useState } from 'react';

function Templates() {
  const [activeTab, setActiveTab] = useState(0);

  // Static instruction content
  const instructions = `
    Please fill out the information in each tab as required. Each tab represents a different section of the form data.
    Ensure all fields are completed accurately before submission.
  `;

  // Tab data
  const tabs = [
    { title: "Instructions", content: instructions },
    { title: "Entity Details", content: (
      <div>
        <p className="text-gray-600 mb-4">{instructions}</p>
        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">LEI of the entity maintaining the register of information</span>
            <input type="text" className="mt-1 block w-full md:w-3/4 border border-gray-300 rounded-md p-2" placeholder="Enter LEI" />
          </label>
          <label className="block">
            <span className="text-gray-700">Name of the entity</span>
            <input type="text" className="mt-1 block w-full md:w-3/4 border border-gray-300 rounded-md p-2" />
          </label>
          <label className="block">
            <span className="text-gray-700">Country of the entity</span>
            <input type="text" className="mt-1 block w-full md:w-3/4 border border-gray-300 rounded-md p-2" />
          </label>
          <label className="block">
            <span className="text-gray-700">Type of the entity</span>
            <input type="text" className="mt-1 block w-full md:w-3/4 border border-gray-300 rounded-md p-2" />
          </label>
          <label className="block">
            <span className="text-gray-700">Competent Authority</span>
            <input type="text" className="mt-1 block w-full md:w-3/4 border border-gray-300 rounded-md p-2" />
          </label>
          <label className="block">
            <span className="text-gray-700">Date of Reporting</span>
            <input type="date" className="mt-1 block w-full md:w-3/4 border border-gray-300 rounded-md p-2" />
          </label>
        </form>
      </div>
    ) },
    { title: "Associated Entities", content: (
      <div>
        <p className="text-gray-600 mb-4">{instructions}</p>
        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Position</span>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter position" />
          </label>
          <label className="block">
            <span className="text-gray-700">Start Date</span>
            <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </label>
        </form>
      </div>
    ) },
    { title: "Financial Information", content: (
      <div>
        <p className="text-gray-600 mb-4">{instructions}</p>
        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Annual Salary</span>
            <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter salary" />
          </label>
          <label className="block">
            <span className="text-gray-700">Bonus</span>
            <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter bonus" />
          </label>
        </form>
      </div>
    ) },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for vertical tabs */}
      <div className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">Sections</h2>
        <div className="space-y-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium text-gray-700 ${
                activeTab === index ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content area for active tab */}
      <div className="w-full md:w-3/4 p-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">{tabs[activeTab].title}</h2>
        <div className="bg-white shadow p-4 sm:p-6 rounded-md">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
}

export default Templates;