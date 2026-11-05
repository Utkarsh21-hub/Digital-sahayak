import React from 'react';

interface HeaderProps {
  language: 'hinglish' | 'hi' | 'en';
  onLanguageChange: (lang: 'hinglish' | 'hi' | 'en') => void;
  onOpenDirectory: () => void;
  onOpenHelp: () => void;
  onOpenResizer: () => void;
  onOpenCpgrams: () => void;
  currentView?: 'chat' | 'dashboard';
  onViewChange?: (view: 'chat' | 'dashboard') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenDirectory,
  onOpenHelp,
  onOpenResizer,
  onOpenCpgrams,
  currentView = 'chat',
  onViewChange,
}) => {
  return (
    <header className="bg-surface-container-lowest text-secondary text-headline-md font-headline-md docked full-width top-0 sticky z-40 border-b border-outline-variant shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
        {/* Left: Emblem & Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant flex-shrink-0 cursor-pointer hover:border-secondary transition-colors"
            title="National Civic Emblem Ashoka Stambh Seal"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="material-symbols-outlined text-secondary text-2xl" data-icon="account_balance">
              account_balance
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-headline-md font-headline-md font-bold text-on-surface">Digital Sahayak</span>
              <span className="text-caption font-caption text-on-surface-variant font-medium hidden sm:inline">
                (डिजिटल सहायक)
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 bg-surface-container-lowest text-on-tertiary-container border border-outline-variant px-2 py-0.5 rounded-full text-label-sm font-label-sm">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="verified_user"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                Zero Agent Fee Guarantee
              </span>
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant line-clamp-1">
              Official Government System Navigator for Indian Citizens
            </span>
          </div>
        </div>

        {/* Center: View Switcher (Gemini Chat vs Procedures) */}
        <div className="flex items-center bg-surface-container p-1 rounded-xl border border-outline-variant text-label-sm">
          <button
            onClick={() => onViewChange?.('chat')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
              currentView === 'chat'
                ? 'bg-secondary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            title="Switch to Gemini AI Chat Interface"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>Gemini Chat</span>
          </button>
          <button
            onClick={() => onViewChange?.('dashboard')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
              currentView === 'dashboard'
                ? 'bg-secondary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            title="Switch to Procedural Checklists and KB Resizer"
          >
            <span className="material-symbols-outlined text-base">checklist</span>
            <span>Procedures &amp; Tools</span>
          </button>
        </div>

        {/* Center-Right Quick Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={onOpenDirectory}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Official Directory
          </button>
          <button
            onClick={onOpenResizer}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            KB Resizer
          </button>
          <button
            onClick={onOpenCpgrams}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            CPGRAMS Portal
          </button>
        </nav>

        {/* Right: Language Segmented Pill & Safety Icon */}
        <div className="flex items-center gap-3">
          {/* 3-Way Language Switcher */}
          <div
            aria-label="Select Language"
            className="bg-surface-container p-0.5 rounded-xl border border-outline-variant flex items-center text-label-sm font-label-sm"
            role="group"
          >
            <button
              onClick={() => onLanguageChange('hinglish')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                language === 'hinglish'
                  ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Hinglish
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                language === 'hi'
                  ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                language === 'en'
                  ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              English
            </button>
          </div>

          {/* Official Safety Verification Badge */}
          <div
            className="hidden xl:flex items-center gap-1.5 bg-surface-container-low border border-outline-variant px-2.5 py-1.5 rounded-xl text-on-tertiary-container"
            title="System Security Status"
          >
            <span
              className="material-symbols-outlined text-base"
              data-icon="security"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
            <span className="text-label-sm font-label-sm font-semibold">.gov.in &amp; .nic.in Only</span>
          </div>

          <button
            onClick={onOpenHelp}
            aria-label="Help and Assistance"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container transition-colors duration-150 text-on-surface-variant hover:text-on-surface active:scale-[0.98]"
            type="button"
          >
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
