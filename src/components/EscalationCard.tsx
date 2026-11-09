import React, { useState } from 'react';
import { Procedure, generateWhatsAppSummary } from '../utils/procedures';
import { getAppIcon } from '../utils/appIcons';

interface EscalationCardProps {
  procedure: Procedure;
  currentStepIndex: number;
  tempRef: string;
  onOpenScreenshotModal: () => void;
  theme?: 'light' | 'dark';
}

export const EscalationCard: React.FC<EscalationCardProps> = ({
  procedure,
  currentStepIndex,
  tempRef,
  onOpenScreenshotModal,
  theme = 'light',
}) => {
  const [copied, setCopied] = useState(false);

  const currentStep = procedure.steps[currentStepIndex] || procedure.steps[0];
  const remainingSteps = Math.max(0, procedure.steps.length - (currentStepIndex + 1));

  const handleWhatsAppShare = () => {
    const summaryText = generateWhatsAppSummary(procedure, currentStepIndex, tempRef);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    const encoded = encodeURIComponent(summaryText);
    const waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* SCREENSHOT SAHAYAK CARD matching Screenshot */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={getAppIcon('camera', theme)}
              alt=""
              className="w-5 h-5 object-contain"
            />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Screenshot Sahayak
            </h3>
          </div>
          <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/40">
            AI decoder
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Sarkari portal par ajeeb error aaya? Screenshot daalein, hum Hinglish mein samjhayenge.
        </p>
        <button
          className="mt-3.5 w-full border-2 border-dashed border-blue-400/60 dark:border-blue-600/50 bg-blue-50/20 dark:bg-blue-950/20 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 py-2.5 px-3 rounded-xl text-center text-xs font-semibold text-blue-600 dark:text-blue-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
          onClick={onOpenScreenshotModal}
          type="button"
        >
          <span>Upload error screen to analyse</span>
        </button>
      </div>

      {/* DIRECT ESCALATION & HELP CARD matching Screenshot */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3.5" id="cpgrams">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <img
              src={getAppIcon('help', theme)}
              alt=""
              className="w-5 h-5 object-contain"
            />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Direct escalation &amp; help
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Official channels, no middlemen
          </p>
        </div>

        {/* Helpline & Grievance Links matching Screenshot */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">Call portal helpline</span>
            <a
              href={`tel:${procedure.helpline}`}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {procedure.helpline}
            </a>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-600 dark:text-slate-400">CPGRAMS central grievance</span>
            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              pgportal.gov.in ↗
            </a>
          </div>
        </div>

        {/* Your Application Card matching Screenshot */}
        <div className="bg-slate-50/70 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Your application card
            </span>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-bold">
              In progress
            </span>
          </div>

          <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Task</span>
              <span className="font-bold text-slate-900 dark:text-white truncate ml-2 max-w-[160px]" title={procedure.title}>
                {procedure.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Temp ref</span>
              <span className="font-mono text-slate-900 dark:text-white font-semibold">{tempRef}</span>
            </div>
            <div className="flex justify-between">
              <span>Current</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold truncate ml-2 max-w-[160px]">
                Step {currentStep.stepNumber} ({currentStep.title.slice(0, 16)}...)
              </span>
            </div>
            <div className="flex justify-between">
              <span>Remaining</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {remainingSteps} steps to final submit
              </span>
            </div>
          </div>

          <button
            onClick={handleWhatsAppShare}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            <span>{copied ? '✓ Copied to clipboard!' : 'Copy / share on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
