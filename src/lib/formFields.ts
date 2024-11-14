// Form field configurations based on sections and tabs
export const formFields = {
    'associated-entities': [
      { name: 'country', label: 'Country of the entity', type: 'list', required: false },
      { name: 'currency', label: 'Currency', type: 'list', required: false },
      { name: 'deletionDate', label: 'Date of deletion in the Register of information', type: 'date', required: false },
      { name: 'integrationDate', label: 'Date of integration in the Register of information', type: 'date', required: false },
      { name: 'lastUpdateDate', label: 'Date of last update', type: 'date', required: false },
      { name: 'hierarchy', label: 'Hierarchy of the entity within the group', type: 'list', required: false },
      { name: 'branchId', label: 'Identification code of the branch', type: 'text', required: true },
      { name: 'parentLei', label: 'LEI of the direct parent undertaking', type: 'text', required: true },
      { name: 'entityLei', label: 'LEI of the entity', type: 'text', required: true },
      { name: 'branchOfficeLei', label: 'LEI of the financial entity head office', type: 'text', required: true },
      { name: 'branchName', label: 'Name of the branch', type: 'text', required: true },
      { name: 'entityName', label: 'Name of the entity', type: 'text', required: true },
      { name: 'entityType', label: 'Type of entity', type: 'list', required: false },
      { name: 'totalAssets', label: 'Value of total assets', type: 'text', required: false }
    ],
    'reporting-entity': [
      { name: 'authority', label: 'Competent Authority', type: 'text', required: true },
      { name: 'country', label: 'Country of the entity', type: 'list', required: false },
      { name: 'lei', label: 'LEI of the entity maintaining the register', type: 'text', required: true },
      { name: 'name', label: 'Name of the entity', type: 'text', required: true },
      { name: 'type', label: 'Type of entity', type: 'list', required: false }
    ],
    'risk-assessment': [
      { name: 'criticality', label: 'Criticality or importance assessment', type: 'list', required: false },
      { name: 'lastAssessmentDate', label: 'Date of the last assessment', type: 'date', required: false },
      { name: 'functionId', label: 'Function Identifier', type: 'text', required: true },
      { name: 'functionName', label: 'Function name', type: 'text', required: true },
      { name: 'discontinueImpact', label: 'Impact of discontinuing the function', type: 'list', required: false },
      { name: 'lei', label: 'LEI of the financial entity', type: 'text', required: true },
      { name: 'license', label: 'Licenced activity', type: 'text', required: false },
      { name: 'criticalityReasons', label: 'Reasons for criticality', type: 'text', required: false },
      { name: 'recoveryPoint', label: 'Recovery point objective', type: 'text', required: false },
      { name: 'recoveryTime', label: 'Recovery time objective', type: 'text', required: false }
    ],
    'contracts-master': [
      { name: 'annualExpense', label: 'Annual expense', type: 'text', required: false },
      { name: 'reference', label: 'Contractual arrangement reference number', type: 'text', required: true },
      { name: 'serviceCountry', label: 'Country of provision', type: 'list', required: false },
      { name: 'governingLaw', label: 'Country of governing law', type: 'list', required: false },
      { name: 'currency', label: 'Currency', type: 'list', required: false },
      { name: 'endDate', label: 'End date', type: 'text', required: false },
      { name: 'functionId', label: 'Function identifier', type: 'text', required: true },
      { name: 'providerId', label: 'ICT provider identification code', type: 'text', required: true },
      { name: 'entityLei', label: 'LEI of entity using services', type: 'list', required: true },
      { name: 'signingLei', label: 'LEI of signing entity', type: 'text', required: true },
      { name: 'relianceLevel', label: 'Level of reliance', type: 'text', required: false },
      { name: 'dataManagement', label: 'Location of data management', type: 'text', required: false },
      { name: 'dataStorage', label: 'Location of data storage', type: 'text', required: false },
      { name: 'entityNotice', label: 'Notice period for entity', type: 'text', required: false },
      { name: 'providerNotice', label: 'Notice period for provider', type: 'text', required: false },
      { name: 'masterReference', label: 'Master arrangement reference', type: 'text', required: false },
      { name: 'terminationReason', label: 'Termination reason', type: 'text', required: false },
      { name: 'dataSensitivity', label: 'Data sensitivity', type: 'text', required: false },
      { name: 'startDate', label: 'Start date', type: 'text', required: false },
      { name: 'storage', label: 'Storage of data', type: 'text', required: false },
      { name: 'providerCodeType', label: 'Provider identification code type', type: 'text', required: false },
      { name: 'arrangementType', label: 'Type of arrangement', type: 'list', required: false },
      { name: 'serviceType', label: 'Type of ICT services', type: 'text', required: false }
    ]
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