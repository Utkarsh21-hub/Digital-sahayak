import React from 'react';

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
  currentView = 'chat',
  onViewChange,
  onOpenScamShield,
  onOpenDraftGenerator,
}) => {
  return (
    <header className="w-full bg-surface-container-lowest border-b border-outline-variant shadow-xs">
      {/* =========================================================================
          SECTION 1: Top Navigation Bar (Clean & Minimal)
          ========================================================================= */}
      <div className="border-b border-outline-variant/60 bg-surface-container-lowest/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          {/* Left Side: Institution Emblem & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Digital Sahayak - Return to Top"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center flex-shrink-0 group-hover:border-secondary transition-colors shadow-2xs">
              <span
                className="material-symbols-outlined text-secondary text-2xl group-hover:scale-105 transition-transform"
                data-icon="account_balance"
              >
                account_balance
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-on-surface tracking-tight">
                Digital Sahayak
              </span>
              <span className="text-xs sm:text-sm font-semibold text-secondary">
                (डिजिटल सहायक)
              </span>
            </div>
          </div>

          {/* Right Side: Language Toggle Pill, Theme Mode Toggle & Help Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 3-Way Segmented Language Toggle Pill */}
            <div
              aria-label="Select Language"
              role="group"
              className="bg-surface-container p-1 rounded-xl border border-outline-variant flex items-center text-xs font-semibold"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('hinglish')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  language === 'hinglish'
                    ? 'bg-surface-container-lowest text-secondary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Hinglish (Conversational)"
              >
                Hinglish
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-surface-container-lowest text-secondary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Hindi (हिंदी)"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-surface-container-lowest text-secondary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="English"
              >
                English
              </button>
            </div>

            {/* Draft Generator Quick Button */}
            <button
              type="button"
              onClick={onOpenDraftGenerator}
              aria-label="Open Official Draft Generator"
              title="Generate Official Affidavits & Grievance Letters (प्रारूप सहायक)"
              className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface flex items-center gap-1.5 active:scale-95 transition-all text-xs font-bold shadow-2xs"
            >
              <span className="material-symbols-outlined text-lg text-secondary">
                description
              </span>
              <span className="hidden sm:inline">Drafts</span>
              <span className="text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.2 rounded font-black hidden md:inline">
                प्रारूप
              </span>
            </button>

            {/* Light / Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface-variant hover:text-on-surface active:scale-95 transition-all shadow-2xs group"
            >
              <span
                className={`material-symbols-outlined text-xl transition-transform duration-300 ${
                  theme === 'dark'
                    ? 'text-amber-400 group-hover:rotate-45'
                    : 'text-slate-600 group-hover:-rotate-12'
                }`}
              >
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Help & Assistance Icon Button */}
            <button
              type="button"
              onClick={onOpenHelp}
              aria-label="Help & Guidance"
              title="Help and Assistance"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface-variant hover:text-on-surface active:scale-95 transition-all shadow-2xs"
            >
              <span className="material-symbols-outlined text-xl" data-icon="help">
                help
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: Hero Banner / Sub-header (Trust & Context)
          ========================================================================= */}
      <section className="bg-gradient-to-b from-surface-container-low/50 via-surface-container-lowest to-surface-container-lowest border-b border-outline-variant/40 py-4 sm:py-5 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface tracking-tight">
            Official Government System Navigator for Indian Citizens
          </h2>

          <div className="mt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-2xs">
              <span
                className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <span>Zero Agent Fee Guarantee</span>
              <span className="text-emerald-600/70 dark:text-emerald-400/70 hidden sm:inline">
                • 100% Official .gov.in Portals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Main Action Bar (Feature Buttons)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Button 1: Gemini Chat */}
            <button
              type="button"
              onClick={() => onViewChange?.('chat')}
              className={`h-14 sm:h-16 px-4 rounded-2xl flex items-center justify-start gap-3 border-2 transition-all text-left active:scale-[0.99] ${
                currentView === 'chat'
                  ? 'bg-secondary text-white border-secondary shadow-md shadow-secondary/25'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:border-secondary/40 hover:bg-surface-container-low shadow-2xs'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  currentView === 'chat'
                    ? 'bg-white/20 text-white'
                    : 'bg-secondary/10 text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-extrabold truncate">
                  Gemini Chat
                </div>
                <div
                  className={`text-[11px] sm:text-xs truncate font-medium ${
                    currentView === 'chat' ? 'text-white/80' : 'text-on-surface-variant'
                  }`}
                >
                  AI Civic Co-Pilot
                </div>
              </div>
              {currentView === 'chat' && (
                <span className="material-symbols-outlined text-lg text-white/90 shrink-0">
                  check_circle
                </span>
              )}
            </button>

            {/* Button 2: Procedures & Tools */}
            <button
              type="button"
              onClick={() => onViewChange?.('dashboard')}
              className={`h-14 sm:h-16 px-4 rounded-2xl flex items-center justify-start gap-3 border-2 transition-all text-left active:scale-[0.99] ${
                currentView === 'dashboard'
                  ? 'bg-secondary text-white border-secondary shadow-md shadow-secondary/25'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:border-secondary/40 hover:bg-surface-container-low shadow-2xs'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  currentView === 'dashboard'
                    ? 'bg-white/20 text-white'
                    : 'bg-secondary/10 text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-xl">checklist</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-extrabold truncate">
                  Procedures &amp; Tools
                </div>
                <div
                  className={`text-[11px] sm:text-xs truncate font-medium ${
                    currentView === 'dashboard'
                      ? 'text-white/80'
                      : 'text-on-surface-variant'
                  }`}
                >
                  Checklists &amp; Resizer
                </div>
              </div>
              {currentView === 'dashboard' && (
                <span className="material-symbols-outlined text-lg text-white/90 shrink-0">
                  check_circle
                </span>
              )}
            </button>

            {/* Button 3: Scam Shield (Kavach) */}
            <button
              type="button"
              onClick={onOpenScamShield}
              className="h-14 sm:h-16 px-4 rounded-2xl flex items-center justify-start gap-3 border-2 border-red-500 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white shadow-md shadow-red-500/25 active:scale-[0.99] transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                  shield
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-sm sm:text-base font-extrabold">Scam Shield</span>
                  <span className="text-[10px] bg-white/25 px-1.5 py-0.2 rounded font-black tracking-wide">
                    कवच
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs text-red-100 truncate font-medium">
                  WhatsApp Phishing Alert
                </div>
              </div>
              <span className="material-symbols-outlined text-lg text-white/80 shrink-0 group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>
    </header>
  );
};
