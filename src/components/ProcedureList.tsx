import React from 'react';
import { Procedure } from '../utils/procedures';

interface ProcedureListProps {
  procedures: Procedure[];
  selectedProcedureId: string;
  onSelectProcedure: (id: string) => void;
}

export const ProcedureList: React.FC<ProcedureListProps> = ({
  procedures,
  selectedProcedureId,
  onSelectProcedure,
}) => {
  return (
    <section className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
      {/* Column Header & Direct Savings Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-label-md font-label-md text-on-surface font-bold">Procedures &amp; Redressal</span>
          <span className="text-label-sm font-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
            {procedures.length} Verified
          </span>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-lg border border-outline-variant text-label-sm font-label-sm text-secondary">
          <span className="material-symbols-outlined text-lg" data-icon="account_balance_wallet">
            account_balance_wallet
          </span>
          <span>
            Average Direct Citizen Saving: <strong className="font-bold">₹850 per task</strong>
          </span>
        </div>
      </div>

      {/* Procedure Cards List */}
      <div className="flex flex-col gap-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
        {procedures.length === 0 ? (
          <div className="p-6 text-center text-on-surface-variant bg-surface-container-lowest rounded-xl border border-outline-variant">
            <span className="material-symbols-outlined text-3xl mb-2 text-outline" data-icon="search_off">
              search_off
            </span>
            <p className="text-body-md font-medium">Koi procedure nahi mila</p>
            <p className="text-caption mt-1">Try another search keyword or reset filters.</p>
          </div>
        ) : (
          procedures.map((proc) => {
            const isSelected = proc.id === selectedProcedureId;

            // Compute tag styling
            let tagClass = 'bg-surface-container text-on-surface-variant';
            if (proc.tagType === 'easy' || proc.tagType === 'free') {
              tagClass = 'bg-tertiary-fixed text-tertiary-container font-bold';
            } else if (proc.tagType === 'hard') {
              tagClass = 'bg-error-container/40 text-on-error-container font-bold border-error-container';
            }

            return (
              <article
                key={proc.id}
                onClick={() => onSelectProcedure(proc.id)}
                className={`bg-surface-container-lowest rounded-xl p-3.5 shadow-sm relative transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-secondary shadow-md ring-1 ring-secondary/20'
                    : 'border border-outline-variant hover:border-secondary group'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2.5 right-3 bg-secondary text-on-secondary px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    CURRENTLY GUIDING
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mt-1">
                  <div>
                    <span
                      className={`inline-block border border-outline-variant px-2 py-0.5 rounded-full text-label-sm font-label-sm mb-1 ${tagClass}`}
                    >
                      {proc.tag}
                    </span>
                    <h3
                      className={`text-body-strong font-body-strong ${
                        isSelected ? 'text-secondary font-bold' : 'text-on-surface group-hover:text-secondary'
                      }`}
                    >
                      {proc.title}
                    </h3>
                    <p className="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-xs text-on-tertiary-container" data-icon="link">
                        link
                      </span>
                      {proc.portal}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-outline-variant flex items-center justify-between text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">
                    {proc.saveSummary.startsWith('Fee') ? (
                      <>
                        Fee: <strong className="text-on-surface">{proc.officialFeeLabel}</strong>
                      </>
                    ) : (
                      <span className="text-on-tertiary-container font-bold">{proc.saveSummary}</span>
                    )}
                  </span>
                  <span
                    className={`font-medium px-2 py-0.5 rounded border border-outline-variant ${
                      isSelected
                        ? 'text-on-tertiary-container font-bold bg-surface-container-low'
                        : proc.tagType === 'free'
                        ? 'text-error'
                        : 'text-on-tertiary-container'
                    }`}
                  >
                    {proc.badge}
                  </span>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
