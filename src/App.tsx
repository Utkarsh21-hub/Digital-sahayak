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

export default function App() {
  const [viewMode, setViewMode] = useState<'chat' | 'dashboard'>('chat');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>('neet-ug-2025');
  const [isScamShieldOpen, setIsScamShieldOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [language, setLanguage] = useState<'hinglish' | 'hi' | 'en'>('hinglish');

  // Light / Dark mode state initialized from localStorage or system preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('digital-sahayak-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
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

  // Filtered procedures
  const filteredProcedures = useMemo(() => {
    return filterProcedures(PROCEDURES_DATA, searchQuery, categoryFilter);
  }, [searchQuery, categoryFilter]);

  // Current selected procedure
  const currentProcedure: Procedure = useMemo(() => {
    return (
      PROCEDURES_DATA.find((p) => p.id === selectedProcedureId) ||
      PROCEDURES_DATA[0]
    );
  }, [selectedProcedureId]);

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
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-secondary selection:text-on-secondary">
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
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-4 sm:py-6 flex flex-col">
          {/* Scam Shield (Kavach) Quick Emergency Alert Banner */}
          <div className="mb-3.5 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-red-600/10 via-rose-500/10 to-amber-500/10 border-2 border-red-300 dark:border-red-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/30 animate-pulse">
                <span className="material-symbols-outlined text-base">shield</span>
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-red-700 dark:text-red-400 uppercase tracking-wide">
                    Scam Shield (स्कैम कवच) Active:
                  </span>
                  <span className="bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    Phishing Alert
                  </span>
                </div>
                <p className="text-on-surface line-clamp-1 mt-0.5">
                  Received WhatsApp message claiming "Free PM Solar Yojana", "₹50,000 Mudra Loan", or "Electricity KYC Block"?
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsScamShieldOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shrink-0 shadow-md shadow-red-600/20 transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Scan WhatsApp Link</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Quick Safety & Grounding Banner */}
          <div className="mb-4 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-on-surface">Gemini 2.5 Flash Light Grounded Engine Active</span>
              <span className="text-on-surface-variant hidden md:inline">
                • Strict Grounding in 9 Government Portals • Temperature 0.2
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('dashboard')}
                className="text-secondary font-semibold hover:underline flex items-center gap-1"
              >
                <span>Switch to Interactive Step-by-Step Forms &amp; KB Resizer</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Gemini Chat Interface Component */}
          <div className="flex-1">
            <GeminiChatView
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
            />
          </div>
        </main>
      ) : (
        <>
          {/* Hero Trust Banner */}
          <HeroTrustBanner />

          {/* Search & Filter Bar */}
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            counts={categoryCounts}
          />

          {/* Quick Chat Callout in Dashboard */}
          <div className="max-w-7xl w-full mx-auto px-4 md:px-8 pt-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Digital Sahayak Gemini Chat</h4>
                  <p className="text-xs text-on-surface-variant">
                    Ask questions, verify file sizes, or decode error screenshots in conversational Hinglish, Hindi, or English.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsScamShieldOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow flex items-center gap-1.5 transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm animate-pulse">shield</span>
                  <span>Scam Shield (कवच)</span>
                </button>
                <button
                  onClick={() => setViewMode('chat')}
                  className="px-4 py-2 rounded-xl bg-secondary text-white text-xs font-bold shadow hover:bg-secondary/90 transition flex items-center gap-1.5"
                >
                  <span>Open Gemini Chat</span>
                  <span className="material-symbols-outlined text-sm">chat</span>
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
                  />
                </div>
              </section>

              {/* RIGHT COLUMN: UTILITY DRAWER & ESCALATION (lg:col-span-3) */}
              <section className="lg:col-span-3 flex flex-col gap-6">
                {/* Screen F: Client-Side KB Resizer */}
                <KbResizer initialPreset={resizerPreset} />

                {/* Screen D Trigger + Screen E Escalation Card */}
                <EscalationCard
                  procedure={currentProcedure}
                  currentStepIndex={currentStepIndex}
                  tempRef={tempRefId}
                  onOpenScreenshotModal={() => setIsScreenshotModalOpen(true)}
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
      />
    </div>
  );
}
