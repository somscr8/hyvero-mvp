import React, { useState } from 'react';

function Templates() {
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      title: "Contracts & 3P Services",
      tabs: [
        { title: "Contracts Master", content: <ContractsMasterTab /> },
        { title: "Intra-group", content: <IntraGroupTab /> },
      ],
    },
    {
      title: "Entities in Scope",
      tabs: [
        { title: "Associated Entities", content: <AssociatedEntitiesTab /> },
        { title: "Reporting Entity", content: <ReportingEntityTab /> },
        { title: "Risk Assessment", content: <RiskAssessmentTab /> },
      ],
    },
    {
      title: "Generate Report",
      tabs: [{ title: "Generate Final Report", content: <GenerateFinalReportTab /> }],
    },
    {
      title: "ICT Service Providers",
      tabs: [
        { title: "ICT Supply Chains", content: <ICTSupplyChainsTab /> },
        { title: "Risk Assessment", content: <ICTRiskAssessmentTab /> },
        { title: "Vendor Master", content: <VendorMasterTab /> },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4">  {/* Container added here */}
      <div className="flex flex-col md:flex-row">
        <Sidebar sections={sections} activeTab={activeTab} setActiveTab={setActiveTab} />
        <ContentArea activeTab={activeTab} sections={sections} />
      </div>
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
          className={`w-full text-left px-4 py-2 rounded-lg font-medium text-gray-700 ${activeTab === index ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveTab(index)}
        >
          {section.title}
        </button>
      ))}
    </div>
  </div>
);

const ContentArea = ({ activeTab, sections }) => (
  <div className="w-full md:w-3/4 p-4">
    <h2 className="text-lg md:text-xl font-semibold mb-2">{sections[activeTab].title}</h2>
    <HorizontalTabs tabs={sections[activeTab].tabs} />
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
            className={`px-4 py-2 text-sm font-medium ${activeSubTab === index ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveSubTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="w-full md:w-4/4 p-4 h-[720px] overflow-y-auto">{tabs[activeSubTab].content}</div>
    </div>
  );
};

// Contracts Master Tab
const ContractsMasterTab = () => (
  <form>
    {[
      { label: "Annual expense or estimated cost of the contractual arrangement for the past year", type: "text" },
      { label: "Contractual arrangement reference number", type: "text" },
      { label: "Country of provision of the ICT services", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Country of the governing law of the contractual arrangement", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Currency of the amount reported in RT.02.01.0050", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "End date of the contractual arrangement", type: "text" },
      { label: "Function identifier", type: "text" },
      { label: "Identification code of the ICT third-party service provider", type: "text" },
      { label: "LEI of the entity making use of the ICT service(s)", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "LEI of the entity signing the contractual arrangement", type: "text" },
      { label: "Level of reliance on the ICT service supporting the critical or important function.", type: "text" },
      { label: "Location of management of the data (processing)", type: "text" },
      { label: "Location of the data at rest (storage)", type: "text" },
      { label: "Notice period for the financial entity making use of the ICT service(s)", type: "text" },
      { label: "Notice period for the ICT third-party service provider", type: "text" },
      { label: "Overarching contractual arrangement reference number", type: "text" },
      { label: "Reason of the termination or ending of the contractual arrangement", type: "text" },
      { label: "Sensitiveness of the data stored by the ICT third-party service provider", type: "text" },
      { label: "Start date of the contractual arrangement", type: "text" },
      { label: "Storage of data", type: "text" },
      { label: "Type of code to identify the ICT third-party service provider", type: "text" },
      { label: "Type of contractual arrangement", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Type of ICT services", type: "text" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        {input.type === "list" ? (
          <select className="mt-2 p-2 border border-gray-300 rounded w-full">
            {input.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
        )}
      </div>
    ))}
  </form>
);

// Intra-group Tab
const IntraGroupTab = () => (
  <form>
    {[
      { label: "Contractual arrangement linked to the contractual arrangement referred in RT.02.03.0010", type: "text" },
      { label: "Contractual arrangement reference number", type: "text" },
      { label: "Identification code of the branch", type: "text" },
      { label: "LEI of the entity making use of the ICT service(s)", type: "text" },
      { label: "LEI of the entity providing ICT services", type: "text" },
      { label: "Nature of the entity making use of the ICT service(s)", type: "text" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
      </div>
    ))}
  </form>
);

// Associated Entities Tab
const AssociatedEntitiesTab = () => (
  <form>
    {[
      { label: "Country of the branch", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Country of the entity", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Currency", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Date of deletion in the Register of information", type: "date" },
      { label: "Date of integration in the Register of information", type: "date" },
      { label: "Date of last update", type: "date" },
      { label: "Hierarchy of the entity within the group (where applicable)", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Identification code of the branch", type: "text" },
      { label: "LEI of the direct parent undertaking of the entity", type: "text" },
      { label: "LEI of the entity", type: "text" },
      { label: "LEI of the financial entity head office of the branch", type: "text" },
      { label: "Name of the branch", type: "text" },
      { label: "Name of the entity", type: "text" },
      { label: "Type of entity", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Value of total assets - of the financial entity", type: "text" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        {input.type === "list" ? (
          <select className="mt-2 p-2 border border-gray-300 rounded w-full">
            {input.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        ) : input.type === "date" ? (
          <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
        ) : (
          <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
        )}
      </div>
    ))}
  </form>
);

// Reporting Entity Tab
const ReportingEntityTab = () => (
  <form>
    {[
      { label: "Competent Authority", type: "text" },
      { label: "Country of the entity", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "LEI of the entity maintaining the register of information", type: "text" },
      { label: "Name of the entity", type: "text" },
      { label: "Type of entity", type: "list", options: ["value 1", "value 2", "value 3"] },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        {input.type === "list" ? (
          <select className="mt-2 p-2 border border-gray-300 rounded w-full">
            {input.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
        )}
      </div>
    ))}
  </form>
);

// Risk Assessment Tab
const RiskAssessmentTab = () => (
  <form>
    {[
      { label: "Criticality or importance assessment", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "Date of the last assessment of criticality or importance", type: "date" },
      { label: "Function Identifier", type: "text" },
      { label: "Function name", type: "text" },
      { label: "Impact of discontinuing the function", type: "list", options: ["value 1", "value 2", "value 3"] },
      { label: "LEI of the financial entity", type: "text" },
      { label: "Licenced activity", type: "text" },
      { label: "Reasons for criticality or importance", type: "text" },
      { label: "Recovery point objective of the function", type: "text" },
      { label: "Recovery time objective of the function", type: "text" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        {input.type === "list" ? (
          <select className="mt-2 p-2 border border-gray-300 rounded w-full">
            {input.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        ) : input.type === "date" ? (
          <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
        ) : (
          <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
        )}
      </div>
    ))}
  </form>
);

// Generate Final Report Tab
const GenerateFinalReportTab = () => (
  <form>
    {[
      { label: "Date of the reporting", type: "date" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
      </div>
    ))}
  </form>
);

// ICT Supply Chains Tab
const ICTSupplyChainsTab = () => (
  <form>
    {[
      { label: "Contractual arrangement reference number", type: "text" },
      { label: "Identification code of the ICT third-party service provider", type: "text" },
      { label: "Identification code of the recipient of sub-contracted ICT services", type: "text" },
      { label: "Rank", type: "text" },
      { label: "Type of code to identify the ICT third-party service provider", type: "text" },
      { label: "Type of code to identify the recipient of sub-contracted ICT services", type: "text" },
      { label: "Type of ICT services", type: "text" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
      </div>
    ))}
  </form>
);

// ICT Risk Assessment Tab
const ICTRiskAssessmentTab = () => (
  <form>
    {[
      { label: "Are there alternative ICT third-party service providers identified?", type: "text" },
      { label: "Contractual arrangement reference number", type: "text" },
      { label: "Date of the last audit on the ICT third-party service provider", type: "text" },
      { label: "Existence of an exit plan", type: "text" },
      { label: "Identification code of the ICT third-party service provider", type: "text" },
      { label: "Identification of alternative ICT TPP", type: "text" },
      { label: "Impact of discontinuing the ICT services", type: "text" },
      { label: "Possibility of reintegration of the contracted ICT service", type: "text" },
      { label: "Reason if the ICT third-party service provider is considered not substitutable or difficult to be substitutable", type: "text" },
      { label: "Substitutability of the ICT third-party service provider", type: "text" },
      { label: "Type of code to identify the ICT third-party service provider", type: "text" },
      { label: "Type of ICT services", type: "text" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
      </div>
    ))}
  </form>
);

// Vendor Master Tab
const VendorMasterTab = () => (
  <form>
    {[
      { label: "Contractual arrangement reference number", type: "text" },
      { label: "Country of the ICT third-party service provider’s headquarters", type: "text" },
      { label: "Currency of the amount reported in RT.05.01.0070", type: "text" },
      { label: "Identification code of ICT third-party service provider", type: "text" },
      { label: "Identification code of the ICT third-party service provider’s ultimate parent undertaking", type: "text" },
      { label: "Name of the ICT third-party service provider", type: "text" },
      { label: "Total annual expense or estimated cost of the ICT third-party service provider", type: "text" },
      { label: "Type of code to identify the ICT third-party service provider", type: "text" },
      { label: "Type of person of the ICT third-party service provider", type: "text" },
    ].map((input, index) => (
      <div className="mb-4" key={index}>
        <label className="block text-sm font-medium">{input.label}</label>
        <input type={input.type} className="mt-2 p-2 border border-gray-300 rounded w-full" />
      </div>
    ))}
  </form>
);

export default Templates;
