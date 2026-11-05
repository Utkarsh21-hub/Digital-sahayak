import React, { useState, useEffect } from 'react';

export const HeroTrustBanner: React.FC = () => {
  const [savingsTotal, setSavingsTotal] = useState(428950);

  useEffect(() => {
    // Gentle live increment every 25 seconds simulating other citizens completing forms
    const interval = setInterval(() => {
      setSavingsTotal((prev) => prev + Math.floor(Math.random() * 3 + 1) * 50);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const formattedSavings = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(savingsTotal);

  return (
    <section className="bg-surface-container-lowest border-b border-outline-variant py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* High-Trust Indicators */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-label-md font-label-md">
          <div className="flex items-center gap-1.5 text-on-tertiary-container bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant">
            <span
              className="material-symbols-outlined text-base text-on-tertiary-container"
              data-icon="verified"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-bold">100% Official Portals</span>
          </div>

          <div className="flex items-center gap-1.5 text-secondary bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-base text-secondary" data-icon="savings">
              savings
            </span>
            <span>Zero Cyber Cafe Commission</span>
          </div>

          <div className="flex items-center gap-1.5 text-error bg-error-container/40 px-3 py-1.5 rounded-full border border-error-container">
            <span className="material-symbols-outlined text-base text-error" data-icon="lock_reset">
              lock_reset
            </span>
            <span className="font-bold">Never Share Your OTP</span>
          </div>
        </div>

        {/* Quick Savings Metric */}
        <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span>
            Citizens Saved Today: <strong className="text-on-surface font-bold">₹{formattedSavings}</strong> in middleman fees
          </span>
        </div>
      </div>
    </section>
  );
};
