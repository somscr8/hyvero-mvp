// Form field configurations based on sections and tabs
export const formFields = {
    'associated-entities': [
      { name: 'country', label: 'Country of the entity', type: 'list', required: true },
      { name: 'currency', label: 'Currency', type: 'list', required: true },
      { name: 'deletionDate', label: 'Date of deletion in the Register of information', type: 'date', required: false },
      { name: 'integrationDate', label: 'Date of integration in the Register of information', type: 'date', required: true },
      { name: 'lastUpdateDate', label: 'Date of last update', type: 'date', required: true },
      { name: 'hierarchy', label: 'Hierarchy of the entity within the group', type: 'list', required: true },
      { name: 'branchId', label: 'Identification code of the branch', type: 'text', required: true },
      { name: 'parentLei', label: 'LEI of the direct parent undertaking', type: 'text', required: true },
      { name: 'entityLei', label: 'LEI of the entity', type: 'text', required: true },
      { name: 'branchOfficeLei', label: 'LEI of the financial entity head office', type: 'text', required: true },
      { name: 'branchName', label: 'Name of the branch', type: 'text', required: true },
      { name: 'entityName', label: 'Name of the entity', type: 'text', required: true },
      { name: 'entityType', label: 'Type of entity', type: 'list', required: true },
      { name: 'totalAssets', label: 'Value of total assets', type: 'text', required: true }
    ],
    'reporting-entity': [
      { name: 'authority', label: 'Competent Authority', type: 'text', required: true },
      { name: 'country', label: 'Country of the entity', type: 'list', required: true },
      { name: 'lei', label: 'LEI of the entity maintaining the register', type: 'text', required: true },
      { name: 'name', label: 'Name of the entity', type: 'text', required: true },
      { name: 'type', label: 'Type of entity', type: 'list', required: false }
    ],
    'risk-assessment': [
      { name: 'criticality', label: 'Criticality or importance assessment', type: 'list', required: true },
      { name: 'lastAssessmentDate', label: 'Date of the last assessment', type: 'date', required: true },
      { name: 'functionId', label: 'Function Identifier', type: 'text', required: true },
      { name: 'functionName', label: 'Function name', type: 'text', required: true },
      { name: 'discontinueImpact', label: 'Impact of discontinuing the function', type: 'list', required: true },
      { name: 'lei', label: 'LEI of the financial entity', type: 'text', required: true },
      { name: 'license', label: 'Licenced activity', type: 'text', required: true },
      { name: 'criticalityReasons', label: 'Reasons for criticality', type: 'text', required: true },
      { name: 'recoveryPoint', label: 'Recovery point objective', type: 'text', required: true },
      { name: 'recoveryTime', label: 'Recovery time objective', type: 'text', required: true }
    ],
    'contracts-master': [
      { name: 'annualExpense', label: 'Annual expense', type: 'text', required: true },
      { name: 'reference', label: 'Contractual arrangement reference number', type: 'text', required: true },
      { name: 'serviceCountry', label: 'Country of provision', type: 'list', required: true },
      { name: 'governingLaw', label: 'Country of governing law', type: 'list', required: true },
      { name: 'currency', label: 'Currency', type: 'list', required: true },
      { name: 'endDate', label: 'End date', type: 'text', required: true },
      { name: 'functionId', label: 'Function identifier', type: 'text', required: true },
      { name: 'providerId', label: 'ICT provider identification code', type: 'text', required: true },
      { name: 'entityLei', label: 'LEI of entity using services', type: 'list', required: true },
      { name: 'signingLei', label: 'LEI of signing entity', type: 'text', required: true },
      { name: 'relianceLevel', label: 'Level of reliance', type: 'text', required: true },
      { name: 'dataManagement', label: 'Location of data management', type: 'text', required: true },
      { name: 'dataStorage', label: 'Location of data storage', type: 'text', required: true },
      { name: 'entityNotice', label: 'Notice period for entity', type: 'text', required: true },
      { name: 'providerNotice', label: 'Notice period for provider', type: 'text', required: true },
      { name: 'masterReference', label: 'Master arrangement reference', type: 'text', required: true },
      { name: 'terminationReason', label: 'Termination reason', type: 'text', required: false },
      { name: 'dataSensitivity', label: 'Data sensitivity', type: 'text', required: true },
      { name: 'startDate', label: 'Start date', type: 'text', required: true },
      { name: 'storage', label: 'Storage of data', type: 'text', required: true },
      { name: 'providerCodeType', label: 'Provider identification code type', type: 'text', required: true },
      { name: 'arrangementType', label: 'Type of arrangement', type: 'list', required: true },
      { name: 'serviceType', label: 'Type of ICT services', type: 'text', required: true }
    ]
    // Add other sections as needed
  };
  
  export const dropdownOptions = {
    country: [
      'United States',
      'United Kingdom',
      'Germany',
      'France',
      'Italy',
      'Spain',
      'Netherlands',
      'Switzerland',
      'Singapore',
      'Japan'
    ],
    currency: ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'SGD'],
    entityType: [
      'Bank',
      'Investment Firm',
      'Insurance Company',
      'Payment Institution',
      'E-money Institution'
    ],
    criticality: ['High', 'Medium', 'Low'],
    arrangementType: [
      'Direct Contract',
      'Master Service Agreement',
      'Framework Agreement',
      'Service Level Agreement'
    ]
  };