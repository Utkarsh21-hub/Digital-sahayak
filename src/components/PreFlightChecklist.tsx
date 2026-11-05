import React from 'react';
import { Procedure } from '../utils/procedures';

interface PreFlightChecklistProps {
  procedure: Procedure;
  checklistState: Record<string, boolean>;
  onToggleChecklist: (itemId: string) => void;
  onOpenResizerForPreset: (presetName: string) => void;
  onStartWorkflow: () => void;
}

export const PreFlightChecklist: React.FC<PreFlightChecklistProps> = ({
  procedure,
  checklistState,
  onToggleChecklist,
  onOpenResizerForPreset,
  onStartWorkflow,
}) => {
  const readyCount = procedure.checklist.filter(
    (item) => checklistState[item.id] ?? item.defaultChecked
  ).length;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 md:p-6 shadow-sm">
      {/* Pre-flight Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant">
        <div>
          <span className="text-label-sm font-label-sm uppercase tracking-wider text-secondary font-bold">
            Step-by-Step Self-Help Workflow
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface mt-0.5">{procedure.title} Navigator</h2>
          <p className="text-caption font-caption text-on-surface-variant">{procedure.subtitle}</p>
        </div>

        {/* Launch Direct Official Portal Button */}
        <a
          className="inline-flex items-center justify-center gap-2 bg-on-tertiary-container hover:bg-opacity-95 text-on-primary font-body-strong font-semibold px-4 py-3 rounded-xl shadow-sm transition-all active:scale-[0.98] min-h-[48px]"
          href={procedure.portalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-lg" data-icon="open_in_new">
            open_in_new
          </span>
          <span>Open Portal ({procedure.portal})</span>
        </a>
      </div>

      {/* Fee Transparency Comparison Box */}
      <div className="mt-5 bg-surface-container-low border border-outline-variant rounded-xl p-4">
        <h4 className="text-label-md font-label-md text-on-surface font-bold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" data-icon="price_check">
            price_check
          </span>
          Fee Transparency Comparison (No Extra Kiosk Charges)
        </h4>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant">
            <span className="text-caption font-caption text-on-surface-variant block">Official Portal Fee</span>
            <span className="text-headline-sm font-headline-sm text-on-surface font-bold">
              {procedure.officialFeeLabel}
            </span>
            <span className="text-[11px] text-on-tertiary-container block font-medium">
              {procedure.officialFeeSubtext}
            </span>
          </div>

          <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant">
            <span className="text-caption font-caption text-on-surface-variant block">Cyber Cafe Charge</span>
            <span className="text-headline-sm font-headline-sm text-error font-bold line-through">
              {procedure.cyberCafeLabel}
            </span>
            <span className="text-[11px] text-error block font-medium">Extra Kiosk Margin</span>
          </div>

          <div className="bg-tertiary-fixed text-tertiary-container p-2.5 rounded-lg border border-outline-variant">
            <span className="text-caption font-caption text-tertiary-container/80 block">Your Direct Saving</span>
            <span className="text-headline-sm font-headline-sm font-extrabold text-tertiary-container">
              {procedure.savingsLabel}
            </span>
            <span className="text-[11px] font-bold block">100% Free Self-Service</span>
          </div>
        </div>
      </div>

      {/* Interactive Document Checklist */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-label-md font-label-md text-on-surface font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary" data-icon="checklist">
              checklist
            </span>
            Pre-Flight Document Checklist (Ready before opening portal)
          </h4>
          <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
            {readyCount} of {procedure.checklist.length} Ready
          </span>
        </div>

        <div className="space-y-2.5">
          {procedure.checklist.map((item) => {
            const isChecked = checklistState[item.id] ?? item.defaultChecked;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-secondary/40 transition-colors"
              >
                <label className="flex items-center gap-3 cursor-pointer min-h-[32px] flex-1 mr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleChecklist(item.id)}
                    className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary/20 cursor-pointer"
                  />
                  <div>
                    <span
                      className={`text-body-strong font-body-strong ${
                        isChecked ? 'text-on-surface' : 'text-on-surface-variant'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-caption font-caption text-on-tertiary-container block">
                      {item.note}
                    </span>
                  </div>
                </label>

                {item.canResize && (
                  <button
                    onClick={() => onOpenResizerForPreset(item.label)}
                    className="text-label-sm font-label-sm text-secondary bg-surface-container px-2.5 py-1.5 rounded-lg font-semibold hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer"
                    type="button"
                  >
                    [Resize Now]
                  </button>
                )}

                {item.tag && !item.canResize && (
                  <span className="text-caption font-caption text-on-surface-variant bg-surface-container px-2 py-1 rounded whitespace-nowrap">
                    {item.tag}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Middleman Alert / Fraud Warning Panel */}
      <div className="mt-5 bg-error-container/30 border-1.5 border-error-container rounded-xl p-4 text-on-surface flex items-start gap-3">
        <span
          className="material-symbols-outlined text-error text-2xl flex-shrink-0"
          data-icon="warning"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          warning
        </span>
        <div>
          <h5 className="text-body-strong font-body-strong text-error">Middleman &amp; Cyber Fraud Alert</h5>
          <p className="text-caption font-caption text-on-surface-variant mt-0.5">{procedure.fraudWarning}</p>
        </div>
      </div>

      {/* Readiness CTA Button */}
      <div className="mt-5">
        <button
          onClick={onStartWorkflow}
          className="w-full bg-secondary hover:bg-secondary-container text-on-secondary font-headline-sm font-semibold py-3.5 px-6 rounded-xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-xl" data-icon="check_circle">
            check_circle
          </span>
          <span>I Have These Ready — Start Step 1</span>
        </button>
      </div>
    </div>
  );
};
