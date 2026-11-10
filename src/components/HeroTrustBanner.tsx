import React, { useState, useEffect } from 'react';
import { Language, UI_TRANSLATIONS } from '../utils/translations';

interface HeroTrustBannerProps {
  language?: Language;
}

export const HeroTrustBanner: React.FC<HeroTrustBannerProps> = ({ language = 'hinglish' }) => {
  const [savingsTotal, setSavingsTotal] = useState(428950);

  useEffect(() => {
    // Live increment every 25s simulating savings
    const interval = setInterval(() => {
      setSavingsTotal((prev) => prev + Math.floor(Math.random() * 3 + 1) * 50);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const formattedSavings = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(savingsTotal);

  const t = UI_TRANSLATIONS.hero;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* High-Trust Indicators */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>
              {language === 'hi'
                ? '100% आधिकारिक पोर्टल्स'
                : '100% official portals'}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
            <span className="text-slate-500 font-bold">✓</span>
            <span>{t.toutFree[language]}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-medium">
            <span className="text-rose-600 font-bold">🛡️</span>
            <span>
              {language === 'hi'
                ? 'ओटीपी कभी किसी को न दें'
                : language === 'en'
                ? 'Never share your OTP'
                : 'Never share your OTP'}
            </span>
          </div>
        </div>

        {/* Quick Savings Metric */}
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <span>
            {language === 'hi' ? (
              <>
                नागरिकों ने आज बचाए:{' '}
                <strong className="text-slate-900 dark:text-white font-bold">
                  ₹{formattedSavings}
                </strong>{' '}
                दलाल शुल्कों में
              </>
            ) : language === 'en' ? (
              <>
                Citizens saved today:{' '}
                <strong className="text-slate-900 dark:text-white font-bold">
                  ₹{formattedSavings}
                </strong>{' '}
                in middleman fees
              </>
            ) : (
              <>
                Citizens saved today:{' '}
                <strong className="text-slate-900 dark:text-white font-bold">
                  ₹{formattedSavings}
                </strong>{' '}
                in middleman fees
              </>
            )}
          </span>
        </div>
      </div>
    </section>
  );
};
