export const formFields = {
  'contracts-master': [
    { name: 'annualExpense', label: 'Annual expense or estimated cost of the contractual arrangement for the past year', type: 'text', required: false },
    { name: 'referenceNumber', label: 'Contractual arrangement reference number', type: 'text', required: true },
    { name: 'serviceCountry', label: 'Country of provision of the ICT services', type: 'list', required: false },
    { name: 'governingLawCountry', label: 'Country of the governing law of the contractual arrangement', type: 'list', required: false },
    { name: 'currency', label: 'Currency of the amount reported in RT.02.01.0050', type: 'list', required: false },
    { name: 'endDate', label: 'End date of the contractual arrangement', type: 'text', required: false },
    { name: 'functionId', label: 'Function identifier', type: 'text', required: true },
    { name: 'providerId', label: 'Identification code of the ICT third-party service provider', type: 'text', required: true },
    { name: 'entityLei', label: 'LEI of the entity making use of the ICT service(s)', type: 'list', required: true },
    { name: 'signingLei', label: 'LEI of the entity signing the contractual arrangement', type: 'text', required: true },
    { name: 'relianceLevel', label: 'Level of reliance on the ICT service supporting the critical or important function', type: 'text', required: false },
    { name: 'dataManagementLocation', label: 'Location of management of the data (processing)', type: 'text', required: false },
    { name: 'dataStorageLocation', label: 'Location of the data at rest (storage)', type: 'text', required: false },
    { name: 'entityNoticePeriod', label: 'Notice period for the financial entity making use of the ICT service(s)', type: 'text', required: false },
    { name: 'providerNoticePeriod', label: 'Notice period for the ICT third-party service provider', type: 'text', required: false },
    { name: 'masterReference', label: 'Overarching contractual arrangement reference number', type: 'text', required: false },
    { name: 'terminationReason', label: 'Reason of the termination or ending of the contractual arrangement', type: 'text', required: false },
    { name: 'dataSensitivity', label: 'Sensitiveness of the data stored by the ICT third-party service provider', type: 'text', required: false },
    { name: 'startDate', label: 'Start date of the contractual arrangement', type: 'text', required: false },
    { name: 'dataStorage', label: 'Storage of data', type: 'text', required: false },
    { name: 'providerCodeType', label: 'Type of code to identify the ICT third-party service provider', type: 'text', required: false },
    { name: 'arrangementType', label: 'Type of contractual arrangement', type: 'list', required: false },
    { name: 'serviceType', label: 'Type of ICT services', type: 'text', required: false }
  ],
  'intra-group': [
    { name: 'linkedArrangement', label: 'Contractual arrangement linked to the contractual arrangement referred in RT.02.03.0010', type: 'text', required: false },
    { name: 'referenceNumber', label: 'Contractual arrangement reference number', type: 'text', required: true },
    { name: 'branchId', label: 'Identification code of the branch', type: 'text', required: true },
    { name: 'entityLei', label: 'LEI of the entity making use of the ICT service(s)', type: 'text', required: true },
    { name: 'providerLei', label: 'LEI of the entity providing ICT services', type: 'text', required: true },
    { name: 'entityNature', label: 'Nature of the entity making use of the ICT service(s)', type: 'text', required: false }
  ],
  'associated-entities': [
    { name: 'branchCountry', label: 'Country of the branch', type: 'list', required: false },
    { name: 'entityCountry', label: 'Country of the entity', type: 'list', required: false },
    { name: 'currency', label: 'Currency', type: 'list', required: false },
    { name: 'deletionDate', label: 'Date of deletion in the Register of information', type: 'date', required: false },
    { name: 'integrationDate', label: 'Date of integration in the Register of information', type: 'date', required: false },
    { name: 'lastUpdateDate', label: 'Date of last update', type: 'date', required: false },
    { name: 'hierarchy', label: 'Hierarchy of the entity within the group (where applicable)', type: 'list', required: false },
    { name: 'branchId', label: 'Identification code of the branch', type: 'text', required: true },
    { name: 'parentLei', label: 'LEI of the direct parent undertaking of the entity', type: 'text', required: true },
    { name: 'entityLei', label: 'LEI of the entity', type: 'text', required: true },
    { name: 'branchOfficeLei', label: 'LEI of the financial entity head office of the branch', type: 'text', required: true },
    { name: 'branchName', label: 'Name of the branch', type: 'text', required: true },
    { name: 'entityName', label: 'Name of the entity', type: 'text', required: true },
    { name: 'entityType', label: 'Type of entity', type: 'list', required: false },
    { name: 'totalAssets', label: 'Value of total assets - of the financial entity', type: 'text', required: false }
  ],
  'reporting-entity': [
    { name: 'competentAuthority', label: 'Competent Authority', type: 'text', required: false },
    { name: 'entityCountry', label: 'Country of the entity', type: 'list', required: false },
    { name: 'entityLei', label: 'LEI of the entity maintaining the register of information', type: 'text', required: false },
    { name: 'entityName', label: 'Name of the entity', type: 'text', required: true },
    { name: 'entityType', label: 'Type of entity', type: 'list', required: false }
  ],
  'risk-assessment': [
    { name: 'criticalityAssessment', label: 'Criticality or importance assessment', type: 'list', required: false },
    { name: 'assessmentDate', label: 'Date of the last assessment of criticality or importance', type: 'date', required: false },
    { name: 'functionId', label: 'Function Identifier', type: 'text', required: false },
    { name: 'functionName', label: 'Function name', type: 'text', required: false },
    { name: 'discontinuationImpact', label: 'Impact of discontinuing the function', type: 'list', required: false },
    { name: 'entityLei', label: 'LEI of the financial entity', type: 'text', required: true },
    { name: 'licensedActivity', label: 'Licenced activity', type: 'text', required: false },
    { name: 'criticalityReasons', label: 'Reasons for criticality or importance', type: 'text', required: false },
    { name: 'recoveryPointObjective', label: 'Recovery point objective of the function', type: 'text', required: false },
    { name: 'recoveryTimeObjective', label: 'Recovery time objective of the function', type: 'text', required: false }
  ],
  'ict-supply-chains': [
    { name: 'arrangementReference', label: 'Contractual arrangement reference number', type: 'text', required: true },
    { name: 'providerId', label: 'Identification code of the ICT third-party service provider', type: 'text', required: true },
    { name: 'recipientId', label: 'Identification code of the recipient of sub-contracted ICT services', type: 'text', required: true },
    { name: 'rank', label: 'Rank', type: 'text', required: false },
    { name: 'providerCodeType', label: 'Type of code to identify the ICT third-party service provider', type: 'text', required: false },
    { name: 'recipientCodeType', label: 'Type of code to identify the recipient of sub-contracted ICT services', type: 'text', required: false },
    { name: 'serviceType', label: 'Type of ICT services', type: 'text', required: false }
  ],
  'ict-risk-assessment': [
    { name: 'alternativeProviders', label: 'Are there alternative ICT third-party service providers identified?', type: 'text', required: false },
    { name: 'referenceNumber', label: 'Contractual arrangement reference number', type: 'text', required: true },
    { name: 'lastAuditDate', label: 'Date of the last audit on the ICT third-party service provider', type: 'date', required: false },
    { name: 'exitPlanExistence', label: 'Existence of an exit plan', type: 'text', required: false },
    { name: 'providerId', label: 'Identification code of the ICT third-party service provider', type: 'text', required: true },
    { name: 'alternativeProviderId', label: 'Identification of alternative ICT TPP', type: 'text', required: false },
    { name: 'discontinuationImpact', label: 'Impact of discontinuing the ICT services', type: 'text', required: false },
    { name: 'reintegrationPossibility', label: 'Possibility of reintegration of the contracted ICT service', type: 'text', required: false },
    { name: 'nonSubstitutabilityReason', label: 'Reason if the ICT third-party service provider is considered not substitutable or difficult to be substitutable', type: 'text', required: false },
    { name: 'substitutability', label: 'Substitutability of the ICT third-party service provider', type: 'text', required: false },
    { name: 'providerCodeType', label: 'Type of code to identify the ICT third-party service provider', type: 'text', required: false },
    { name: 'serviceType', label: 'Type of ICT services', type: 'text', required: false }
  ],
  'vendor-master': [
    { name: 'referenceNumber', label: 'Contractual arrangement reference number', type: 'text', required: true },
    { name: 'providerHeadquartersCountry', label: 'Country of the ICT third-party service provider’s headquarters', type: 'list', required: false },
    { name: 'currency', label: 'Currency of the amount reported in RT.05.01.0070', type: 'list', required: false },
    { name: 'providerId', label: 'Identification code of ICT third-party service provider', type: 'text', required: true },
    { name: 'ultimateParentId', label: 'Identification code of the ICT third-party service provider’s ultimate parent undertaking', type: 'text', required: false },
    { name: 'providerName', label: 'Name of the ICT third-party service provider', type: 'text', required: true },
    { name: 'annualExpense', label: 'Total annual expense or estimated cost of the ICT third-party service provider', type: 'text', required: false },
    { name: 'providerCodeType', label: 'Type of code to identify the ICT third-party service provider', type: 'text', required: false },
    { name: 'ultimateParentCodeType', label: 'Type of code to identify the ICT third-party service provider’s ultimate parent undertaking', type: 'text', required: false },
    { name: 'providerType', label: 'Type of person of the ICT third-party service provider', type: 'text', required: false }
  ]
};

export const dropdownOptions = {
  country: [
    'United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Singapore', 'Japan'
  ],
  currency: ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'SGD'],
  entityType: ['Bank', 'Investment Firm', 'Insurance Company', 'Payment Institution', 'E-money Institution'],
  criticalityAssessment: ['Critical', 'Important', 'Non-critical'],
  hierarchy: ['Head Office', 'Regional Office', 'Branch'],
  discontinuationImpact: ['Severe', 'Moderate', 'Low'],
  arrangementType: ['Direct Contract', 'Master Service Agreement', 'Framework Agreement', 'Service Level Agreement']
};
