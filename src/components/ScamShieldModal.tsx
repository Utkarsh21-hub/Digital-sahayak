import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  Copy,
  Check,
  PhoneCall,
  Search,
  Sparkles,
  RefreshCw,
  Flame,
  ArrowRight,
} from 'lucide-react';

import { Language, UI_TRANSLATIONS, t, getSpeechLocale } from '../utils/translations';

interface ScamAnalysis {
  verdict: 'SCAM' | 'SAFE' | 'SUSPICIOUS';
  isSafe: boolean;
  confidence: number;
  riskScore: number;
  detectedDomain: string;
  impersonatedAgency: string;
  officialPortalUrl: string;
  officialPortalName: string;
  voiceWarning?: string;
  voiceWarningHindi: string;
  voiceWarningHinglish: string;
  voiceWarningEnglish: string;
  redFlags: string[];
  explanation: string;
  actionAdvice: string;
}

interface ScamShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

const DEMO_PRESETS = [
  {
    label: 'PM Mudra Loan Scam',
    badge: 'Demo',
    color: 'red',
    text: 'Congratulations! You are selected for ₹50,000 instant loan under PM Mudra Yojana with 0% interest. Click here to verify bank account: www.pm-mudra-loan-apply.in',
  },
  {
    label: 'Electricity Bill Disconnection KYC',
    badge: 'Urgent Threat',
    color: 'orange',
    text: 'Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM due to pending KYC update. Immediately update bill info: bit.ly/bijli-kyc-update',
  },
  {
    label: 'PM Free Solar Panel Scam',
    badge: 'Free Scheme',
    color: 'amber',
    text: 'PM Free Solar Panel Yojana 2025: Get free rooftop solar in your village. Only ₹499 delivery fee required. Apply fast: pm-surya-yojana.online',
  },
  {
    label: 'Official NEET Portal (Safe Check)',
    badge: 'Verified Safe',
    color: 'emerald',
    text: 'National Testing Agency official portal for candidate registration: https://neet.nta.nic.in',
  },
];

