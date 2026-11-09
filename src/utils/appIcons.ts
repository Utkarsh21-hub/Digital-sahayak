export type AppIconName =
  | 'logo-full'
  | 'logo-mark'
  | 'ai-chat'
  | 'checklist'
  | 'shield'
  | 'drafts'
  | 'draft'
  | 'moon'
  | 'sun'
  | 'help'
  | 'mic'
  | 'camera'
  | 'resize'
  | 'check'
  | 'next'
  | 'refresh'
  | 'send'
  | 'attach'
  | 'neet'
  | 'driving-licence'
  | 'aadhaar-update'
  | 'gazette'
  | 'aadhaar-new'
  | 'passport'
  | 'grievance'
  | 'anti-corruption'
  | 'oci'
  | 'land-records'
  | 'domicile'
  | 'caste';

export function getAppIcon(name: AppIconName, theme: 'light' | 'dark' = 'light'): string {
  const folder = theme === 'dark' ? '/icons/dark' : '/icons/light';
  return `${folder}/${name}.png`;
}

export function getProcedureIcon(procedureId: string, theme: 'light' | 'dark' = 'light'): string {
  const folder = theme === 'dark' ? '/icons/dark' : '/icons/light';
  switch (procedureId) {
    case 'neet-ug-2025':
      return `${folder}/neet.png`;
    case 'driving-licence-renewal':
      return `${folder}/driving-licence.png`;
    case 'aadhaar-mobile-update':
      return `${folder}/aadhaar-update.png`;
    case 'gazette-name-change':
      return `${folder}/gazette.png`;
    case 'fresh-aadhaar-enrolment':
      return `${folder}/aadhaar-new.png`;
    case 'tatkaal-passport':
      return `${folder}/passport.png`;
    case 'cpgrams-grievance':
      return `${folder}/grievance.png`;
    case 'delayed-service-redressal':
      return `${folder}/anti-corruption.png`;
    case 'renunciation-citizenship':
      return `${folder}/oci.png`;
    case 'delhi-land-records':
    case 'up-bhulekh':
      return `${folder}/land-records.png`;
    case 'delhi-domicile':
    case 'up-domicile':
      return `${folder}/domicile.png`;
    case 'delhi-caste':
    case 'up-caste':
      return `${folder}/caste.png`;
    default:
      return `${folder}/checklist.png`;
  }
}
