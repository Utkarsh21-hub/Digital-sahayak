export type OfficerRole =
  | 'notary_advocate'
  | 'gazetted_officer'
  | 'tehsildar_revenue'
  | 'mbbs_doctor';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type RequirementLevel = 'yes' | 'often' | 'usually_no' | 'no';

export interface OfficerProfile {
  id: string;
  ownerUid: string;
  fullName: string;
  role: OfficerRole;
  designation: string;
  officeName: string;
  addressLine: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  lat: number;
  lng: number;
  visitingHours: string;
  supportedTasks: string[];
  languagesSpoken: string[];
  feeNote: string;
  officeContact: string;
  verificationStatus: VerificationStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface OfficerPrivateCredentials {
  ownerUid: string;
  personalEmail: string;
  personalPhone: string;
  registrationId: string;
  reviewNotes: string;
  reviewedByUid: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface MapPlaceOfficer {
  id: string;
  name: string;
  role: OfficerRole;
  formattedAddress: string;
  lat: number;
  lng: number;
  googleMapsUri?: string;
  nationalPhoneNumber?: string;
  openNow?: boolean;
  weekdayDescriptions?: string[];
  rating?: number;
  userRatingCount?: number;
}

export interface UnifiedOfficerItem {
  id: string;
  source: 'portal' | 'google_maps';
  name: string;
  role: OfficerRole;
  subtitle: string;
  officeName: string;
  address: string;
  lat: number;
  lng: number;
  distanceKm: number | null;
  verified: boolean;
  visitingHours?: string;
  feeNote?: string;
  contact?: string;
  languagesSpoken?: string[];
  supportedTasks?: string[];
  rating?: number;
  userRatingCount?: number;
  openNow?: boolean;
  googleMapsUri?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

export interface TaskOfficerRequirement {
  procedureId: string;
  level: RequirementLevel;
  roles: OfficerRole[];
  noteKey:
    | 'gazette'
    | 'dlRenewal'
    | 'oci'
    | 'freshAadhaar'
    | 'passport'
    | 'delhiDomicile'
    | 'delhiCaste'
    | 'upDomicile'
    | 'upCaste'
    | 'antiCorruption'
    | 'noOfficerOnline'
    | 'noOfficerAadhaarKendra';
}

export const OFFICER_ROLES: OfficerRole[] = [
  'notary_advocate',
  'gazetted_officer',
  'tehsildar_revenue',
  'mbbs_doctor',
];

export const OFFICER_ROLE_STYLE: Record<
  OfficerRole,
  {
    pinBg: string;
    pinBorder: string;
    pinGlyph: string;
    badgeBg: string;
    badgeText: string;
    shortCode: string;
  }
> = {
  notary_advocate: {
    pinBg: '#1d4ed8',
    pinBorder: '#1e3a8a',
    pinGlyph: '#ffffff',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    shortCode: 'N',
  },
  gazetted_officer: {
    pinBg: '#047857',
    pinBorder: '#064e3b',
    pinGlyph: '#ffffff',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    shortCode: 'G',
  },
  tehsildar_revenue: {
    pinBg: '#b45309',
    pinBorder: '#78350f',
    pinGlyph: '#ffffff',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    shortCode: 'T',
  },
  mbbs_doctor: {
    pinBg: '#be123c',
    pinBorder: '#881337',
    pinGlyph: '#ffffff',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-700 dark:text-rose-300',
    shortCode: 'D',
  },
};

/**
 * Exact mapping of all 15 Digital Sahayak verified government tasks
 * derived from Government_Tasks_Officer_Requirements.pdf.
 */
export const TASK_OFFICER_REQUIREMENTS: Record<string, TaskOfficerRequirement> = {
  'gazette-notification': {
    procedureId: 'gazette-notification',
    level: 'yes',
    roles: ['notary_advocate'],
    noteKey: 'gazette',
  },
  'driving-licence-renewal': {
    procedureId: 'driving-licence-renewal',
    level: 'yes',
    roles: ['mbbs_doctor'],
    noteKey: 'dlRenewal',
  },
  'oci-citizenship': {
    procedureId: 'oci-citizenship',
    level: 'often',
    roles: ['notary_advocate'],
    noteKey: 'oci',
  },
  'fresh-aadhaar-enrolment': {
    procedureId: 'fresh-aadhaar-enrolment',
    level: 'usually_no',
    roles: ['gazetted_officer', 'tehsildar_revenue'],
    noteKey: 'freshAadhaar',
  },
  'tatkaal-passport': {
    procedureId: 'tatkaal-passport',
    level: 'usually_no',
    roles: ['gazetted_officer'],
    noteKey: 'passport',
  },
  'delhi-domicile': {
    procedureId: 'delhi-domicile',
    level: 'usually_no',
    roles: ['notary_advocate'],
    noteKey: 'delhiDomicile',
  },
  'delhi-caste': {
    procedureId: 'delhi-caste',
    level: 'usually_no',
    roles: ['notary_advocate'],
    noteKey: 'delhiCaste',
  },
  'up-domicile': {
    procedureId: 'up-domicile',
    level: 'usually_no',
    roles: ['notary_advocate'],
    noteKey: 'upDomicile',
  },
  'up-caste': {
    procedureId: 'up-caste',
    level: 'usually_no',
    roles: ['notary_advocate'],
    noteKey: 'upCaste',
  },
  'anti-corruption-delayed-service': {
    procedureId: 'anti-corruption-delayed-service',
    level: 'usually_no',
    roles: ['notary_advocate'],
    noteKey: 'antiCorruption',
  },
  'neet-ug-2025': {
    procedureId: 'neet-ug-2025',
    level: 'no',
    roles: [],
    noteKey: 'noOfficerOnline',
  },
  'aadhaar-mobile-update': {
    procedureId: 'aadhaar-mobile-update',
    level: 'no',
    roles: [],
    noteKey: 'noOfficerAadhaarKendra',
  },
  'cpgrams-grievance': {
    procedureId: 'cpgrams-grievance',
    level: 'no',
    roles: [],
    noteKey: 'noOfficerOnline',
  },
  'delhi-land-records': {
    procedureId: 'delhi-land-records',
    level: 'no',
    roles: [],
    noteKey: 'noOfficerOnline',
  },
  'up-bhulekh': {
    procedureId: 'up-bhulekh',
    level: 'no',
    roles: [],
    noteKey: 'noOfficerOnline',
  },
};

export function getTaskRequirement(procedureId: string): TaskOfficerRequirement | null {
  return TASK_OFFICER_REQUIREMENTS[procedureId] || null;
}

/**
 * Haversine great-circle distance in kilometers between two coordinates.
 */
export function calculateDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function buildDirectionsUrl(lat: number, lng: number, label?: string): string {
  const base = 'https://www.google.com/maps/dir/?api=1';
  const dest = `${lat},${lng}`;
  const params = new URLSearchParams({ destination: dest });
  if (label) {
    params.set('query', label);
  }
  return `${base}&${params.toString()}`;
}

export const DEFAULT_INDIA_CENTER = {
  lat: 28.6139,
  lng: 77.209,
  label: 'New Delhi, 110001',
};
