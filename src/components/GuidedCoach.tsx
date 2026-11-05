import React, { useState } from 'react';
import { Procedure, StepInfo } from '../utils/procedures';

interface GuidedCoachProps {
  procedure: Procedure;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onOpenScreenshotModal: () => void;
  language: 'hinglish' | 'hi' | 'en';
}

export const GuidedCoach: React.FC<GuidedCoachProps> = ({
  procedure,
  currentStepIndex,
  onStepChange,
  onOpenScreenshotModal,
  language,
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
      // Toggle visibility if already fetched
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
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 md:p-6 shadow-sm">
      {/* Stepper Header with Progress Bar */}
      <div className="space-y-2 pb-4 border-b border-outline-variant">
        <div className="flex items-center justify-between">
          <span className="text-label-md font-label-md text-secondary font-bold">
            Step {currentStep.stepNumber} of {currentStep.totalSteps}: {currentStep.title}
          </span>
          <span className="text-label-sm font-label-sm font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Quick Step Indicators */}
        <div className="flex items-center justify-between pt-1">
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
                    ? 'bg-secondary text-on-secondary shadow-sm ring-2 ring-secondary/30'
                    : idx < currentStepIndex
                    ? 'bg-tertiary-fixed text-tertiary-container'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title={`Jump to Step ${s.stepNumber}: ${s.title}`}
              >
                {idx < currentStepIndex ? '✓' : s.stepNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-2.5 py-1 text-label-sm font-semibold rounded-lg border border-outline-variant hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === totalSteps - 1}
              className="px-2.5 py-1 text-label-sm font-semibold rounded-lg border border-outline-variant hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Active Step Focus Card */}
      <div className="mt-5 bg-surface-container-low border-2 border-secondary/40 rounded-xl p-5">
        <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary font-bold mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          ACTIONABLE COACH INSTRUCTION
        </div>

        <p className="text-headline-md font-headline-md text-on-surface leading-snug">
          {currentStep.actionInstruction}
        </p>

        <p className="text-body-md font-body-md text-on-surface-variant mt-2.5">
          {currentStep.detailInstruction}
        </p>

        {/* Tough Terms (Asaan Matlab) Pill Section */}
        {currentStep.toughTerms && currentStep.toughTerms.length > 0 && (
          <div className="mt-4 pt-4 border-t border-outline-variant space-y-2">
            <span className="text-label-sm font-label-sm uppercase text-on-surface-variant font-bold block">
              Tough Terms (Asaan Matlab)
            </span>
            <div className="flex flex-wrap gap-2">
              {currentStep.toughTerms.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest border border-outline-variant px-3 py-1.5 rounded-lg text-caption font-caption"
                >
                  <strong className="text-on-surface font-semibold">{item.term}</strong> = {item.meaning}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Explanation Accordion/Box */}
      {isExplaining && (
        <div className="mt-4 p-4 rounded-xl bg-surface-container-low border border-secondary/30 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <span className="text-body-md text-secondary font-medium">
            Digital Sahayak AI step explanation generate kar raha hai...
          </span>
        </div>
      )}

      {explanationError && (
        <div className="mt-4 p-3 rounded-xl bg-error-container/40 border border-error text-error text-caption">
          {explanationError}
        </div>
      )}

      {explanationText && (
        <div className="mt-4 p-4 rounded-xl bg-surface-container border border-secondary/40 space-y-2 text-on-surface">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
            <span className="text-label-sm font-bold text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm" data-icon="auto_awesome">
                auto_awesome
              </span>
              Digital Sahayak — AI Step Guidance
            </span>
            <button
              onClick={() => setExplanationText(null)}
              className="text-caption text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <div className="text-body-md whitespace-pre-line leading-relaxed text-on-surface">
            {explanationText}
          </div>
        </div>
      )}

      {/* Step Action Controls (Primary, Explain, Camera) */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        {/* Primary Step Advance */}
        <button
          onClick={handleNextStep}
          className="w-full sm:flex-1 bg-on-tertiary-container hover:bg-opacity-90 text-on-primary font-body-strong font-semibold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-xl" data-icon="task_alt">
            task_alt
          </span>
          <span>
            {currentStepIndex === totalSteps - 1 ? 'Step Complete — All Steps Done! 🎉' : 'Step Complete — Next Step'}
          </span>
        </button>

        {/* Amber Explain in Hinglish */}
        <button
          onClick={handleExplainSimply}
          className="w-full sm:w-auto bg-surface-container-lowest border border-outline-variant hover:border-on-surface text-on-surface font-body-strong font-semibold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-secondary" data-icon="translate">
            translate
          </span>
          <span>Explain Simply ({language === 'hi' ? 'हिंदी' : language === 'en' ? 'English' : 'Hinglish'})</span>
        </button>

        {/* Camera Trigger for Screenshot Sahayak */}
        <button
          onClick={onOpenScreenshotModal}
          className="w-full sm:w-auto bg-surface-container hover:bg-surface-container-high text-on-surface font-body-strong font-semibold py-3 px-4 rounded-xl border border-outline-variant transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
          title="Upload Screenshot to Decode Portal Error"
          type="button"
        >
          <span className="material-symbols-outlined text-secondary" data-icon="photo_camera">
            photo_camera
          </span>
          <span>Screenshot Sahayak</span>
        </button>
      </div>
    </div>
  );
};
