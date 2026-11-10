import React, { useState, useMemo, useEffect } from 'react';
import {
  PROCEDURES_DATA,
  Procedure,
  filterProcedures,
} from './utils/procedures';
import { Header } from './components/Header';
import { HeroTrustBanner } from './components/HeroTrustBanner';
import { SearchFilterBar } from './components/SearchFilterBar';
import { ProcedureList } from './components/ProcedureList';
import { PreFlightChecklist } from './components/PreFlightChecklist';
import { GuidedCoach } from './components/GuidedCoach';
import { KbResizer } from './components/KbResizer';
import { EscalationCard } from './components/EscalationCard';
import { ScreenshotModal } from './components/ScreenshotModal';
import { ChatSahayakModal } from './components/ChatSahayakModal';
import { DirectoryModal } from './components/DirectoryModal';
import { HelpModal } from './components/HelpModal';
import { Footer } from './components/Footer';
import { GeminiChatView } from './components/GeminiChatView';
import { ScamShieldModal } from './components/ScamShieldModal';
import { DraftGeneratorModal, DraftTemplateType } from './components/DraftGeneratorModal';
import { getAppIcon } from './utils/appIcons';
import { getLocalizedProcedure } from './utils/translations';

export default function App() {
  const [viewMode, setViewMode] = useState<'chat' | 'dashboard'>('dashboard');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>('neet-ug-2025');
  const [isScamShieldOpen, setIsScamShieldOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [language, setLanguage] = useState<'hinglish' | 'hi' | 'en'>('hinglish');

  // Light / Dark mode state: default to 'light', load saved only if explicitly set
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('digital-sahayak-theme');
      if (saved === 'dark') return 'dark';
      if (saved === 'light') return 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('digital-sahayak-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Checklists and Step indices keyed by procedure id
  const [checklistMap, setChecklistMap] = useState<Record<string, Record<string, boolean>>>({
    'neet-ug-2025': {
      photo: true,
      signature: true,
      marksheet: false,
      mobile: false,
    },
  });

  const [stepIndexMap, setStepIndexMap] = useState<Record<string, number>>({
    'neet-ug-2025': 1, // Step 2 (0-indexed 1)
  });

  // Modal open states
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [draftModalTemplate, setDraftModalTemplate] = useState<DraftTemplateType>('gazette-name-change');
  const [resizerPreset, setResizerPreset] = useState<string>('');

  const handleOpenDraftModal = (templateId?: string) => {
    if (templateId) {
      setDraftModalTemplate(templateId as DraftTemplateType);
    }
    setIsDraftModalOpen(true);
  };

  // Counts for tabs
  const categoryCounts = useMemo(() => {
    return {
      all: PROCEDURES_DATA.length,
      easy: PROCEDURES_DATA.filter((p) => p.category === 'easy').length,
      medium: PROCEDURES_DATA.filter((p) => p.category === 'medium').length,
      hard: PROCEDURES_DATA.filter((p) => p.category === 'hard').length,
    };
  }, []);

  // Filtered procedures localized reactively
  const filteredProcedures = useMemo(() => {
    const raw = filterProcedures(PROCEDURES_DATA, searchQuery, categoryFilter);
    return raw.map((p) => getLocalizedProcedure(p, language));
  }, [searchQuery, categoryFilter, language]);

  // Current selected procedure localized reactively
  const currentProcedure: Procedure = useMemo(() => {
    const raw =
      PROCEDURES_DATA.find((p) => p.id === selectedProcedureId) ||
      PROCEDURES_DATA[0];
    return getLocalizedProcedure(raw, language);
  }, [selectedProcedureId, language]);

  const currentStepIndex = stepIndexMap[currentProcedure.id] ?? 0;
  const currentChecklist = checklistMap[currentProcedure.id] ?? {};

  const handleToggleChecklist = (itemId: string) => {
    setChecklistMap((prev) => {
      const existing = prev[currentProcedure.id] || {};
      const currentVal =
        existing[itemId] ??
        currentProcedure.checklist.find((c) => c.id === itemId)?.defaultChecked ??
        false;
      return {
        ...prev,
        [currentProcedure.id]: {
          ...existing,
          [itemId]: !currentVal,
        },
      };
    });
  };

  const handleStepChange = (newIndex: number) => {
    setStepIndexMap((prev) => ({
      ...prev,
      [currentProcedure.id]: newIndex,
    }));
  };

  const handleSelectProcedure = (id: string) => {
    setSelectedProcedureId(id);
  };

  const handleSelectProcedureByPortal = (keyword: string) => {
    const matched = PROCEDURES_DATA.find(
      (p) =>
        p.title.toLowerCase().includes(keyword.toLowerCase()) ||
        p.portal.toLowerCase().includes(keyword.toLowerCase())
    );
    if (matched) {
      handleSelectProcedure(matched.id);
    }
  };

  const handleOpenResizerForPreset = (label: string) => {
    setResizerPreset(label);
    const resizerEl = document.getElementById('resizer');
    if (resizerEl) {
      resizerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartWorkflow = () => {
    handleStepChange(0);
    const coachSection = document.getElementById('guided-coach-section');
    if (coachSection) {
      coachSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tempRefId = `${currentProcedure.tempRefPrefix}88492`;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Application Bar with View Mode Switcher & Dark Mode Toggle */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenDirectory={() => setIsDirectoryModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenResizer={() => {
          setViewMode('dashboard');
          setTimeout(() => {
            const el = document.getElementById('resizer');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenCpgrams={() => {
          setViewMode('dashboard');
          setTimeout(() => {
            const el = document.getElementById('cpgrams');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        currentView={viewMode}
        onViewChange={setViewMode}
        onOpenScamShield={() => setIsScamShieldOpen(true)}
        onOpenDraftGenerator={() => handleOpenDraftModal()}
      />

      {/* Main Content Area: Gemini Chat vs Procedural Dashboard */}
      {viewMode === 'chat' ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6 py-1.5 sm:py-2.5 flex flex-col">
          <GeminiChatView
            language={language}
            initialLanguage={language}
            onLanguageChange={setLanguage}
            onOpenResizer={() => {
              setViewMode('dashboard');
              setTimeout(() => {
                const el = document.getElementById('resizer');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onSelectProcedure={(procedureId) => {
              setSelectedProcedureId(procedureId);
            }}
            onOpenScamShield={() => setIsScamShieldOpen(true)}
            onOpenDraftGenerator={() => handleOpenDraftModal()}
            theme={theme}
          />
        </main>
      ) : (
        <>
          {/* Hero Trust Banner */}
          <HeroTrustBanner language={language} />

          {/* Search & Filter Bar */}
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            counts={categoryCounts}
            language={language}
            theme={theme}
          />

          {/* Quick Chat Callout in Dashboard */}
          <div className="max-w-7xl w-full mx-auto px-4 md:px-8 pt-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 p-2 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/40">
                  <img
                    src={getAppIcon('ai-chat', theme)}
                    alt="AI Chat"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === 'hi' ? 'डिजिटल सहायक जेमिनी चैट' : 'Digital Sahayak Gemini Chat'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {language === 'hi'
                      ? 'सवाल पूछें, फ़ाइल साइज़ चेक करें, या एरर स्क्रीनशॉट को सरल हिंदी में समझें।'
                      : language === 'en'
                      ? 'Ask questions, verify file sizes, or decode error screenshots in simple Hindi, Hinglish, or English.'
                      : 'Ask questions, verify file sizes, or decode error screenshots in conversational Hinglish, Hindi, or English.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setIsScamShieldOpen(true)}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <img
                    src={getAppIcon('shield', 'dark')}
                    alt="Scam Shield"
                    className="w-4 h-4 object-contain"
                  />
                  <span>{language === 'hi' ? 'स्कैम कवच' : 'Scam Shield (कवच)'}</span>
                </button>
                <button
                  onClick={() => setViewMode('chat')}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <img
                    src={getAppIcon('ai-chat', 'dark')}
                    alt="Chat"
                    className="w-4 h-4 object-contain"
                  />
                  <span>{language === 'hi' ? 'जेमिनी चैट खोलें' : 'Open Gemini Chat'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main 3-Column Desktop Split View Canvas */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: PROCEDURE DIRECTORY (lg:col-span-4 xl:col-span-3) */}
              <ProcedureList
                procedures={filteredProcedures}
                selectedProcedureId={currentProcedure.id}
                onSelectProcedure={handleSelectProcedure}
                language={language}
                theme={theme}
              />

              {/* CENTER COLUMN: MAIN WORKFLOW CANVAS (lg:col-span-5 xl:col-span-6) */}
              <section className="lg:col-span-5 xl:col-span-6 flex flex-col gap-6">
                {/* Screen B: Pre-Flight Readiness Box */}
                <PreFlightChecklist
                  procedure={currentProcedure}
                  checklistState={currentChecklist}
                  onToggleChecklist={handleToggleChecklist}
                  onOpenResizerForPreset={handleOpenResizerForPreset}
                  onStartWorkflow={handleStartWorkflow}
                  language={language}
                  theme={theme}
                />

                {/* Screen C: One-Step-At-A-Time Guided Coach */}
                <div id="guided-coach-section">
                  <GuidedCoach
                    procedure={currentProcedure}
                    currentStepIndex={currentStepIndex}
                    onStepChange={handleStepChange}
                    onOpenScreenshotModal={() => setIsScreenshotModalOpen(true)}
                    onOpenDraftGenerator={(tpl) => handleOpenDraftModal(tpl)}
                    language={language}
                    theme={theme}
                  />
                </div>
              </section>

              {/* RIGHT COLUMN: UTILITY DRAWER & ESCALATION (lg:col-span-3) */}
              <section className="lg:col-span-3 flex flex-col gap-6">
                {/* Screen F: Client-Side KB Resizer */}
                <KbResizer initialPreset={resizerPreset} language={language} theme={theme} />

                {/* Screen D Trigger + Screen E Escalation Card */}
                <EscalationCard
                  procedure={currentProcedure}
                  currentStepIndex={currentStepIndex}
                  tempRef={tempRefId}
                  onOpenScreenshotModal={() => setIsScreenshotModalOpen(true)}
                  language={language}
                  theme={theme}
                />
              </section>
            </div>
          </main>
        </>
      )}

      {/* Screenshot Sahayak Modal (Screen D) */}
      <ScreenshotModal
        isOpen={isScreenshotModalOpen}
        onClose={() => setIsScreenshotModalOpen(false)}
        onOpenResizer={() => {
          const el = document.getElementById('resizer');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        taskTitle={currentProcedure.title}
        language={language}
      />

      {/* AI Citizen Chat Sahayak Modal */}
      <ChatSahayakModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        currentTaskTitle={currentProcedure.title}
        language={language}
      />

      {/* Official Directory Modal */}
      <DirectoryModal
        isOpen={isDirectoryModalOpen}
        onClose={() => setIsDirectoryModalOpen(false)}
        onSelectProcedureByPortal={handleSelectProcedureByPortal}
      />

      {/* Help & Anti-Fraud Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onOpenChat={() => setIsChatModalOpen(true)}
      />

      {/* Scam Shield (Kavach) Phishing Link Modal */}
      <ScamShieldModal
        isOpen={isScamShieldOpen}
        onClose={() => setIsScamShieldOpen(false)}
        language={language}
      />

      {/* Official Legal Draft & Affidavit Generator Modal (Draft Sahayak) */}
      <DraftGeneratorModal
        isOpen={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        initialTemplate={draftModalTemplate}
        stepContext={{
          taskTitle: currentProcedure.title,
          stepTitle: currentProcedure.steps[currentStepIndex]?.title || '',
          procedureId: currentProcedure.id,
        }}
      />

      {/* Statutory Footer and Mobile Bottom Tray */}
      <Footer
        onOpenDirectory={() => setIsDirectoryModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenResizer={() => {
          const el = document.getElementById('resizer');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenScreenshotModal={() => setIsScreenshotModalOpen(true)}
        onOpenChat={() => setIsChatModalOpen(true)}
        language={language}
        theme={theme}
      />
    </div>
  );
}
