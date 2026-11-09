import React from 'react';
import { getAppIcon } from '../utils/appIcons';

interface HeaderProps {
  language: 'hinglish' | 'hi' | 'en';
  onLanguageChange: (lang: 'hinglish' | 'hi' | 'en') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenDirectory?: () => void;
  onOpenHelp: () => void;
  onOpenResizer?: () => void;
  onOpenCpgrams?: () => void;
  currentView?: 'chat' | 'dashboard';
  onViewChange?: (view: 'chat' | 'dashboard') => void;
  onOpenPitchDeck?: () => void;
  onOpenScamShield?: () => void;
  onOpenDraftGenerator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  theme = 'light',
  onToggleTheme,
  onOpenHelp,
  currentView = 'dashboard',
  onViewChange,
  onOpenScamShield,
  onOpenDraftGenerator,
}) => {
  return (
    <header className="w-full bg-slate-50 dark:bg-slate-950">
      {/* =========================================================================
          SECTION 1: Top Navigation Bar (Clean & Minimal)
          ========================================================================= */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          {/* Left Side: Provided Official Logo */}
          <div
            className="flex items-center cursor-pointer select-none py-1"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Digital Sahayak - Return to Top"
          >
            <img
              src={getAppIcon('logo-full', theme)}
              alt="Digital Sahayak"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          {/* Right Side: Language Toggle Pill, Drafts, Theme & Help Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 3-Way Segmented Language Toggle Pill */}
            <div
              aria-label="Select Language"
              role="group"
              className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 flex items-center text-xs font-semibold"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('hinglish')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                  language === 'hinglish'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Hinglish (Conversational)"
              >
                Hinglish
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                  language === 'hi'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Hindi (हिंदी)"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="English"
              >
                English
              </button>
            </div>

            {/* Drafts Quick Button with Orange Count Badge */}
            <button
              type="button"
              onClick={onOpenDraftGenerator}
              aria-label="Open Official Draft Generator"
              title="Generate Official Affidavits & Grievance Letters"
              className="h-9 px-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2 active:scale-95 transition-all text-xs font-semibold shadow-xs"
            >
              <img
                src={getAppIcon('drafts', theme)}
                alt=""
                className="w-4 h-4 object-contain"
              />
              <span className="font-semibold">Drafts</span>
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
            </button>

            {/* Light / Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center active:scale-95 transition-all shadow-xs"
            >
              <img
                src={theme === 'dark' ? getAppIcon('sun', theme) : getAppIcon('moon', theme)}
                alt="Theme Toggle"
                className="w-4 h-4 object-contain"
              />
            </button>

            {/* Help & Assistance Icon Button */}
            <button
              type="button"
              onClick={onOpenHelp}
              aria-label="Help & Guidance"
              title="Help and Assistance"
              className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center active:scale-95 transition-all shadow-xs"
            >
              <img
                src={getAppIcon('help', theme)}
                alt="Help"
                className="w-4 h-4 object-contain"
              />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: Hero Headline & Trust Badges Row
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Official Government System Navigator for Indian Citizens
          </h1>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Zero agent fee</span>
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">
              Only official .gov.in portals
            </span>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: Main 3 Feature Cards (Gemini Chat, Procedures & Tools, Scam Shield)
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          {/* Card 1: Gemini Chat */}
          <button
            type="button"
            onClick={() => onViewChange?.('chat')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
              currentView === 'chat'
                ? 'border-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0">
              <img
                src={getAppIcon('ai-chat', theme)}
                alt=""
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Gemini Chat
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                AI civic co-pilot
              </div>
            </div>
          </button>

          {/* Card 2: Procedures & Tools */}
          <button
            type="button"
            onClick={() => onViewChange?.('dashboard')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
              currentView === 'dashboard'
                ? 'border-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0">
              <img
                src={getAppIcon('checklist', theme)}
                alt=""
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Procedures &amp; Tools
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Checklists and KB resizer
              </div>
            </div>
          </button>

          {/* Card 3: Scam Shield */}
          <button
            type="button"
            onClick={onOpenScamShield}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-left transition-all flex items-center gap-3.5 shadow-xs"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0">
              <img
                src={getAppIcon('shield', theme)}
                alt=""
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Scam Shield
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Check WhatsApp links
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
