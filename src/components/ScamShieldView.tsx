import React, { useState } from 'react';
import { Icon } from './Icon';

interface ScamShieldViewProps {
  language?: 'hinglish' | 'hi' | 'en';
}

interface AnalysisResult {
  isSafe: boolean;
  verdict: 'SAFE' | 'SCAM' | 'SUSPICIOUS';
  detectedDomain: string;
  impersonatedAgency?: string;
  officialPortalUrl?: string;
  officialPortalName?: string;
  redFlags?: string[];
  explanation: string;
  actionAdvice?: string;
  riskScore: number;
}

const PRESET_LINKS = [
  { label: 'PM Solar Yojana (Scam)', url: 'pm-solar-yojana-free.in/apply' },
  { label: 'Electricity KYC Block (Scam)', url: 'bit.ly/bijli-kyc-update' },
  { label: 'PM Mudra Loan (Scam)', url: 'www.pm-mudra-loan-apply.in' },
  { label: 'Official NEET Portal (Safe)', url: 'https://neet.nta.nic.in' },
  { label: 'Official Parivahan (Safe)', url: 'https://parivahan.gov.in' },
];

export const ScamShieldView: React.FC<ScamShieldViewProps> = ({ language = 'hinglish' }) => {
  const [inputUrl, setInputUrl] = useState('pm-solar-yojana-free.in/apply');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleCheck = async (urlToCheck?: string) => {
    const rawVal = (urlToCheck ?? inputUrl).trim();
    if (!rawVal) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/scam-shield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: rawVal, language }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
        // Play voice warning if malicious and speech synthesis is available
        if (!data.isSafe && typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const warningText =
            language === 'hi'
              ? 'सावधान! यह एक फर्जी और खतरनाक लिंक है। सरकार व्हाट्सएप पर पैसे कभी नहीं मांगती। इस लिंक पर क्लिक न करें।'
              : 'Dhyan dein! Yeh ek fake link hai. Bharat sarkar kabhi bhi WhatsApp par personal details ya fees nahi maangti. Is link par bilkul click na karein.';
          const utter = new SpeechSynthesisUtterance(warningText);
          utter.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
          window.speechSynthesis.speak(utter);
        }
      } else {
        // Fast fallback heuristic
        const cleanDomain = rawVal.replace(/^https?:\/\//i, '').split('/')[0].toLowerCase();
        const isOfficial = cleanDomain.endsWith('.gov.in') || cleanDomain.endsWith('.nic.in');
        setResult({
          isSafe: isOfficial,
          verdict: isOfficial ? 'SAFE' : 'SCAM',
          detectedDomain: cleanDomain,
          riskScore: isOfficial ? 0 : 95,
          explanation: isOfficial
            ? 'Official site. Yeh verified .gov.in / .nic.in domain hai. Phir bhi OTP kisi ko na batayein.'
            : 'Danger: fake link. Yeh official sarkari domain nahi hai. Is par click na karein, aur 1930 par cybercrime report karein.',
          redFlags: isOfficial ? [] : ['Non-governmental TLD', 'Urgency trigger in message', 'Phishing risk'],
        });
      }
    } catch (e) {
      const cleanDomain = rawVal.replace(/^https?:\/\//i, '').split('/')[0].toLowerCase();
      const isOfficial = cleanDomain.endsWith('.gov.in') || cleanDomain.endsWith('.nic.in');
      setResult({
        isSafe: isOfficial,
        verdict: isOfficial ? 'SAFE' : 'SCAM',
        detectedDomain: cleanDomain,
        riskScore: isOfficial ? 0 : 95,
        explanation: isOfficial
          ? 'Official site. Yeh verified .gov.in / .nic.in domain hai. Phir bhi OTP kisi ko na batayein.'
          : 'Danger: fake link. Yeh official sarkari domain nahi hai. Is par click na karein, aur 1930 par cybercrime report karein.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="view panel" id="view-scam">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Icon name="shield" size={32} />
        Scam Shield · स्कैम कवच
      </h2>
      <p style={{ margin: 0, color: 'var(--muted)' }}>
        WhatsApp ya SMS ka link yahan paste karein. Hum batayenge ki woh official sarkari site hai ya nahi.
      </p>

      {/* Preset demo buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="text-xs font-bold text-[var(--muted)] self-center uppercase tracking-wider">
          Sample test cases:
        </span>
        {PRESET_LINKS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="text-xs px-2.5 py-1 rounded-full border border-[var(--line)] bg-[var(--surface-2)] hover:border-[var(--accent)] font-medium"
            onClick={() => {
              setInputUrl(item.url);
              handleCheck(item.url);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form
        className="field"
        id="scamForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleCheck();
        }}
      >
        <label htmlFor="link" style={{ position: 'absolute', left: '-9999px' }}>
          Link to check
        </label>
        <input
          id="link"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="e.g. pm-solar-yojana-free.in/apply"
        />
        <button className="btn red" type="submit" disabled={isLoading}>
          {isLoading ? 'Scanning...' : 'Check link'}
        </button>
      </form>

      {result && (
        <div className={`result ${result.isSafe ? 'good' : 'bad'}`} id="scamOut">
          <div className="flex items-start gap-3">
            <Icon name="shield" size={24} />
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                <b className="text-base font-bold">
                  {result.isSafe ? 'Official Government Portal Verified' : 'DANGER: Suspected Phishing / Fake Scam Link'}
                </b>
                <span
                  className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    result.isSafe
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                  }`}
                >
                  Risk Score: {result.riskScore}%
                </span>
              </div>

              <p className="my-1.5">{result.explanation}</p>

              {result.redFlags && result.redFlags.length > 0 && (
                <div className="mt-2 text-xs">
                  <span className="font-bold text-red-700 dark:text-red-400">Flagged Risks: </span>
                  {result.redFlags.join(' • ')}
                </div>
              )}

              {result.officialPortalUrl && (
                <div className="mt-3 p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs flex items-center justify-between">
                  <span>
                    Official verified portal:{' '}
                    <strong className="text-[var(--ink)]">{result.officialPortalName || result.officialPortalUrl}</strong>
                  </span>
                  <a
                    href={result.officialPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[var(--accent)] hover:underline"
                  >
                    Open official site ↗
                  </a>
                </div>
              )}

              {!result.isSafe && (
                <div className="mt-3 text-xs text-[var(--muted)] flex items-center gap-2">
                  <span>National Cyber Crime Helpline: <strong>1930</strong></span>
                  <span>•</span>
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-[var(--accent)]"
                  >
                    cybercrime.gov.in
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
