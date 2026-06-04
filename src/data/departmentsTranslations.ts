import type { Language } from '@/i18n/translations';

interface LocalizedDept {
  name: string;
  shortName: string;
  description: string;
  fullDescription: string;
  responsibilities: string[];
  headTitle?: string;
}

// English translations for each department, keyed by id.
export const departmentsEn: Record<string, LocalizedDept> = {
  conducere: {
    name: 'DSP Ilfov Leadership',
    shortName: 'Leadership',
    description: 'The Public Health Directorate of Ilfov County is led by an Executive Director who coordinates the entire activity of the institution.',
    fullDescription: 'The DSP Ilfov leadership ensures the strategic management of the institution, the coordination of all functional departments, the representation of the institution in its relationship with central and local authorities, as well as the implementation of public health policies at the county level. The Executive Director is responsible for the proper functioning of all services and for achieving the institutional objectives.',
    responsibilities: [
      'Overall coordination of DSP Ilfov activities',
      'Representing the institution in relations with third parties',
      'Approval of public health programs and strategies',
      'Management of human and financial resources',
      'Reporting to the Ministry of Health',
    ],
    headTitle: 'Executive Director',
  },
  epidemiologie: {
    name: 'Epidemiology Department',
    shortName: 'Epidemiology',
    description: 'Surveillance and control of communicable diseases, investigation of epidemic outbreaks, and coordination of immunization programs.',
    fullDescription: 'The Epidemiology Department carries out surveillance activities for communicable and non-communicable diseases, investigates and manages epidemic outbreaks, coordinates the national immunization program at the county level, and prepares epidemiological reports and analyses. Department staff work closely with healthcare units in the county to ensure a rapid response in case of public health alerts.',
    responsibilities: [
      'Surveillance of communicable and non-communicable diseases',
      'Investigation and management of epidemic outbreaks',
      'Coordination of the immunization program',
      'Monitoring vaccination coverage',
      'Reporting epidemiological data to CNSCBT',
      'Assessment of epidemiological risks',
    ],
  },
  igiena: {
    name: 'Hygiene & Public Health Department',
    shortName: 'Hygiene',
    description: 'Control and monitoring of hygiene conditions in public, food, and healthcare units in Ilfov County.',
    fullDescription: 'The Hygiene and Public Health Department conducts surveillance and control of environmental factors that impact public health. This includes monitoring drinking water quality, controlling sanitary conditions in public food units, educational institutions, healthcare units, and other public spaces. The department issues sanitary opinions and operating authorizations.',
    responsibilities: [
      'Monitoring drinking and bathing water quality',
      'Surveillance of public food units',
      'Inspections in educational and social institutions',
      'Issuance of sanitary opinions and authorizations',
      'Monitoring environmental factors',
      'Assessing compliance with sanitary standards',
    ],
  },
  control: {
    name: 'Public Health Control Department',
    shortName: 'Control',
    description: 'Inspections and verifications in healthcare units, pharmacies, and other institutions to ensure compliance with sanitary legislation.',
    fullDescription: 'The Public Health Control Department conducts planned or unannounced inspections in public and private healthcare units, pharmacies, laboratories, and other relevant institutions. The aim is to ensure compliance with current legislation, quality standards, and operating regulations. The department applies administrative sanctions and proposes corrective measures when non-compliance is identified.',
    responsibilities: [
      'Planned inspections in healthcare units',
      'Unannounced controls following complaints',
      'Verification of sanitary legislation compliance',
      'Application of administrative sanctions',
      'Monitoring the implementation of corrective measures',
      'Collaboration with other control authorities',
    ],
  },
  promovare: {
    name: 'Health Promotion Department',
    shortName: 'Promotion',
    description: 'Health education campaigns, prevention programs, and public information activities about public health.',
    fullDescription: 'The Health Promotion Department organizes and conducts health education campaigns, prevention programs for chronic and communicable diseases, and information and counseling activities for the general population and vulnerable groups. The department collaborates with educational institutions, local administration, and non-governmental organizations to promote a healthy lifestyle.',
    responsibilities: [
      'Organizing health education campaigns',
      'Implementing national prevention programs',
      'Community information activities',
      'Collaboration with schools and local institutions',
      'Producing informational materials',
      'Counseling vulnerable groups',
    ],
  },
  statistica: {
    name: 'Medical Evaluation & Statistics Department',
    shortName: 'Statistics',
    description: 'Collection, processing, and analysis of medical statistical data for Ilfov County.',
    fullDescription: 'The Medical Evaluation and Statistics Department ensures the collection, centralization, and processing of statistical data from the county healthcare system. Activities include monitoring health indicators, evaluating healthcare unit performance, preparing periodic statistical reports, and providing the data needed to inform health policy decisions at the local and national level.',
    responsibilities: [
      'Collection and centralization of medical statistical data',
      'Monitoring public health indicators',
      'Preparation of periodic statistical reports',
      'Evaluation of healthcare unit performance',
      'Providing data for health policies',
      'Management of medical databases',
    ],
  },
  juridic: {
    name: 'Legal Department',
    shortName: 'Legal',
    description: 'Legal assistance, specialized consultancy, drafting of administrative documents, and representation of the institution in court.',
    fullDescription: 'The Legal Department provides the legal support necessary for the operation of the Public Health Directorate of Ilfov County. The department\'s activity includes the legal review of administrative documents and contracts, providing legal advice to the institution\'s departments, court representation, monitoring legislative changes that affect DSP\'s activity, and preparing legal opinions requested by management. The department contributes to ensuring the legality of the entire institutional activity.',
    responsibilities: [
      'Legal review of administrative documents issued by the institution',
      'Representation of the institution in court',
      'Legal consultancy for all departments',
      'Drafting and verification of institution contracts',
      'Monitoring legislation affecting DSP activity',
      'Management of administrative litigation',
    ],
  },
  'resurse-umane': {
    name: 'Human Resources Department',
    shortName: 'Human Resources',
    description: 'Personnel management, recruitment competitions, personnel records, and continuous professional training.',
    fullDescription: 'The Human Resources Department is responsible for managing the human capital of the Public Health Directorate of Ilfov County. Activities include workforce planning, organizing and conducting recruitment competitions, managing professional records, administering attendance and leave records, preparing staffing schedules, and coordinating continuous professional training programs. The department ensures compliance with labor legislation and specific public service regulations.',
    responsibilities: [
      'Organization and conduct of recruitment competitions',
      'Management of employee professional files',
      'Preparation and updating of the staffing schedule',
      'Administration of leaves, timesheets, and personnel records',
      'Coordination of continuous professional training programs',
      'Application of labor and public service legislation',
    ],
  },
  it: {
    name: 'IT Department',
    shortName: 'IT',
    description: 'Administration of IT infrastructure, system maintenance, cybersecurity, and technical support for the institution\'s staff.',
    fullDescription: 'The IT Department ensures the proper functioning of the IT infrastructure of the Public Health Directorate of Ilfov County. Activities include managing networks and servers, maintaining hardware and software equipment, managing the IT systems used in current operations, ensuring cybersecurity and data protection, and providing technical support to institution staff. The department contributes to the digitalization of internal processes and to compliance with personal data protection regulations (GDPR).',
    responsibilities: [
      'Administration of internal network, servers, and IT equipment',
      'Maintenance of IT systems and applications used',
      'Ensuring cybersecurity and data protection',
      'Technical support for institution users',
      'Implementation of internal process digitalization solutions',
      'Management of software licenses and data backups',
    ],
  },
  audit: {
    name: 'Internal Public Audit Department',
    shortName: 'Audit',
    description: 'Independent assessment of management and internal control systems, risk identification, and improvement recommendations.',
    fullDescription: 'The Internal Public Audit Department carries out independent and objective assessments of the financial management and internal control systems of the Public Health Directorate of Ilfov County. Activities include planning and conducting audit missions, analyzing institutional risks, verifying compliance with legislation and internal procedures, formulating recommendations to improve processes, and following up on their implementation. The department reports directly to the institution\'s management and collaborates with external audit bodies, contributing to increased efficiency and transparency in the use of public funds.',
    responsibilities: [
      'Preparation of the annual and multi-year internal public audit plan',
      'Conducting audit missions in accordance with current standards',
      'Evaluation of the managerial internal control system',
      'Risk analysis and improvement recommendations',
      'Follow-up on implementation of recommendations',
      'Reporting audit results to management and UCAAPI',
    ],
  },
  economic: {
    name: 'Economic & Financial Department',
    shortName: 'Economic',
    description: 'Financial-accounting management, budget preparation, public procurement, and management of the institution\'s assets.',
    fullDescription: 'The Economic and Financial Department is responsible for the financial-accounting management of the institution, preparing and executing the budget, organizing public procurement, managing assets, and ensuring compliance with current financial legislation. The department handles salary payments, financial reporting, and preventive financial control.',
    responsibilities: [
      'Preparation and execution of the institution\'s budget',
      'Accounting and financial records',
      'Organization of public procurement',
      'Asset management',
      'Preventive financial control',
      'Financial reporting to competent authorities',
    ],
  },
  achizitii: {
    name: 'Public Procurement Department',
    shortName: 'Procurement',
    description: 'Planning, organization, and execution of public procurement procedures necessary for the institution\'s operations.',
    fullDescription: 'The Public Procurement Department ensures the annual planning of procurement, the preparation of award documentation, and the organization and conduct of public procurement procedures in accordance with current legislation. The department manages procurement contracts, monitors their execution, and ensures the transparency of the entire process by publishing notices in the Electronic Public Procurement System (SEAP).',
    responsibilities: [
      'Preparation of the annual public procurement plan',
      'Preparation of award documentation',
      'Organization of public procurement procedures',
      'Management of procurement contracts',
      'Publication of notices in SEAP',
      'Monitoring of contract execution',
    ],
  },
  administrativ: {
    name: 'Administrative / Maintenance Department',
    shortName: 'Administrative',
    description: 'Administration, upkeep, and maintenance of the institution\'s premises, equipment, and infrastructure.',
    fullDescription: 'The Administrative / Maintenance Department is responsible for managing the institution\'s premises, maintaining and repairing equipment, managing the vehicle fleet, ensuring optimal working conditions for institution staff, and managing stocks of consumable materials. The department also coordinates cleaning, security, and building safety activities.',
    responsibilities: [
      'Administration and maintenance of the institution\'s premises',
      'Vehicle fleet management',
      'Coordination of cleaning and security activities',
      'Maintenance of equipment and installations',
      'Management of consumable material stocks',
      'Ensuring optimal working conditions',
    ],
  },
};

import type { Department } from './departments';

export function getLocalizedDepartment(dept: Department, lang: Language): Department {
  if (lang === 'ro') return dept;
  const en = departmentsEn[dept.id];
  if (!en) return dept;
  return {
    ...dept,
    name: en.name,
    shortName: en.shortName,
    description: en.description,
    fullDescription: en.fullDescription,
    responsibilities: en.responsibilities,
    headTitle: en.headTitle ?? dept.headTitle,
  };
}
