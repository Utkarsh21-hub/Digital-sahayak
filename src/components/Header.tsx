import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { getAppIcon } from '../utils/appIcons';
import {
  Language,
  SUPPORTED_LANGUAGES,
  UI_TRANSLATIONS,
  getLanguageMeta,
  t,
} from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
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
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const activeLangMeta = getLanguageMeta(language);
  const h = UI_TRANSLATIONS.header;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLangMenuOpen]);

  return (
    <header className="w-full bg-slate-50 dark:bg-slate-950">
      {/* =========================================================================
          SECTION 1: Top Navigation Bar (Clean & Minimal)
          ========================================================================= */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex justify-between items-center gap-2">
          {/* Left Side: Provided Official Logo */}
          <button
            type="button"
            className="flex items-center cursor-pointer select-none py-1 bg-transparent border-0 shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Digital Sahayak - Return to Top"
            aria-label="Digital Sahayak - Return to Top"
          >
            <img
              src={getAppIcon('logo-full', theme)}
              alt="Digital Sahayak"
              className="h-7 sm:h-9 w-auto object-contain"
            />
          </button>

          {/* Right Side: Regional Language Selector, Drafts, Theme & Help Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Regional Language Dropdown Selector (8 Indian Languages + Hinglish) */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangMenuOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isLangMenuOpen}
                aria-label={`${t(h.selectLanguage, language)}: ${activeLangMeta.nativeName}`}
                title={t(h.selectLanguage, language)}
                className="h-9 px-3 sm:px-3.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2 text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="font-bold whitespace-nowrap">{activeLangMeta.nativeName}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-150 ${
                    isLangMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLangMenuOpen && (
                <div
                  role="listbox"
                  aria-label={t(h.selectLanguage, language)}
                  className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-2 z-50"
                >
                  <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {t(h.selectLanguage, language)}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full">
                      {SUPPORTED_LANGUAGES.length}
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto py-1 px-1.5 space-y-0.5">
                    {SUPPORTED_LANGUAGES.map((item) => {
                      const isSelected = item.code === language;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            onLanguageChange(item.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2 transition-colors ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold leading-tight">
                              {item.nativeName}
                            </span>
                            {item.nativeName !== item.englishName && (
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                                {item.englishName}
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drafts Quick Button with Orange Count Badge */}
            <button
              type="button"
              onClick={onOpenDraftGenerator}
              aria-label={t(h.draftsBtn, language)}
              title={t(h.draftsBtn, language)}
              className="h-9 px-2.5 sm:px-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 sm:gap-2 active:scale-95 transition-all text-xs font-semibold shadow-xs"
            >
              <img
                src={getAppIcon('drafts', theme)}
                alt=""
                className="w-4 h-4 object-contain"
              />
              <span className="font-semibold hidden sm:inline">{t(h.draftsBtn, language)}</span>
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
              className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center active:scale-95 transition-all shadow-xs shrink-0"
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
              aria-label={t(h.helpBtn, language)}
              title={t(h.helpBtn, language)}
              className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center active:scale-95 transition-all shadow-xs shrink-0"
            >
              <img
                src={getAppIcon('help', theme)}
                alt=""
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
            {t(h.heroHeadline, language)}
          </h1>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t(h.zeroAgentFee, language)}</span>
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">
              {t(h.onlyGovPortals, language)}
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
                {t(h.chatTab, language)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t(h.chatTabSub, language)}
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
                {t(h.proceduresTab, language)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t(h.proceduresTabSub, language)}
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
                {t(h.scamShieldTab, language)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t(h.scamShieldTabSub, language)}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
