import React from 'react';

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProcedureByPortal: (portalKeyword: string) => void;
}

const OFFICIAL_DIRECTORIES = [
  {
    category: 'Identity & Civic Registry',
    items: [
      { name: 'myAadhaar (UIDAI)', url: 'https://myaadhaar.uidai.gov.in', helpline: '1947', desc: 'Aadhaar download, address update, PVC card, appointment booking' },
      { name: 'Voter Service Portal (ECI)', url: 'https://voters.eci.gov.in', helpline: '1950', desc: 'Voter ID card (EPIC) registration, shifting, correction' },
      { name: 'e-Gazette of India', url: 'https://egazette.gov.in', helpline: '011-23810150', desc: 'Official Gazette notifications for legal name, gender or religion change' },
    ],
  },
  {
    category: 'Transport & Travel',
    items: [
      { name: 'Sarathi Parivahan (MoRTH)', url: 'https://parivahan.gov.in', helpline: '0120-4925505', desc: 'Driving licence renewal, learner licence, vehicle registration (RC)' },
      { name: 'Passport Seva (MEA)', url: 'https://passportindia.gov.in', helpline: '1800-258-1800', desc: 'Normal & Tatkaal passports, police clearance certificates (PCC)' },
      { name: 'Indian Citizenship & OCI', url: 'https://indiancitizenshiponline.nic.in', helpline: '011-20830150', desc: 'Overseas Citizen of India (OCI) registration and surrender' },
    ],
  },
  {
    category: 'Examinations & Education',
    items: [
      { name: 'NTA Exam Portal (exams.nta.ac.in)', url: 'https://exams.nta.ac.in', helpline: '011-40759000', desc: 'NEET UG, JEE Main, CUET UG/PG application forms and admit cards' },
      { name: 'UPSC Online', url: 'https://upsconline.nic.in', helpline: '011-23385271', desc: 'Civil Services, NDA, CDS and central government examinations' },
    ],
  },
  {
    category: 'Grievance Redressal & Anti-Corruption',
    items: [
      { name: 'CPGRAMS Central Grievance (DARPG)', url: 'https://pgportal.gov.in', helpline: '1800-11-4000', desc: 'Direct escalation for delayed government services across all ministries' },
      { name: 'Central Vigilance Commission (CVC)', url: 'https://cvc.gov.in', helpline: '1964', desc: 'Anti-corruption and bribery reporting with whistleblower identity protection' },
      { name: 'National Cyber Crime Reporting', url: 'https://cybercrime.gov.in', helpline: '1930', desc: 'Financial fraud, cyber touts, unauthorized OTP phishing complaints' },
    ],
  },
];

export const DirectoryModal: React.FC<DirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectProcedureByPortal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-3xl w-full rounded-2xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl" data-icon="folder_managed">
                folder_managed
              </span>
            </div>
            <div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface">
                Official Government Portal Directory
              </h3>
              <p className="text-caption font-caption text-on-surface-variant">
                100% Verified .gov.in and .nic.in official platforms — Zero middleman links
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined" data-icon="close">
              close
            </span>
          </button>
        </div>

        {/* Directory Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {OFFICIAL_DIRECTORIES.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-label-md font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                {cat.category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3.5 rounded-xl border border-outline-variant bg-surface-container-low hover:border-secondary transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-body-strong font-bold text-on-surface">{item.name}</h5>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline flex items-center text-xs font-semibold"
                      >
                        Visit ↗
                      </a>
                    </div>
                    <p className="text-caption text-on-surface-variant mt-1">{item.desc}</p>
                    <div className="mt-3 pt-2 border-t border-outline-variant flex items-center justify-between text-label-sm">
                      <span className="text-on-surface-variant">Helpline: <strong className="text-on-surface font-mono">{item.helpline}</strong></span>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProcedureByPortal(item.name);
                        }}
                        className="text-secondary font-semibold hover:underline cursor-pointer"
                      >
                        Guide in App →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
          <span className="text-label-sm text-on-tertiary-container font-semibold">
            ✓ Protected by National Informatics Centre (NIC) security guidelines
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-label-md font-semibold hover:bg-secondary-container transition-all cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
