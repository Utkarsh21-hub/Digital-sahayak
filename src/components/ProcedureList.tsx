import React from 'react';
import { Procedure } from '../utils/procedures';
import { getProcedureIcon } from '../utils/appIcons';
import { Language, UI_TRANSLATIONS } from '../utils/translations';

interface ProcedureListProps {
  procedures: Procedure[];
  selectedProcedureId: string;
  onSelectProcedure: (id: string) => void;
  language?: Language;
  theme?: 'light' | 'dark';
}

export const ProcedureList: React.FC<ProcedureListProps> = ({
  procedures,
  selectedProcedureId,
  onSelectProcedure,
  language = 'hinglish',
  theme = 'light',
}) => {
  return (
    <section className="lg:col-span-4 xl:col-span-3 flex flex-col gap-3.5">
      {/* Column Header & Direct Savings Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {language === 'hi' ? 'प्रक्रियाएं और निवारण' : 'Procedures & Redressal'}
          </span>
          <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">
            {procedures.length} {language === 'hi' ? 'सत्यापित' : 'verified'}
          </span>
        </div>
        <div className="bg-blue-50/70 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300 font-medium">
          {language === 'hi' ? 'नागरिक की सीधी बचत: ' : 'Average direct citizen saving: '}
          <strong className="font-bold text-blue-800 dark:text-blue-200">
            {language === 'hi' ? '₹850 प्रति कार्य' : '₹850 per task'}
          </strong>
        </div>
      </div>

      {/* Procedure Cards List */}
      <div className="flex flex-col gap-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
        {procedures.length === 0 ? (
          <div className="p-6 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-medium">
              {language === 'hi' ? 'कोई प्रक्रिया नहीं मिली' : 'Koi procedure nahi mila'}
            </p>
            <p className="text-xs mt-1 text-slate-400">
              {language === 'hi'
                ? 'कृपया अन्य कीवर्ड खोजें या फ़िल्टर बदलें।'
                : 'Try another search keyword or reset filters.'}
            </p>
          </div>
        ) : (
          procedures.map((proc) => {
            const isSelected = proc.id === selectedProcedureId;

            // Compute category pill style
            let tagClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
            if (proc.tagType === 'easy' || proc.tagType === 'free') {
              tagClass = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
            } else if (proc.tagType === 'medium') {
              tagClass = 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
            } else if (proc.tagType === 'hard') {
              tagClass = 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
            }

            return (
              <article
                key={proc.id}
                onClick={() => onSelectProcedure(proc.id)}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-3.5 relative transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-blue-600 dark:border-blue-500 shadow-sm'
                    : 'border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2.5 right-3 bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-xs uppercase">
                    {language === 'hi' ? 'वर्तमान मार्गदर्शन' : 'CURRENTLY GUIDING'}
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {/* Provided Procedure Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 p-1">
                    <img
                      src={getProcedureIcon(proc.id, theme)}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-block border px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1 ${tagClass}`}
                    >
                      {proc.tag}
                    </span>
                    <h3
                      className={`text-sm font-bold truncate ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                      title={proc.title}
                    >
                      {proc.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {proc.portal}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    {language === 'hi' ? 'शुल्क: ' : 'Fee: '}
                    <strong className="text-slate-900 dark:text-white font-bold">{proc.officialFeeLabel}</strong>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {language === 'hi' ? 'बचत ' : 'Save '}{proc.savingsLabel}
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
