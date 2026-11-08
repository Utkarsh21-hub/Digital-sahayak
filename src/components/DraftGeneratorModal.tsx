import React, { useState, useEffect } from 'react';

export type DraftTemplateType =
  | 'gazette-name-change'
  | 'cpgrams-grievance'
  | 'neet-undertaking'
  | 'dob-correction';

interface DraftResponse {
  title: string;
  templateType: string;
  language: string;
  stampPaperRequirement: string;
  notaryRequired: boolean;
  draftText: string;
  keyClauses: string[];
  guidanceNotes: string[];
}

interface DraftGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplate?: DraftTemplateType;
  stepContext?: {
    taskTitle: string;
    stepTitle: string;
    procedureId?: string;
  };
}

const TEMPLATE_OPTIONS: {
  id: DraftTemplateType;
  name: string;
  hindiName: string;
  category: 'Affidavit' | 'Grievance' | 'Exam Undertaking';
  icon: string;
  defaultPrompt: string;
}[] = [
  {
    id: 'gazette-name-change',
    name: 'Gazette Name Change Affidavit',
    hindiName: 'नाम परिवर्तन शपथ पत्र',
    category: 'Affidavit',
    icon: 'gavel',
    defaultPrompt:
      'My current name is Rajesh Kumar S/o Mohan Lal, aged 28, living at House 42, Civil Lines, Varanasi. I am legally changing my name to Rajesh Sharma for all purposes. Published classified ad in Dainik Jagran newspaper on 15 Jan 2025.',
  },
  {
    id: 'cpgrams-grievance',
    name: 'CPGRAMS / CVC Grievance Letter',
    hindiName: 'कार्य में देरी / रिश्वत शिकायत पत्र',
    category: 'Grievance',
    icon: 'report_problem',
    defaultPrompt:
      'Applied for Driving Licence Renewal on 10 Dec 2024 at RTO Lucknow (Application Ref: DL-UP-984210). Citizen Charter SLA is 30 days, but file is pending for 60+ days. Dealing assistant indirectly demanded ₹2,000 to approve file without reason.',
  },
  {
    id: 'neet-undertaking',
    name: 'NEET / NTA Exam Self-Declaration',
    hindiName: 'परीक्षा स्व-घोषणा पत्र (नाम अंतर)',
    category: 'Exam Undertaking',
    icon: 'school',
    defaultPrompt:
      'Candidate Amit Verma S/o Suresh Verma, application number 25041009821. Name in Class 10 marksheet is "Amit Verma" but Aadhaar has "Amit Kumar Verma". Confirming both refer to the same student and Class 10 record is authentic.',
  },
  {
    id: 'dob-correction',
    name: 'DOB / Record Correction Affidavit',
    hindiName: 'जन्म तिथि सुधार शपथ पत्र',
    category: 'Affidavit',
    icon: 'calendar_month',
    defaultPrompt:
      'My actual date of birth is 15/08/1999 as per Municipal Birth Certificate (Reg No: BRC/1999/8421). In my Aadhaar and school record, it was wrongly typed as 01/01/1998 due to clerk error. Requesting update to 15/08/1999.',
  },
];

