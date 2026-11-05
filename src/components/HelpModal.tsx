import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, onOpenChat }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl" data-icon="help_center">
                help_center
              </span>
            </div>
            <div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Digital Sahayak Help &amp; FAQs</h3>
              <p className="text-caption font-caption text-on-surface-variant">
                Your rights as an Indian citizen on government portals
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-on-surface">
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant">
            <h4 className="font-bold text-body-strong text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-base" data-icon="shield">
                shield
              </span>
              1. Zero Agent Fee Guarantee kya hai?
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              Bharat sarkar ke sabhi official portals (.gov.in / .nic.in) aam nagrik ke direct use ke liye design kiye gaye hain. Cyber cafe touts aur middlemen form bharne ka ₹300 se ₹5,000 tak commission lete hain. Digital Sahayak aapko har step khud complete karne me guide karta hai jisse aapka ek bhi rupya faaltu kharch na ho.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-error-container/30 border border-error-container">
            <h4 className="font-bold text-body-strong text-error flex items-center gap-2">
              <span className="material-symbols-outlined text-base" data-icon="lock">
                lock
              </span>
              2. OTP aur Password Safety Rules
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              Kabhi bhi kisi bhi anjaan vyakti, cyber cafe shopkeeper ya WhatsApp group ke saath apna OTP share na karein. NTA, UIDAI ya koi bhi sarkari portal phone par OTP ya UPI payment nahi maangta.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant">
            <h4 className="font-bold text-body-strong text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-base" data-icon="crop">
                crop
              </span>
              3. Photo ya Signature upload reject kyun hota hai?
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              Sarkari servers par file size limit hoti hai (jaise NEET me 10–200 KB). Phone ka camera 3 MB se 8 MB tak ki photo leta hai. Aap hamare built-in "KB Resizer" tool me photo daal kar 2 second me required size me download kar sakte hain.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant">
            <h4 className="font-bold text-body-strong text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-base" data-icon="gavel">
                gavel
              </span>
              4. Sarkari officer agar bina wajah delay kare ya rishwat maange?
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              Aap CPGRAMS (pgportal.gov.in) par direct central complaint darj kar sakte hain. Nodal officers ko 21-30 dino ke andar action report deni hoti hai. Rishwat ki shikayat CVC (helpline 1964) par identity secret rakh kar ki ja sakti hai.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenChat();
            }}
            className="text-secondary font-bold text-label-md hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base" data-icon="chat">
              chat
            </span>
            <span>Ask AI Assistant Directly</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-label-md font-semibold hover:bg-secondary-container transition-all cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
