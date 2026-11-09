import React from 'react';
import { Icon } from './Icon';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="dialog"
      id="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="card" role="dialog" aria-modal="true" aria-labelledby="dlgT">
        <div className="flex items-center gap-2">
          <Icon name="help" size={24} />
          <h2 id="dlgT" className="text-lg font-bold">
            How Digital Sahayak works
          </h2>
        </div>
        <ol className="my-2 space-y-2 text-sm text-[var(--muted)] pl-5 list-decimal">
          <li>
            <strong className="text-[var(--ink)]">Apna kaam choose karein ya sawal poochhein:</strong> 15 verified central aur state schemes me se chunein ya conversational AI se poochhein.
          </li>
          <li>
            <strong className="text-[var(--ink)]">Official .gov.in steps ek-ek karke follow karein:</strong> Guided Coach bina kisi tout ya agent ke step-by-step batata hai.
          </li>
          <li>
            <strong className="text-[var(--ink)]">Documents, photo size aur fees pehle se check karein:</strong> In-browser KB Resizer se photo 10-200 KB mein compress karein.
          </li>
          <li>
            <strong className="text-[var(--ink)]">Zero agent fee guarantee:</strong> Kisi cyber cafe ko ₹300–₹3,000 na dein. Sirf official portal par direct pay karein.
          </li>
        </ol>
        <button
          type="button"
          className="btn mt-2"
          id="dlgClose"
          onClick={onClose}
        >
          Got it
        </button>
      </div>
    </div>
  );
};