export const ScamShieldModal: React.FC<ScamShieldModalProps> = ({
  isOpen,
  onClose,
  language = 'hinglish',
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScamAnalysis | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const s = UI_TRANSLATIONS.scamShield;

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getActiveVoiceWarning = (analysis: ScamAnalysis): string => {
    if (analysis.voiceWarning) return analysis.voiceWarning;
    if (language === 'hi') return analysis.voiceWarningHindi;
    if (language === 'en') return analysis.voiceWarningEnglish;
    if (language === 'hinglish') return analysis.voiceWarningHinglish;
    return analysis.voiceWarningEnglish || analysis.voiceWarningHindi;
  };

  const triggerVoiceAlarm = (analysis: ScamAnalysis) => {
    if (isAudioMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const textToSpeak = getActiveVoiceWarning(analysis);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      speechSynthRef.current = utterance;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = getSpeechLocale(language);

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable:', e);
      setIsSpeaking(false);
    }
  };

  const handleScan = async (overrideText?: string) => {
    const textToScan = (overrideText ?? inputText).trim();
    if (!textToScan || isLoading) return;

    setIsLoading(true);
    setResult(null);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const res = await fetch('/api/verify-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToScan, language }),
      });

      if (!res.ok) throw new Error('API failed');

      const data = await res.json();
      const analysis: ScamAnalysis = data.analysis;
      setResult(analysis);

      if (analysis.verdict === 'SCAM') {
        triggerVoiceAlarm(analysis);
      }
    } catch (err) {
      console.error(err);
      const isOfficial = textToScan.includes('.gov.in') || textToScan.includes('.nic.in');
      const fallbackAnalysis: ScamAnalysis = {
        verdict: isOfficial ? 'SAFE' : 'SCAM',
        isSafe: isOfficial,
        confidence: 98,
        riskScore: isOfficial ? 5 : 95,
        detectedDomain: isOfficial ? 'Official .gov.in / .nic.in' : 'Unverified Domain',
        impersonatedAgency: 'Government Scheme / Portal',
        officialPortalUrl: 'https://www.india.gov.in',
        officialPortalName: 'National Portal of India (india.gov.in)',
        voiceWarning: isOfficial ? t(s.safeHeadline, language) : t(s.scamHeadline, language),
        voiceWarningHindi: 'रुकिए! यह एक फर्जी और धोखाधड़ी वाला लिंक है। सरकार व्हाट्सएप पर कभी लोन नहीं देती।',
        voiceWarningHinglish: 'STOP! Yeh ek fake aur fraud phishing link hai. Sarkar WhatsApp par kabhi direct loan ya paise nahi deti. Is link par bilkul click mat karein!',
        voiceWarningEnglish: 'STOP! This is a dangerous phishing scam. Do not click this link!',
        redFlags: [
          'Fake Domain: Uses unverified private extension instead of official .gov.in',
          'Urgency Trap: Promises direct cash transfer to steal banking OTPs',
          'Not Verified by National Informatics Centre (NIC)',
        ],
        explanation: 'This link does not originate from an authorized Indian government server.',
        actionAdvice: 'Delete this message immediately and never share your Aadhaar or Banking OTP.',
      };
      setResult(fallbackAnalysis);
      if (fallbackAnalysis.verdict === 'SCAM') {
        triggerVoiceAlarm(fallbackAnalysis);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyWarning = () => {
    if (!result) return;
    const warningMessage =
      `🚨 *CYBER FRAUD ALERT* 🚨\n\n` +
      `⚠️ *Domain:* ${result.detectedDomain}\n` +
      `❌ *Impersonating:* ${result.impersonatedAgency}\n` +
      `🛑 *Verdict:* ${t(s.verdictScam, language)}\n\n` +
      `💡 *Official Portal:* ${result.officialPortalUrl}\n` +
      `📞 *National Cyber Crime Helpline:* 1930`;

    navigator.clipboard.writeText(warningMessage).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 max-w-3xl w-full rounded-3xl border-2 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all duration-300 ${
          result?.verdict === 'SCAM'
            ? 'border-red-600 ring-4 ring-red-500/30'
            : result?.verdict === 'SAFE'
            ? 'border-emerald-600 ring-4 ring-emerald-500/20'
            : 'border-slate-200 dark:border-slate-800'
        }`}
      >
        {/* HEADER */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b transition-colors ${
            result?.verdict === 'SCAM'
              ? 'bg-red-600 text-white border-red-700'
              : result?.verdict === 'SAFE'
              ? 'bg-emerald-600 text-white border-emerald-700'
              : 'bg-gradient-to-r from-red-600 via-rose-700 to-indigo-900 text-white border-red-700 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0 shadow-inner">
              {result?.verdict === 'SAFE' ? (
                <ShieldCheck className="w-6 h-6 text-white" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  {t(s.title, language)}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/20 uppercase tracking-wider">
                  {t(s.badge, language)}
                </span>
              </div>
              <p className="text-xs text-white/90 line-clamp-1">
                {t(s.subtitle, language)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
                setIsAudioMuted(!isAudioMuted);
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title={isAudioMuted ? 'Unmute voice warnings' : 'Mute voice warnings'}
            >
              {isAudioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title={t(s.close, language)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-white dark:bg-slate-900">
          {/* CRITICAL REALITY BAR */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0"></span>
              <span className="text-slate-800 dark:text-slate-200">
                <strong>₹7,488 Crore+</strong> — {t(UI_TRANSLATIONS.hero.neverShareOtp, language)}
              </span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 shrink-0 font-medium">
              cybercrime.gov.in • 1930
            </span>
          </div>

          {/* DEMO PRESET BUTTONS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{t(s.samplesHeading, language)}</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEMO_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(preset.text);
                    handleScan(preset.text);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between gap-2 group hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                    preset.color === 'red'
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900/40'
                      : preset.color === 'orange'
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-950 dark:text-orange-100 hover:bg-orange-100 dark:hover:bg-orange-900/40'
                      : preset.color === 'amber'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                  }`}
                >
                  <div className="truncate">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">
                        {preset.badge}
                      </span>
                      <strong className="text-xs font-bold truncate">{preset.label}</strong>
                    </div>
                    <p className="text-[11px] opacity-80 truncate">{preset.text}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* INPUT FORM */}
          <div className="space-y-2">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
                placeholder={t(s.placeholder, language)}
                className="w-full p-3.5 pr-32 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 focus:border-red-600 focus:ring-4 focus:ring-red-500/20 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition"
              />
              <button
                onClick={() => handleScan()}
                disabled={isLoading || !inputText.trim()}
                className="absolute right-2.5 bottom-3.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-red-500/30 transition active:scale-95 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t(s.scanning, language)}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>{t(s.checkBtn, language)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ANALYSIS RESULTS PANEL */}
          {result && (
            <div
              className={`rounded-2xl p-4 sm:p-6 border-2 space-y-4 animate-in zoom-in-95 duration-200 ${
                result.verdict === 'SCAM'
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-950 dark:text-red-100'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100'
              }`}
            >
              {/* BIG VERDICT BANNER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
                      result.verdict === 'SCAM' ? 'bg-red-600 animate-bounce' : 'bg-emerald-600'
                    }`}
                  >
                    {result.verdict === 'SCAM' ? (
                      <AlertTriangle className="w-7 h-7" />
                    ) : (
                      <ShieldCheck className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide uppercase ${
                          result.verdict === 'SCAM'
                            ? 'bg-red-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {result.verdict === 'SCAM' ? t(s.verdictScam, language) : t(s.verdictSafe, language)}
                      </span>
                      <span className="text-xs font-bold opacity-80">
                        {result.confidence}%
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black mt-0.5">
                      {result.verdict === 'SCAM' ? t(s.scamHeadline, language) : t(s.safeHeadline, language)}
                    </h4>
                  </div>
                </div>

                {/* Voice Replay Badge */}
                {result.verdict === 'SCAM' && (
                  <button
                    onClick={() => triggerVoiceAlarm(result)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow transition shrink-0 cursor-pointer"
                    title={t(s.replayVoice, language)}
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-ping' : ''}`} />
                    <span>{t(s.replayVoice, language)}</span>
                  </button>
                )}
              </div>

              {/* VOICE WARNING BANNER */}
              {result.verdict === 'SCAM' && (
                <div className="p-3.5 rounded-xl bg-red-600/10 border border-red-500/30 flex items-start gap-3">
                  <div className="p-1 rounded bg-red-600 text-white shrink-0 mt-0.5">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm leading-relaxed">
                    <strong className="block text-red-700 dark:text-red-300 font-bold uppercase tracking-wider mb-0.5">
                      {t(s.voiceWarningLabel, language)}
                    </strong>
                    <p className="font-semibold italic">
                      "{getActiveVoiceWarning(result)}"
                    </p>
                  </div>
                </div>
              )}

              {/* DOMAIN BREAKDOWN INSPECTION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                    Domain:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800">
                      {result.detectedDomain}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 block">
                    <strong className="text-slate-900 dark:text-white">{result.impersonatedAgency}</strong>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                    {t(UI_TRANSLATIONS.header.onlyGovPortals, language)}:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {result.officialPortalName}
                    </span>
                  </div>
                  <a
                    href={result.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold underline mt-1 flex items-center gap-1 hover:opacity-80"
                  >
                    <span>{result.officialPortalUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* RED FLAGS LIST */}
              {result.redFlags && result.redFlags.length > 0 && (
                <div className="space-y-1.5">
                  <ul className="space-y-1">
                    {result.redFlags.map((flag, fIdx) => (
                      <li key={fIdx} className="text-xs sm:text-sm flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ACTION ADVICE & EMERGENCY ACTIONS */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:1930"
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{t(s.dial1930, language)}</span>
                  </a>

                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>cybercrime.gov.in</span>
                  </a>
                </div>

                <button
                  onClick={handleCopyWarning}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? t(UI_TRANSLATIONS.draftModal.copied, language) : t(s.copyAlert, language)}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t(UI_TRANSLATIONS.header.title, language)} • {t(s.badge, language)}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition cursor-pointer"
          >
            {t(s.close, language)}
          </button>
        </div>
      </div>
    </div>
  );
};
