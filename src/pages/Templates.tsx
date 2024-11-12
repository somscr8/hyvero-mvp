import React, { useState } from 'react';

function Templates() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Instructions", content: <InstructionsSection /> },
    { title: "Entity Details", content: <EntityDetailsSection /> },
    { title: "Associated Entities", content: <AssociatedEntitiesSection /> },
    { title: "Financial Information", content: <FinancialInformationSection /> },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentArea activeTab={activeTab} tabs={tabs} />
    </div>
  );
}

const Sidebar = ({ tabs, activeTab, setActiveTab }) => (
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
);

const ContentArea = ({ activeTab, tabs }) => (
  <div className="w-full md:w-3/4 p-4">
    <h2 className="text-lg md:text-xl font-semibold mb-2">{tabs[activeTab].title}</h2>
    <div className="bg-white shadow p-4 sm:p-6 rounded-md">
      {tabs[activeTab].content}
    </div>
  </div>
);

const HorizontalTabs = ({ tabs }) => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              activeSubTab === index ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveSubTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>{tabs[activeSubTab].content}</div>
    </div>
  );
};

// Save button component
const SaveButton = () => (
  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
    Save
  </button>
);

// Instructions Section with no sub-tabs for simplicity
const InstructionsSection = () => (
  <div>
    <p className="text-gray-600 mb-4">Please fill out the information as required in each section.</p>
  </div>
);

// Entity Details Section with Horizontal Sub-tabs and Form Fields
const EntityDetailsSection = () => (
  <HorizontalTabs
    tabs={[
      {
        title: "General Info",
        content: (
          <div>
            <label className="block">
              <span className="text-gray-700">LEI of the entity</span>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter LEI" />
            </label>
            <label className="block">
              <span className="text-gray-700">Name of the entity</span>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <SaveButton />
          </div>
        ),
      },
      {
        title: "Legal Details",
        content: (
          <div>
            <label className="block">
              <span className="text-gray-700">Country of the entity</span>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <label className="block">
              <span className="text-gray-700">Type of the entity</span>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <SaveButton />
          </div>
        ),
      },
      {
        title: "Contact Info",
        content: (
          <div>
            <label className="block">
              <span className="text-gray-700">Competent Authority</span>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <label className="block">
              <span className="text-gray-700">Date of Reporting</span>
              <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <SaveButton />
          </div>
        ),
      },
    ]}
  />
);

// Associated Entities Section
const AssociatedEntitiesSection = () => (
  <HorizontalTabs
    tabs={[
      {
        title: "Positions",
        content: (
          <div>
            <label className="block">
              <span className="text-gray-700">Position</span>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter position" />
            </label>
            <label className="block">
              <span className="text-gray-700">Start Date</span>
              <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <SaveButton />
          </div>
        ),
      },
      {
        title: "Relations",
        content: (
          <div>
            <label className="block">
              <span className="text-gray-700">Related Entity</span>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter related entity" />
            </label>
            <SaveButton />
          </div>
        ),
      },
    ]}
  />
);

// Financial Information Section
const FinancialInformationSection = () => (
  <HorizontalTabs
    tabs={[
      {
        title: "Salary",
        content: (
          <div>
            <label className="block">
              <span className="text-gray-700">Annual Salary</span>
              <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter salary" />
            </label>
            <SaveButton />
          </div>
        ),
      },
      {
        title: "Bonuses",
        content: (
          <div>
            <label className="block">
              <span className="text-gray-700">Bonus</span>
              <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Enter bonus" />
            </label>
            <SaveButton />
          </div>
        ),
      },
    ]}
  />
);

export default Templates;
