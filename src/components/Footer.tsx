import React from 'react';
import { getAppIcon } from '../utils/appIcons';
import { Language, UI_TRANSLATIONS, t } from '../utils/translations';

interface FooterProps {
  onOpenDirectory: () => void;
  onOpenHelp: () => void;
  onOpenResizer: () => void;
  onOpenScreenshotModal: () => void;
  onOpenChat: () => void;
  language?: Language;
  theme?: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDirectory,
  onOpenHelp,
  onOpenResizer,
  onOpenScreenshotModal,
  onOpenChat,
  language = 'hinglish',
  theme = 'light',
}) => {
  const f = UI_TRANSLATIONS.footer;

  return (
    <>
      {/* STATUTORY CLEAN FOOTER */}
      <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 mt-12 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>{t(f.copyright, language)}</div>

          <div className="flex items-center gap-3">
            <a
              href="tel:1947"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {t(f.helpline1947, language)}
            </a>
            <span>•</span>
            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              CPGRAMS (pgportal.gov.in)
            </a>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION TRAY */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400 font-bold cursor-pointer"
          onClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
        >
          <img
            src={getAppIcon('checklist', theme)}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <span className="text-[10px]">{t(f.mobileServices, language)}</span>
        </button>

        <button
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 cursor-pointer"
          onClick={onOpenResizer}
        >
          <img
            src={getAppIcon('resize', theme)}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <span className="text-[10px]">{t(f.mobileResizer, language)}</span>
        </button>

        <button
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 cursor-pointer"
          onClick={onOpenScreenshotModal}
          type="button"
        >
          <img
            src={getAppIcon('camera', theme)}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <span className="text-[10px]">{t(f.mobileSahayak, language)}</span>
        </button>

        <button
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 cursor-pointer"
          onClick={onOpenChat}
          type="button"
        >
          <img
            src={getAppIcon('ai-chat', theme)}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <span className="text-[10px]">{t(f.mobileAiChat, language)}</span>
        </button>

        <a
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 cursor-pointer"
          href="tel:1947"
        >
          <img
            src={getAppIcon('help', theme)}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <span className="text-[10px]">{t(f.mobileHelp1947, language)}</span>
        </a>
      </nav>
    </>
  );
};
