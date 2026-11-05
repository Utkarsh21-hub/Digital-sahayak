import React, { useState } from 'react';
import { Procedure, generateWhatsAppSummary } from '../utils/procedures';

interface EscalationCardProps {
  procedure: Procedure;
  currentStepIndex: number;
  tempRef: string;
  onOpenScreenshotModal: () => void;
}

export const EscalationCard: React.FC<EscalationCardProps> = ({
  procedure,
  currentStepIndex,
  tempRef,
  onOpenScreenshotModal,
}) => {
  const [copied, setCopied] = useState(false);

  const currentStep = procedure.steps[currentStepIndex] || procedure.steps[0];
  const remainingSteps = Math.max(0, procedure.steps.length - (currentStepIndex + 1));

  const handleWhatsAppShare = () => {
    const summaryText = generateWhatsAppSummary(procedure, currentStepIndex, tempRef);

    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    // Also open WhatsApp if user chooses
    const encoded = encodeURIComponent(summaryText);
    const waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <>
      {/* SCREEN D PREVIEW / TRIGGER: SCREENSHOT SAHAYAK */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-body-strong font-body-strong text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary" data-icon="document_scanner">
              document_scanner
            </span>
            Screenshot Sahayak
          </h3>
          <span className="bg-surface-container text-secondary text-label-sm font-label-sm px-2 py-0.5 rounded-full font-bold">
            AI Decoder
          </span>
        </div>
        <p className="text-caption font-caption text-on-surface-variant">
          Stuck on a strange government portal error? Drag your screenshot here to decode in plain Hinglish.
        </p>
        <button
          className="mt-3 w-full border-2 border-dashed border-secondary/50 bg-surface-container-low hover:bg-surface-container py-3 px-3 rounded-xl text-center text-label-sm font-label-sm text-secondary font-bold transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
          onClick={onOpenScreenshotModal}
          type="button"
        >
          <span className="material-symbols-outlined" data-icon="add_photo_alternate">
            add_photo_alternate
          </span>
          <span>Upload Error Screen to Analyze</span>
        </button>
      </div>

      {/* SCREEN E: ESCALATION & OFFICIAL HELPLINE + WHATSAPP SUMMARY */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm space-y-4" id="cpgrams">
        <div className="border-b border-outline-variant pb-3">
          <h3 className="text-body-strong font-body-strong text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary" data-icon="support_agent">
              support_agent
            </span>
            Direct Escalation &amp; Help
          </h3>
          <p className="text-caption font-caption text-on-surface-variant">
            Official redressal channels without intermediaries
          </p>
        </div>

        {/* Click to Call & Grievance Actions */}
        <div className="space-y-2">
          <a
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant text-label-sm font-label-sm font-bold text-on-surface transition-colors min-h-[44px]"
            href={`tel:${procedure.helpline}`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" data-icon="call">
                call
              </span>
              <span>Call Portal Helpline</span>
            </span>
            <span className="bg-surface-container-lowest border border-outline-variant px-2 py-0.5 rounded text-secondary font-mono">
              {procedure.helpline}
            </span>
          </a>

          <a
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant text-label-sm font-label-sm font-bold text-on-surface transition-colors min-h-[44px]"
            href="https://pgportal.gov.in"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" data-icon="gavel">
                gavel
              </span>
              <span>CPGRAMS Central Grievance</span>
            </span>
            <span className="text-caption font-caption text-on-tertiary-container font-semibold">
              pgportal.gov.in ↗
            </span>
          </a>
        </div>

        {/* WhatsApp Progress / Citizen Record Summary Card */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-label-sm font-label-sm text-on-surface font-bold">Your Application Card</span>
            <span className="text-[11px] bg-tertiary-fixed text-tertiary-container px-2 py-0.5 rounded font-bold">
              In-Progress
            </span>
          </div>

          <div className="text-caption font-caption space-y-1 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Task:</span>
              <span className="font-bold text-on-surface truncate ml-2 max-w-[170px]" title={procedure.title}>
                {procedure.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Temp Ref:</span>
              <span className="font-mono text-on-surface font-semibold">{tempRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Current:</span>
              <span className="text-secondary font-semibold">
                Step {currentStep.stepNumber} ({currentStep.title.slice(0, 15)}...)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Remaining:</span>
              <span className="text-on-surface">{remainingSteps} steps to final submit</span>
            </div>
          </div>

          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full bg-on-tertiary-container hover:bg-opacity-90 text-on-primary text-label-sm font-label-sm font-semibold py-2.5 px-3 rounded-lg shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-lg" data-icon="share">
              share
            </span>
            <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy / Share on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </>
  );
};
