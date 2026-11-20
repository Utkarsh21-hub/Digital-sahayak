import React from 'react';
import { Language, UI_TRANSLATIONS, t } from '../utils/translations';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
  language?: Language;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onOpenChat,
  language = 'hinglish',
}) => {
  if (!isOpen) return null;

  const h = UI_TRANSLATIONS.helpModal;

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
              <h3 className="text-headline-sm font-headline-sm text-on-surface">
                {t(h.title, language)}
              </h3>
              <p className="text-caption font-caption text-on-surface-variant">
                {t(h.subtitle, language)}
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
              {t(h.q1Title, language)}
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              {t(h.q1Body, language)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-error-container/30 border border-error-container">
            <h4 className="font-bold text-body-strong text-error flex items-center gap-2">
              <span className="material-symbols-outlined text-base" data-icon="lock">
                lock
              </span>
              {t(h.q2Title, language)}
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              {t(h.q2Body, language)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant">
            <h4 className="font-bold text-body-strong text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-base" data-icon="crop">
                crop
              </span>
              {t(h.q3Title, language)}
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              {t(h.q3Body, language)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant">
            <h4 className="font-bold text-body-strong text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-base" data-icon="gavel">
                gavel
              </span>
              {t(h.q4Title, language)}
            </h4>
            <p className="text-caption text-on-surface-variant mt-1.5 leading-relaxed">
              {t(h.q4Body, language)}
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
            <span>{t(h.askAiBtn, language)}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-label-md font-semibold hover:bg-secondary-container transition-all cursor-pointer"
          >
            {t(h.gotItBtn, language)}
          </button>
        </div>
      </div>
    </div>
  );
};
