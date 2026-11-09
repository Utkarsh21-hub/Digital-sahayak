import React from 'react';
import { getAppIcon } from '../utils/appIcons';

interface FooterProps {
  onOpenDirectory: () => void;
  onOpenHelp: () => void;
  onOpenResizer: () => void;
  onOpenScreenshotModal: () => void;
  onOpenChat: () => void;
  theme?: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDirectory,
  onOpenHelp,
  onOpenResizer,
  onOpenScreenshotModal,
  onOpenChat,
  theme = 'light',
}) => {
  return (
    <>
      {/* STATUTORY CLEAN FOOTER matching Screenshot */}
      <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 mt-12 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2025 Digital Sahayak. An open civic initiative. No middleman charges.
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:1947"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Official helpline 1947
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

      {/* Floating AI Chat Trigger on Desktop with provided ai-chat icon */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          onClick={onOpenChat}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5 font-bold transition-all active:scale-95 cursor-pointer ring-2 ring-white/50 text-xs"
          type="button"
          title="Open Digital Sahayak AI Assistant"
        >
          <img
            src={getAppIcon('ai-chat', 'dark')}
            alt=""
            className="w-5 h-5 object-contain brightness-0 invert"
          />
          <span>Ask Sahayak AI</span>
        </button>
      </div>

      {/* MOBILE BOTTOM NAVIGATION TRAY with provided icons */}
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
          <span className="text-[10px]">Services</span>
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
          <span className="text-[10px]">Resizer</span>
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
          <span className="text-[10px]">Sahayak</span>
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
          <span className="text-[10px]">AI Chat</span>
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
          <span className="text-[10px]">1947 Help</span>
        </a>
      </nav>
    </>
  );
};
