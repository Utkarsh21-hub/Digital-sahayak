import React from 'react';
import { Procedure } from '../utils/procedures';
import { getAppIcon } from '../utils/appIcons';
import { Language, UI_TRANSLATIONS } from '../utils/translations';

interface PreFlightChecklistProps {
  procedure: Procedure;
  checklistState: Record<string, boolean>;
  onToggleChecklist: (itemId: string) => void;
  onOpenResizerForPreset: (presetName: string) => void;
  onStartWorkflow: () => void;
  language?: Language;
  theme?: 'light' | 'dark';
}

export const PreFlightChecklist: React.FC<PreFlightChecklistProps> = ({
  procedure,
  checklistState,
  onToggleChecklist,
  onOpenResizerForPreset,
  onStartWorkflow,
  language = 'hinglish',
  theme = 'light',
}) => {
  const readyCount = procedure.checklist.filter(
    (item) => checklistState[item.id] ?? item.defaultChecked
  ).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
      {/* Pre-flight Header matching Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            {language === 'hi' ? 'चरण-दर-चरण स्व-सहायता वर्कफ़्लो' : 'STEP-BY-STEP SELF-HELP WORKFLOW'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {procedure.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {procedure.subtitle}
          </p>
        </div>

        {/* Launch Direct Official Portal Button (Green Solid Button) */}
        <a
          className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
          href={procedure.portalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{language === 'hi' ? 'पोर्टल खोलें' : 'Open portal'}</span>
          <span className="font-semibold underline">{procedure.portal}</span>
        </a>
      </div>

      {/* Fee Transparency Box matching Screenshot */}
      <div className="mt-5 bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <img
              src={getAppIcon('check', theme)}
              alt=""
              className="w-4 h-4 object-contain"
            />
            <span>{UI_TRANSLATIONS.checklist.feeTransparency[language] || 'Fee transparency'}</span>
          </div>
          <span className="text-slate-400 dark:text-slate-500">
            {UI_TRANSLATIONS.checklist.noExtraCharges[language] || 'no extra kiosk charges'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
              {UI_TRANSLATIONS.checklist.officialPortalFee[language] || 'Official portal fee'}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white block mt-0.5">
              {procedure.officialFeeLabel}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
              {procedure.officialFeeSubtext}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
              {UI_TRANSLATIONS.checklist.cyberCafeCharge[language] || 'Cyber cafe charge'}
            </span>
            <span className="text-base sm:text-lg font-bold text-rose-600 line-through block mt-0.5">
              {procedure.cyberCafeLabel}
            </span>
            <span className="text-[10px] text-rose-500 block mt-0.5">
              {UI_TRANSLATIONS.checklist.extraKioskMargin[language] || 'Extra kiosk margin'}
            </span>
          </div>

          <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60">
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block font-medium">
              {UI_TRANSLATIONS.checklist.directSaving[language] || 'Your direct saving'}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-emerald-700 dark:text-emerald-400 block mt-0.5">
              {procedure.savingsLabel}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-semibold block mt-0.5">
              {UI_TRANSLATIONS.checklist.freeSelfService[language] || '100% free self-service'}
            </span>
          </div>
        </div>
      </div>

      {/* Pre-Flight Document Checklist */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold">
            <img
              src={getAppIcon('checklist', theme)}
              alt=""
              className="w-4 h-4 object-contain"
            />
            <span>{UI_TRANSLATIONS.checklist.preflightTitle[language] || 'Pre-flight document checklist'}</span>
          </div>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {readyCount} {language === 'hi' ? 'में से' : 'of'} {procedure.checklist.length} {language === 'hi' ? 'तैयार' : 'ready'}
          </span>
        </div>

        <div className="space-y-2">
          {procedure.checklist.map((item) => {
            const isChecked = checklistState[item.id] ?? item.defaultChecked;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <label className="flex items-center gap-3 cursor-pointer flex-1 mr-2 select-none">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleChecklist(item.id)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <span
                      className={`text-xs font-bold ${
                        isChecked
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      {item.note}
                    </span>
                  </div>
                </label>

                {item.canResize && (
                  <button
                    onClick={() => onOpenResizerForPreset(item.label)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 flex items-center gap-1 shrink-0 cursor-pointer"
                    type="button"
                  >
                    <span>{language === 'hi' ? 'साइज़ बदलें' : 'Resize now'}</span>
                  </button>
                )}

                {item.tag && !item.canResize && (
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md shrink-0">
                    {item.tag}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Middleman & Cyber Fraud Alert Box matching Screenshot */}
      <div className="mt-5 bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-xl p-3.5 flex items-start gap-3">
        <img
          src={getAppIcon('shield', theme)}
          alt=""
          className="w-5 h-5 object-contain shrink-0 mt-0.5"
        />
        <div>
          <h5 className="text-xs font-bold text-rose-700 dark:text-rose-400">
            {UI_TRANSLATIONS.checklist.middlemanAlert[language] || 'Middleman & cyber fraud alert'}
          </h5>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
            {procedure.fraudWarning}
          </p>
        </div>
      </div>

      {/* Big Blue Readiness CTA Button matching Screenshot */}
      <div className="mt-5">
        <button
          onClick={onStartWorkflow}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          type="button"
        >
          <img
            src={getAppIcon('check', 'dark')}
            alt=""
            className="w-4 h-4 object-contain brightness-0 invert"
          />
          <span>{language === 'hi' ? 'ये दस्तावेज़ तैयार हैं: चरण 1 शुरू करें' : 'I have these ready: start step 1'}</span>
        </button>
      </div>
    </div>
  );
};
