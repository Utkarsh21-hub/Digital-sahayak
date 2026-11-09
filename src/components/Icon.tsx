import React from 'react';

export type IconName =
  | 'aadhaar-new'
  | 'aadhaar-update'
  | 'ai-chat'
  | 'anti-corruption'
  | 'attach'
  | 'camera'
  | 'caste'
  | 'check'
  | 'checklist'
  | 'domicile'
  | 'draft'
  | 'drafts'
  | 'driving-licence'
  | 'gazette'
  | 'grievance'
  | 'help'
  | 'land-records'
  | 'logo-full'
  | 'logo-mark'
  | 'mic'
  | 'moon'
  | 'neet'
  | 'next'
  | 'oci'
  | 'passport'
  | 'refresh'
  | 'resize'
  | 'send'
  | 'shield'
  | 'sun';

interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
  alt?: string;
}

export function Icon({ name, size = 20, className = '', alt = '' }: IconProps) {
  return (
    <span
      className={`ic ${className}`.trim()}
      style={{ ['--s' as any]: `${size}px` }}
      aria-hidden={!alt ? 'true' : undefined}
    >
      <img className="l" src={`/icons/light/${name}.png`} alt={alt} />
      <img className="d" src={`/icons/dark/${name}.png`} alt={alt} />
    </span>
  );
}

// Helper mapping for procedures
export function getProcedureIcon(procIdOrTag: string): IconName {
  const id = procIdOrTag.toLowerCase();
  if (id.includes('neet')) return 'neet';
  if (id.includes('driving') || id.includes('dl')) return 'driving-licence';
  if (id.includes('update') || id.includes('mobile')) return 'aadhaar-update';
  if (id.includes('gazette') || id.includes('name')) return 'gazette';
  if (id.includes('fresh') || id.includes('enrolment') || id.includes('aadhaar-new')) return 'aadhaar-new';
  if (id.includes('passport')) return 'passport';
  if (id.includes('grievance') || id.includes('cpgrams')) return 'grievance';
  if (id.includes('corruption') || id.includes('cvc') || id.includes('vigilance')) return 'anti-corruption';
  if (id.includes('oci') || id.includes('renunciation')) return 'oci';
  if (id.includes('land') || id.includes('bhulekh') || id.includes('ror') || id.includes('khatauni')) return 'land-records';
  if (id.includes('domicile') || id.includes('niwas')) return 'domicile';
  if (id.includes('caste') || id.includes('jati')) return 'caste';
  if (id.includes('scam') || id.includes('kavach') || id.includes('shield')) return 'shield';
  return 'checklist';
}
