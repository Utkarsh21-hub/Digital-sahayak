import React, { useState } from 'react';
import { Procedure, StepInfo } from '../utils/procedures';
import { getAppIcon } from '../utils/appIcons';

interface GuidedCoachProps {
  procedure: Procedure;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onOpenScreenshotModal: () => void;
  onOpenDraftGenerator?: (templateId?: string) => void;
  language: 'hinglish' | 'hi' | 'en';
  theme?: 'light' | 'dark';
}

export const GuidedCoach: React.FC<GuidedCoachProps> = ({
  procedure,
  currentStepIndex,
  onStepChange,
  onOpenScreenshotModal,
  onOpenDraftGenerator,
  language,
  theme = 'light',
}) => {
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanationText, setExplanationText] = useState<string | null>(null);
  const [explanationError, setExplanationError] = useState<string | null>(null);

  const steps = procedure.steps;
  const currentStep: StepInfo = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      onStepChange(currentStepIndex + 1);
      setExplanationText(null);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
      setExplanationText(null);
    }
  };

  const handleExplainSimply = async () => {
    if (explanationText) {
      setExplanationText(null);
      return;
    }

    setIsExplaining(true);
    setExplanationError(null);

    try {
      const response = await fetch('/api/explain-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskTitle: procedure.title,
          stepNumber: currentStep.stepNumber,
          stepTitle: currentStep.title,
          actionInstruction: currentStep.actionInstruction,
          detailInstruction: currentStep.detailInstruction,
          toughTerms: currentStep.toughTerms,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI step explanation');
      }

      const data = await response.json();
      setExplanationText(data.explanation || 'No explanation returned.');
    } catch (err: any) {
      console.error(err);
      setExplanationError(err?.message || 'Server error. Please try again.');
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
      {/* Stepper Header with Progress Bar matching Screenshot */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {language === 'hi'
              ? `चरण ${currentStep.stepNumber} / ${currentStep.totalSteps}`
              : `Step ${currentStep.stepNumber} of ${currentStep.totalSteps}`}
            : {currentStep.title}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {progressPercent}% {language === 'hi' ? 'पूर्ण' : 'complete'}
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stepper Indicators + Back/Next matching Screenshot */}
        <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {steps.map((s, idx) => (
              <button
                key={s.stepNumber}
                onClick={() => {
                  onStepChange(idx);
                  setExplanationText(null);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  idx === currentStepIndex
                    ? 'bg-blue-600 text-white shadow-xs'
                    : idx < currentStepIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title={`Jump to Step ${s.stepNumber}: ${s.title}`}
              >
                {idx < currentStepIndex ? '✓' : s.stepNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
            >
              ← {language === 'hi' ? 'पीछे' : 'Back'}
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === totalSteps - 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
            >
              {language === 'hi' ? 'आगे' : 'Next'} →
            </button>
          </div>
        </div>
      </div>

      {/* Active Step Focus Card matching Screenshot */}
      <div className="mt-5 bg-blue-50/30 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/50 rounded-2xl p-5">
        <span className="text-[10px] font-extrabold tracking-wider text-blue-600 dark:text-blue-400 uppercase block">
          {language === 'hi' ? 'मार्गदर्शन निर्देश' : 'COACH INSTRUCTION'}
        </span>

        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
          {currentStep.actionInstruction}
        </p>

        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          {currentStep.detailInstruction}
        </p>

        {/* Tough Terms (Aasaan Matlab) Section matching Screenshot */}
        {currentStep.toughTerms && currentStep.toughTerms.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-blue-100 dark:border-blue-900/40 space-y-2">
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide block">
              {language === 'hi'
                ? '💡 कठिन शब्द (सरल अर्थ)'
                : language === 'en'
                ? '💡 TOUGH TERMS (SIMPLE MEANINGS)'
                : '💡 TOUGH TERMS (AASAAN MATLAB)'}
            </span>
            <div className="flex flex-wrap gap-2">
              {currentStep.toughTerms.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs"
                >
                  <strong className="text-slate-900 dark:text-white font-semibold">{item.term}</strong> = {item.meaning}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-Synced Draft Generator Trigger matching Screenshot */}
        {currentStep.draftTemplateId && (
          <div className="mt-4 pt-3.5 border-t border-blue-100 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center shrink-0">
                <img
                  src={getAppIcon('draft', theme)}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {currentStep.draftButtonLabel || 'Generate name / spelling undertaking'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {language === 'hi'
                    ? 'तैयार कानूनी/पोर्टल प्रारूप • निःशुल्क जेमिनी ऑटो-फिल'
                    : 'Ready court/portal template • free Gemini auto-fill'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenDraftGenerator?.(currentStep.draftTemplateId)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition shrink-0 cursor-pointer"
            >
              <span>{language === 'hi' ? 'ड्राफ्ट सहायक खोलें' : 'Open Draft Sahayak'}</span>
            </button>
          </div>
        )}
      </div>

      {/* AI Explanation Accordion/Box */}
      {isExplaining && (
        <div className="mt-4 p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
            {language === 'hi'
              ? 'डिजिटल सहायक एआई सरल व्याख्या तैयार कर रहा है...'
              : 'Digital Sahayak AI step explanation generate kar raha hai...'}
          </span>
        </div>
      )}

      {explanationError && (
        <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 text-xs">
          {explanationError}
        </div>
      )}

      {explanationText && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-slate-900 dark:text-white">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700 text-xs">
            <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <img
                src={getAppIcon('ai-chat', theme)}
                alt=""
                className="w-3.5 h-3.5 object-contain"
              />
              {language === 'hi' ? 'डिजिटल सहायक — एआई चरण मार्गदर्शन' : 'Digital Sahayak — AI Step Guidance'}
            </span>
            <button
              onClick={() => setExplanationText(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕ {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
          <div className="text-xs whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">
            {explanationText}
          </div>
        </div>
      )}

      {/* Step Action Controls */}
      <div className="mt-5 flex flex-col sm:flex-row items-center gap-2.5">
        <button
          onClick={handleNextStep}
          disabled={currentStepIndex === totalSteps - 1}
          className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          type="button"
        >
          <span>{language === 'hi' ? 'चरण पूरा हुआ! अगला चरण' : 'Complete & Next Step'}</span>
          <img
            src={getAppIcon('next', 'dark')}
            alt=""
            className="w-3.5 h-3.5 object-contain brightness-0 invert"
          />
        </button>

        <button
          onClick={handleExplainSimply}
          className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          type="button"
        >
          <img
            src={getAppIcon('ai-chat', theme)}
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
          <span>
            {explanationText
              ? language === 'hi'
                ? 'व्याख्या छिपाएं'
                : 'Hide explanation'
              : language === 'hi'
              ? 'एआई से सरल समझें'
              : 'AI explain simply'}
          </span>
        </button>

        <button
          onClick={onOpenScreenshotModal}
          className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          type="button"
        >
          <img
            src={getAppIcon('camera', theme)}
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
          <span>{language === 'hi' ? 'स्क्रीन स्कैन करें' : 'Scan screen'}</span>
        </button>
      </div>
    </div>
  );
};
