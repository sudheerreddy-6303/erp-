// ============================================================
//  projects.js
// ------------------------------------------------------------
//  Module URLs now come from environment variables (.env) and
//  are validated before use. A module is only treated as
//  "live" when it carries a valid https URL — so a missing or
//  malformed env value safely degrades to "coming soon" instead
//  of rendering a broken/unsafe link.
// ============================================================
import { getSafeUrl } from './utils/safeUrl';

const env = process.env;

// Normalise each configured URL through the safe-URL validator.
// Anything that isn't a clean https link becomes null.
const URLS = {
  quotation:    getSafeUrl(env.REACT_APP_QUOTATION_URL),
  dailyBills:   getSafeUrl(env.REACT_APP_DAILY_BILLS_URL),
  nanakramguda: getSafeUrl(env.REACT_APP_NANAKRAMGUDA_URL),
  crm:          getSafeUrl(env.REACT_APP_CRM_URL),
  salary:       getSafeUrl(env.REACT_APP_SALARY_URL),
  factory:      getSafeUrl(env.REACT_APP_FACTORY_INVENTORY_URL),
};

// Status is derived from the URL: a valid https link => live.
const statusFor = (url) => (url ? 'live' : 'coming_soon');

const projects = [
  {
    id: 1,
    name: 'Quotation Form',
    url: URLS.quotation,
    icon: 'ti-file-invoice',
    accent: '#0B2545',       // navy
    accentLight: '#E8EEF7',
    status: statusFor(URLS.quotation),
    description: 'Create & send customer quotations instantly',
    tag: 'Sales',
  },
  {
    id: 2,
    name: 'Daily Bills',
    url: URLS.dailyBills,
    icon: 'ti-receipt-2',
    accent: '#E8621A',       // orange
    accentLight: '#FFF0E8',
    status: statusFor(URLS.dailyBills),
    description: 'Track day-to-day billing and transactions',
    tag: 'Finance',
  },
  {
    id: 3,
    name: 'Nanakramguda Bills',
    url: URLS.nanakramguda,
    icon: 'ti-building-store',
    accent: '#1A3A6B',       // navy-mid
    accentLight: '#EDF2FB',
    status: statusFor(URLS.nanakramguda),
    description: 'Branch billing management for Nankram Guda',
    tag: 'Branch',
  },
  {
    id: 4,
    name: 'CRM',
    url: URLS.crm,
    icon: 'ti-users',
    accent: '#6A1B9A',       // purple
    accentLight: '#F3E8FF',
    status: statusFor(URLS.crm),
    description: 'Customer Relationship Management & Lead Tracking',
    tag: 'CRM',
  },
  {
    id: 5,
    name: 'Salary Management',
    url: URLS.salary,
    icon: 'ti-wallet',
    accent: '#0B2545',       // navy
    accentLight: '#E8EEF7',
    status: statusFor(URLS.salary),
    description: 'Process payroll, salaries and deductions',
    tag: 'Payroll',
  },
  {
    id: 6,
    name: 'Factory Inventory Management',
    url: URLS.factory,
    icon: 'ti-building-factory',
    accent: '#1B5E20',       // forest green
    accentLight: '#E8F5E9',
    status: statusFor(URLS.factory),
    description: 'Track raw materials, stock and finished goods in factory',
    tag: 'Inventory',
  },
];

export default projects;
