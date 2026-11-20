import React, { useState } from 'react';
import { Procedure, generateWhatsAppSummary } from '../utils/procedures';
import { getAppIcon } from '../utils/appIcons';
import { Language, UI_TRANSLATIONS, t } from '../utils/translations';

interface EscalationCardProps {
  procedure: Procedure;
  currentStepIndex: number;
  tempRef: string;
  onOpenScreenshotModal: () => void;
  language?: Language;
  theme?: 'light' | 'dark';
}

export const EscalationCard: React.FC<EscalationCardProps> = ({
  procedure,
  currentStepIndex,
  tempRef,
  onOpenScreenshotModal,
  language = 'hinglish',
  theme = 'light',
}) => {
  const [copied, setCopied] = useState(false);
  const esc = UI_TRANSLATIONS.escalation;

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
      {/* SCREENSHOT SAHAYAK CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2">
            <img
              src={getAppIcon('camera', theme)}
              alt=""
              className="w-5 h-5 object-contain"
            />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t(esc.screenshotTitle, language)}
            </h3>
          </div>
          <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/40 shrink-0">
            {t(esc.aiDecoder, language)}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {t(esc.screenshotDesc, language)}
        </p>
        <button
          className="mt-3.5 w-full border-2 border-dashed border-blue-400/60 dark:border-blue-600/50 bg-blue-50/20 dark:bg-blue-950/20 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 py-2.5 px-3 rounded-xl text-center text-xs font-semibold text-blue-600 dark:text-blue-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
          onClick={onOpenScreenshotModal}
          type="button"
        >
          <span>{t(esc.uploadErrorBtn, language)}</span>
        </button>
      </div>

      {/* DIRECT ESCALATION & HELP CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3.5" id="cpgrams">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <img
              src={getAppIcon('help', theme)}
              alt=""
              className="w-5 h-5 object-contain"
            />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t(esc.directHelpTitle, language)}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t(esc.directHelpSub, language)}
          </p>
        </div>

        {/* Helpline & Grievance Links */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60 gap-2">
            <span className="text-slate-600 dark:text-slate-400">
              {t(esc.callHelpline, language)}
            </span>
            <a
              href={`tel:${procedure.helpline}`}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline shrink-0"
            >
              {procedure.helpline}
            </a>
          </div>

          <div className="flex items-center justify-between py-1 gap-2">
            <span className="text-slate-600 dark:text-slate-400">
              {t(esc.cpgramsLabel, language)}
            </span>
            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline shrink-0"
            >
              pgportal.gov.in ↗
            </a>
          </div>
        </div>

        {/* Your Application Card */}
        <div className="bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {t(esc.appCardTitle, language)}
            </span>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-bold shrink-0">
              {t(esc.inProgress, language)}
            </span>
          </div>

          <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>{t(esc.task, language)}</span>
              <span className="font-bold text-slate-900 dark:text-white truncate ml-2 max-w-[160px]" title={procedure.title}>
                {procedure.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t(esc.tempRef, language)}</span>
              <span className="font-mono text-slate-900 dark:text-white font-semibold">{tempRef}</span>
            </div>
            <div className="flex justify-between">
              <span>{t(esc.current, language)}</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold truncate ml-2 max-w-[160px]">
                {t(UI_TRANSLATIONS.coach.step, language)}{' '}
                {currentStep.stepNumber} ({currentStep.title.slice(0, 16)}...)
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t(esc.remaining, language)}</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {remainingSteps} {t(esc.stepsToSubmit, language)}
              </span>
            </div>
          </div>

          <button
            onClick={handleWhatsAppShare}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            <span>
              {copied ? t(esc.copiedClipboard, language) : t(esc.shareWhatsApp, language)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