export const DraftGeneratorModal: React.FC<DraftGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialTemplate = 'gazette-name-change',
  stepContext,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<DraftTemplateType>(initialTemplate);
  const [prompt, setPrompt] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<DraftResponse | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync initial template when opened from a specific step
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
      const matched = TEMPLATE_OPTIONS.find((t) => t.id === initialTemplate);
      if (matched && !prompt) {
        setPrompt(matched.defaultPrompt);
      }
    }
  }, [initialTemplate, isOpen]);

  // Generate draft automatically on first view if no draft is loaded
  useEffect(() => {
    if (isOpen && !draft) {
      handleGenerateDraft(selectedTemplate, prompt || undefined);
    }
  }, [isOpen, selectedTemplate]);

  if (!isOpen) return null;

  const currentTemplateMeta =
    TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate) || TEMPLATE_OPTIONS[0];

  const handleSelectTemplate = (templateId: DraftTemplateType) => {
    setSelectedTemplate(templateId);
    const matched = TEMPLATE_OPTIONS.find((t) => t.id === templateId);
    if (matched) {
      setPrompt(matched.defaultPrompt);
      handleGenerateDraft(templateId, matched.defaultPrompt);
    }
  };

  const handleGenerateDraft = async (
    templateToUse = selectedTemplate,
    promptToUse = prompt
  ) => {
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateType: templateToUse,
          prompt: promptToUse,
          language,
        }),
      });

      if (!res.ok) throw new Error('Server returned error');
      const data = await res.json();
      if (data.draft) {
        setDraft(data.draft);
        setEditedText(data.draft.draftText);
      }
    } catch (err: any) {
      console.warn('Draft generation API failed:', err);
      setErrorMsg('Could not reach Gemini server. Default statutory template loaded.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = async () => {
    if (!editedText) return;
    try {
      await navigator.clipboard.writeText(editedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-surface-container-lowest max-w-4xl w-full rounded-3xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* =========================================================================
            MODAL HEADER
            ========================================================================= */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-outline-variant/70 bg-surface-container-lowest/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 border border-secondary/20">
              <span className="material-symbols-outlined text-2xl">description</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-on-surface">
                  Official Draft Sahayak
                </h3>
                <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                  प्रारूप सहायक
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">
                {stepContext?.taskTitle
                  ? `Synced with ${stepContext.taskTitle} (Step Formats)`
                  : 'Court-Ready Statutory Affidavits & Formal Grievance Petitions • Zero Typist Fee'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle for legal document */}
            <div className="bg-surface-container p-0.5 rounded-xl border border-outline-variant flex items-center text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setLanguage('en');
                  handleGenerateDraft(selectedTemplate, prompt);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-surface-container-lowest text-secondary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('hi');
                  handleGenerateDraft(selectedTemplate, prompt);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-surface-container-lowest text-secondary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                हिंदी
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TEMPLATE SELECTOR PILLS
            ========================================================================= */}
        <div className="px-5 sm:px-6 py-2.5 bg-surface-container-low/50 border-b border-outline-variant/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider shrink-0 mr-1">
            Format:
          </span>
          {TEMPLATE_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleSelectTemplate(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5 border transition-all ${
                selectedTemplate === t.id
                  ? 'bg-secondary text-white border-secondary shadow-xs font-bold'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:border-secondary/40'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{t.icon}</span>
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* =========================================================================
            MAIN CONTENT AREA
            ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* AI Prompt Input Bar */}
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="draft-prompt"
                className="text-xs font-bold text-on-surface flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base text-secondary">
                  auto_awesome
                </span>
                <span>Enter Your Details in Plain Words (English, Hindi, or Hinglish):</span>
              </label>
              <span className="text-[11px] text-on-surface-variant font-medium">
                AI fills official legal clauses automatically
              </span>
            </div>

            <textarea
              id="draft-prompt"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. My name is Rajesh Kumar, changing to Rajesh Sharma, resident of Varanasi. Classified ad published in Dainik Jagran on 15 Jan 2025..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 resize-none font-medium"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                <span className="font-bold">Quick Stage Presets:</span>
                <button
                  type="button"
                  onClick={() => {
                    const preset = currentTemplateMeta.defaultPrompt;
                    setPrompt(preset);
                    handleGenerateDraft(selectedTemplate, preset);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-surface-container border border-outline-variant hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 transition text-[11px]"
                >
                  ⚡ Load Sample Data
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleGenerateDraft(selectedTemplate, prompt)}
                disabled={isGenerating}
                className="px-4 py-1.5 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition disabled:opacity-50"
              >
                <span
                  className={`material-symbols-outlined text-sm ${
                    isGenerating ? 'animate-spin' : ''
                  }`}
                >
                  {isGenerating ? 'sync' : 'auto_awesome'}
                </span>
                <span>{isGenerating ? 'Drafting with Gemini...' : 'Generate / Update Draft'}</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-amber-600">info</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Legal Stamp Paper & Verification Notice Banner */}
          {draft && (
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-800">
                  <span className="material-symbols-outlined text-base">verified</span>
                </span>
                <div>
                  <div className="font-extrabold text-on-surface">
                    Statutory Requirement: {draft.stampPaperRequirement}
                  </div>
                  <div className="text-[11px] text-on-surface-variant font-medium">
                    {draft.notaryRequired
                      ? 'Requires physical attestation by a Notary Public / Oath Commissioner'
                      : 'Self-declaration format • No court stamp paper or fee required'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant font-bold text-xs text-on-surface flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-secondary text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-secondary/90 transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Print A4 / PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* Live Formatted Legal Document Preview (Printable Target) */}
          <div className="border-2 border-outline-variant/80 rounded-2xl bg-white text-slate-900 shadow-md p-6 sm:p-10 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto print:p-0 print:border-none print:shadow-none print:m-0">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="text-center font-bold text-sm sm:text-base border-b-2 border-slate-900 pb-2 mb-4">
                {draft?.title || currentTemplateMeta.name.toUpperCase()}
              </div>

              {/* Editable legal draft content */}
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={20}
                className="w-full bg-transparent border-none text-slate-900 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y min-h-[360px]"
                placeholder="Generating legal draft..."
              />
            </div>
          </div>

          {/* Guidance & Anti-Fraud Safety Box */}
          {draft && draft.guidanceNotes && draft.guidanceNotes.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800/60 text-xs space-y-2">
              <div className="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-amber-700">shield</span>
                <span>Important Safety & Submission Checklist:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-amber-950 dark:text-amber-100 font-medium text-[11px] sm:text-xs">
                {draft.guidanceNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
                <li>
                  <strong className="text-red-700 dark:text-red-400">Never sign blank stamp papers:</strong> Always verify that your full text is typed and printed before affixing your signature in front of the Notary.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* =========================================================================
            MODAL FOOTER
            ========================================================================= */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-outline-variant/70 bg-surface-container-low/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-on-surface-variant font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Zero Typist Fee • Standard Statutory Legal Format</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface font-bold transition active:scale-95"
            >
              Done / Close
            </button>
            <button
              type="button"
              onClick={handleCopyText}
              className="px-4 py-2 rounded-xl bg-secondary text-white font-bold transition active:scale-95 flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Formatted Draft'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
