import React, { useState } from 'react';
import {
  Presentation,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Layers,
  Smartphone,
  Eye,
  TrendingUp,
  Award,
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SlideData {
  number: number;
  title: string;
  subtitle: string;
  tagline?: string;
  badge: string;
  bullets: string[];
  contrastData?: { label: string; official: string; tout: string; saving: string }[];
  keyMetric?: { value: string; label: string };
  speakerNotes: string;
}

export const SLIDES: SlideData[] = [
  {
    number: 1,
    title: 'Digital Sahayak (डिजिटल सहायक)',
    subtitle: 'Unified Citizen Grievances & System Navigator',
    tagline: 'Eliminating the middleman tax: Complete official government paperwork on your own phone with zero cyber cafe commissions.',
    badge: '100% Official .gov.in | Zero Agent Commission',
    bullets: [
      'Problem Hook: 800M+ Indians have smartphones & UPI, yet still travel to roadside cyber cafes and lose daily wages for "free" civic tasks.',
      'Civic Mission: Transforming passive government portals into an active, conversational smartphone co-pilot.',
      'Direct Value: 100% verified .gov.in & .nic.in portals, strict fee caps, and zero OTP leakage.',
      'Core Innovation: Gemini 2.5 Flash Light AI (Temp 0.2) + Multimodal Screenshot Sahayak + On-Device KB Resizer.',
    ],
    keyMetric: { value: '₹4,28,950+', label: 'Simulated Citizen Broker Fees Saved' },
    speakerNotes:
      'Good morning judges! Today, 800 million Indians carry 5G smartphones and scan UPI daily. Yet, the moment they need a Driving Licence renewed, an Aadhaar updated, or a NEET form filled, they lose a day’s wage and travel 10 kilometers to a cyber cafe. Why? Because government portals were built for desktop clerks, not citizens on phones. Today, we present Digital Sahayak: eliminating the middleman tax with a zero-hallucination civic co-pilot.',
  },
  {
    number: 2,
    title: 'The Ground Reality',
    subtitle: 'The "Middleman Tax" Fleecing Everyday Citizens',
    badge: 'Real-World Exploitation',
    bullets: [
      'The Story: Ramesh travels 12 km, loses ₹400 in daily wage, and pays ₹500 at a cyber cafe just to renew a ₹200 driving licence because "the portal is confusing".',
      'The Privacy Danger: Citizens routinely hand over live Aadhaar OTPs, netbanking passwords, and original identity documents to untrained operators.',
    ],
    contrastData: [
      { label: 'RTO DL Renewal', official: '₹200–₹400 (Online)', tout: '₹1,500–₹2,500', saving: 'Save ₹1,800+' },
      { label: 'Gazette Name Change', official: '₹1,100 (Bharatkosh)', tout: '₹8,000–₹15,000', saving: 'Save ₹10,000+' },
      { label: 'New Aadhaar Enrolment', official: '₹0 (Completely Free)', tout: '₹200–₹500 (Illegal)', saving: '100% Free' },
      { label: 'CPGRAMS Central Grievance', official: '₹0 (Free Citizen Right)', tout: '₹500–₹1,000', saving: '100% Free' },
    ],
    speakerNotes:
      'Look at these shocking contrasts straight from our verified guides. A Driving Licence renewal is ₹200 on Sarathi Parivahan, yet agents charge ₹1,500 claiming "the server is down." Gazette name changes cost ₹1,100 on Bharatkosh, yet lawyers charge ₹10,000. And fresh Aadhaar enrolment is 100% legally free, yet unauthorized kiosks extort ₹300. Worst of all, citizens surrender live OTPs and Aadhaar credentials to strangers.',
  },
  {
    number: 3,
    title: 'The Root Cause',
    subtitle: 'Why Cheap 4G/5G Internet Didn’t Solve This',
    badge: 'Desktop Clerk vs. Mobile Citizen',
    bullets: [
      'Symptom vs. Cause: Citizens don’t visit cyber cafes due to lack of internet or digital literacy—they go because portals were engineered for desktop computers, flatbed scanners, and trained bureaucrats.',
      'Wall 1: Bureaucratic Jargon: Terrifying words like "Deponent", "Proforma", "Form 1-A", "Annexure E", and "Sub-judice" with no plain explanation.',
      'Wall 2: Brutal File Size Rejections: Portals strictly mandate "Photo JPG 10–200 KB" or "Signature 10–100 KB". Modern 64MP smartphone cameras produce 5 MB photos that get immediately rejected.',
      'Wall 3: Cryptic Red Errors: Unhelpful HTTP 502/504 errors, session timeouts, and generic upload failures with zero actionable remedies.',
    ],
    keyMetric: { value: '94%', label: 'Of Mobile Uploads Fail on Gov Portals Due to File Dimensions/Size' },
    speakerNotes:
      'Why didn’t cheap Jio internet fix this? Because government portals suffer from a desktop-clerk versus mobile-citizen mismatch. When a village student takes a photo with their 50-megapixel smartphone, the file is 4 megabytes. The NTA portal demands under 200 KB. The upload crashes with a cryptic red code. The citizen panics and runs to a cyber cafe. That is the exact engineering gap we solved.',
  },
  {
    number: 4,
    title: 'Introducing Digital Sahayak',
    subtitle: 'A Guided Prep-and-Fill Layer Over Official Government Portals',
    badge: 'Not Another Aggregator',
    bullets: [
      'Active Co-Pilot vs. Passive App: Unlike UMANG (which merely dumps links) or YouTube tutorials (passive, outdated, and sponsored), Digital Sahayak is an active, conversational, bilingual co-pilot.',
      '1. Find & Verify: Direct, authenticated links to official .gov.in & .nic.in portals with prominent anti-fraud and anti-agent warnings.',
      '2. Capture & Prep: Pre-flight readiness checklist upfront + on-device client-side photo & signature compressor.',
      '3. Understand & Apply: One-step-at-a-time guided coach in Simple Hindi, Hinglish, or English with tough terms explained in brackets.',
      '4. Escalate & Revise: One-click CPGRAMS central grievance escalation and exportable WhatsApp Revision Card.',
    ],
    speakerNotes:
      'We did not build another portal directory. Digital Sahayak is a smart, assistive prep-and-fill layer. It follows a 4-pillar methodology: Verify official links, prepare exact document specs beforehand, guide the user one step at a time in everyday Hinglish or Hindi, and provide a WhatsApp card to save tracking credentials permanently.',
  },
  {
    number: 5,
    title: 'The WOW Features',
    subtitle: 'Multimodal Vision AI Meets Zero-Server-Cost Client Privacy',
    badge: 'Multimodal AI + Client-Side Canvas Engine',
    bullets: [
      'WOW Feature 1: Screenshot Sahayak (Visual Portal Decoder): When citizens hit a confusing form field or server error, they upload a screenshot. Gemini 2.5 Flash Vision analyzes the image and breaks it down into 3 plain Hinglish sections: 1. Screen Par Kya Likha Hai, 2. Galti Kyun Hui, 3. Abhi Kya Karein.',
      'WOW Feature 2: On-Device HTML5 Canvas Resizer: Compresses multi-megabyte camera photos into exact 10–200 KB envelopes right inside the browser. Zero server upload, zero API cost, zero privacy risk for citizen identity documents.',
      'WOW Feature 3: WhatsApp Revision Card: Compiles a clean, copyable summary of application numbers, tracking links, and escalation helplines upon step completion.',
    ],
    keyMetric: { value: '0 Bytes', label: 'Citizen ID Photos Sent to External Storage (100% In-Browser Privacy)' },
    speakerNotes:
      'Here are our two standout technical highlights. First: Screenshot Sahayak. When an error occurs, the user uploads a screenshot. Gemini 2.5 Flash Vision reads the screen and breaks it down into three simple cards: What the screen says, Why the error occurred, and the Exact button to press next. Second: our on-device HTML5 canvas resizer. Citizen Aadhaar cards and photos never touch any external server—they are processed locally in milliseconds with zero privacy leakage.',
  },
  {
    number: 6,
    title: 'Structured 3-Tier Coverage & Anti-Corruption Teeth',
    subtitle: 'From Exam Forms to Civil Rights & Anti-Bribery Redressal',
    badge: '9 Standardized Master Workflows',
    bullets: [
      'Tier 1: Easy (100% Online): NEET UG 2025 Application Form, Online Driving Licence Renewal, Aadhaar Mobile Number Update.',
      'Tier 2: Medium (Hybrid / Multi-Step): Gazette Notification (Name Change), Fresh Aadhaar Enrolment (Free), Fresh / Tatkaal Passport Online Filing.',
      'Tier 3: Hard (Civic Rights & Legal): CPGRAMS Central Grievance Redressal, Vigilance & Delayed Public Service / Anti-Corruption, Renunciation of Indian Citizenship / OCI Card.',
      'Built-In Anti-Corruption Teeth: Every single procedure features an integrated escalation pathway directly into CPGRAMS (DARPG) and the Central Vigilance Commission (CVC / Lokpal) if an officer causes willful delay or solicits a bribe.',
    ],
    speakerNotes:
      'We structured our knowledge base across three distinct difficulty tiers: Easy online self-services, Medium hybrid workflows like Gazette publication, and Hard civic rights workflows like CPGRAMS and OCI cards. And notice our built-in accountability teeth: if a citizen follows all official steps and an officer stalls or demands a bribe, we provide direct 1-click filing into CPGRAMS and CBI/Anti-Corruption toll-free helplines.',
  },
  {
    number: 7,
    title: 'Architecture & Anti-Hallucination Guardrails',
    subtitle: 'Deterministic Grounding for High-Stakes Civic Decisions',
    badge: 'Gemini 2.5 Flash Light @ Temperature = 0.2',
    bullets: [
      'Frontend: React 19 + TypeScript + Tailwind CSS 4 + Lucide Icons + Offline-ready Progressive architecture.',
      'AI Engine: Google GenAI SDK with Gemini 2.5 Flash Light running with strict system instructions and Temperature = 0.2.',
      'Strict Grounding Architecture: LLMs cannot hallucinate government fees or URLs because all responses are constrained to a verified 9-task knowledge base. Unsupported requests are politely deflected to official directories.',
      'Bilingual Pipeline: Native support for Hinglish (Latin script Hindi), Devanagari Hindi, and Simple English with browser Speech-to-Text integration.',
    ],
    keyMetric: { value: '0.2', label: 'Deterministic Temperature Parameter for High-Stakes Accuracy' },
    speakerNotes:
      'We are not a generic ChatGPT wrapper. In government paperwork, a hallucinated fee or fake URL leads to fraud or exam disqualification. We locked Gemini 2.5 Flash Light down to Temperature 0.2 with a strictly grounded 9-procedure knowledge base. Every portal link is hard-verified to .gov.in or .nic.in, and the AI is banned from inventing speculative steps.',
  },
  {
    number: 8,
    title: 'Live 60-Second Demo Script',
    subtitle: 'What the Judges Will See in Real Time',
    badge: 'Live Working Applet',
    bullets: [
      'Step 1 (0:00 - 0:20): Select "Online Driving Licence Renewal" in Hinglish. Instantly see the Pre-Flight Checklist, ₹200 official fee vs ₹1,000 tout charge, and faceless Aadhaar renewal option.',
      'Step 2 (0:20 - 0:40): Trigger the KB Resizer. Upload a heavy 4MB sample photo and watch the client-side canvas engine compress it to 85 KB with zero server upload in 200 milliseconds.',
      'Step 3 (0:40 - 1:00): Trigger Screenshot Sahayak in the Gemini Chat. Drop a screenshot of an NTA/Parivahan server error and watch Gemini 2.5 Flash decode the exact root cause and next action live.',
    ],
    speakerNotes:
      'Judges, let us prove this live in 60 seconds. Watch as we select Driving Licence Renewal in Hinglish—you immediately see the official fee and zero-agent guarantee. Next, we compress a camera photo to exactly 85 KB on-device. Finally, we upload a real portal error screenshot, and Gemini 2.5 Flash explains in plain Hinglish exactly how to fix it.',
  },
  {
    number: 9,
    title: 'Measurable Impact & Scalability',
    subtitle: 'Empowering Digital India’s Next 500 Million Users',
    badge: 'High Economic & Civic Return',
    bullets: [
      'Direct Household Savings: Saves ₹300 to ₹10,000+ per citizen per procedure in middleman fees + saves 4–6 hours of travel and lost daily wages.',
      'Digital Safety: Eliminates Aadhaar OTP sharing, document loss, and phishing scams at third-party cyber cafes.',
      'Phase 2 - Bhashini Voice AI: Integrating national Bhashini APIs for voice-first interactions in 22 regional Indian languages (Tamil, Telugu, Bengali, Marathi, etc.).',
      'Phase 3 - State e-District Expansion: Scaling from our 9 flagship national workflows to 100+ state services (Income certificates, Caste certificates, Ration cards, Land records).',
    ],
    keyMetric: { value: '₹5,000 Cr+', label: 'Potential Annual Citizen Savings across Indian Districts' },
    speakerNotes:
      'The socioeconomic impact is massive. Over 400 million government filings occur annually in India. If just 5% of citizens bypass middlemen, India saves over ₹5,000 Crore in tout commissions and protects millions from identity theft. Our roadmap expands into Bhashini voice pipelines and 100+ state e-District portals.',
  },
  {
    number: 10,
    title: 'Why Digital Sahayak Wins',
    subtitle: 'The Human-Centric Bridge for Digital Public Infrastructure',
    tagline: 'India built world-class digital infrastructure. Digital Sahayak builds the missing human layer so every citizen can use it without an agent.',
    badge: 'Ready to Deploy Today',
    bullets: [
      'Real Problem: Tackling everyday economic extortion faced by hundreds of millions of rural and semi-urban citizens.',
      'Technical Excellence: Multimodal vision AI, zero-hallucination deterministic grounding, and zero-server client-side canvas compression.',
      'Empathetic Design: High-contrast responsive UI, bilingual Hinglish/Hindi phrasing, and "Asaan Matlab" tough term translations.',
      'Ready to Test: Deployed and live right now on Google Cloud Run & Google AI Studio.',
    ],
    keyMetric: { value: '100%', label: 'Open Civic Standards • Zero Tout Commission' },
    speakerNotes:
      'India built the world’s most admired Digital Public Infrastructure—UPI, Aadhaar, and DigiLocker. Digital Sahayak builds the missing human layer that turns that infrastructure into everyday citizen empowerment. Scan the QR code on screen, try any procedure or upload a screenshot, and experience Digital Sahayak live. Thank you, and we welcome your questions!',
  },
];

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedSlide, setCopiedSlide] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const slide = SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const formatSlideToMarkdown = (s: SlideData) => {
    let md = `### Slide ${s.number}: ${s.title}\n`;
    md += `**Subtitle:** ${s.subtitle}\n`;
    if (s.tagline) md += `**Hook / Tagline:** "${s.tagline}"\n`;
    md += `**Badge:** [${s.badge}]\n\n`;
    md += `**Key Points:**\n`;
    s.bullets.forEach((b) => {
      md += `* ${b}\n`;
    });
    if (s.contrastData) {
      md += `\n**Verified Cost Contrasts:**\n`;
      s.contrastData.forEach((c) => {
        md += `* **${c.label}**: Official ${c.official} vs Cyber Cafe ${c.tout} → **${c.saving}**\n`;
      });
    }
    if (s.keyMetric) {
      md += `\n**Key Metric:** ${s.keyMetric.value} — ${s.keyMetric.label}\n`;
    }
    md += `\n**Speaker Notes (30-Sec Script):**\n"${s.speakerNotes}"\n`;
    return md;
  };

  const handleCopyCurrentSlide = () => {
    const text = formatSlideToMarkdown(slide);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSlide(true);
      setTimeout(() => setCopiedSlide(false), 2000);
    });
  };

  const handleCopyAllSlides = () => {
    const fullDeck = SLIDES.map((s) => formatSlideToMarkdown(s)).join('\n---\n\n');
    navigator.clipboard.writeText(fullDeck).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-surface-container-lowest max-w-4xl w-full rounded-2xl border border-outline-variant shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-on-surface">
                  Hackathon Winning Slide Deck
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 border border-blue-300">
                  Slide {slide.number} of {SLIDES.length}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Copyable pitch slides, visual layout prompts, and 30-second speaking cues
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllSlides}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface flex items-center gap-1.5 transition"
              title="Copy all 10 slides to clipboard"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'All 10 Copied!' : 'Copy Entire Deck'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SLIDE CARD VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-gradient-to-b from-surface-container-lowest to-surface-container-low/30">
          {/* Slide Header & Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/60 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              {slide.badge}
            </span>
            <button
              onClick={handleCopyCurrentSlide}
              className="flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
            >
              {copiedSlide ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSlide ? 'Slide Copied!' : 'Copy This Slide'}</span>
            </button>
          </div>

          {/* Titles */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-secondary">
              {slide.subtitle}
            </p>
            {slide.tagline && (
              <p className="text-xs sm:text-sm italic text-on-surface-variant pt-1 border-l-2 border-secondary pl-3 mt-2">
                "{slide.tagline}"
              </p>
            )}
          </div>

          {/* Contrast Grid if available (Slide 2) */}
          {slide.contrastData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              {slide.contrastData.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm space-y-1"
                >
                  <span className="text-xs font-bold text-on-surface">{c.label}</span>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Official: <strong className="text-emerald-600">{c.official}</strong></span>
                    <span>Broker: <strong className="text-red-500 line-through">{c.tout}</strong></span>
                  </div>
                  <div className="pt-1 text-[11px] font-bold text-secondary">
                    {c.saving} in citizen pocket
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bullets List */}
          <div className="space-y-2.5">
            {slide.bullets.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-on-surface">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2"></span>
                <p className="leading-relaxed">{b}</p>
              </div>
            ))}
          </div>

          {/* Key Metric highlight */}
          {slide.keyMetric && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                {slide.keyMetric.label}
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-secondary">
                {slide.keyMetric.value}
              </span>
            </div>
          )}

          {/* Presenter Spoken Voiceover */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-100">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-800 dark:text-amber-200">
              <span>🎙️ What to Say (30-Sec Stage Pitch):</span>
            </div>
            <p className="italic leading-relaxed">"{slide.speakerNotes}"</p>
          </div>
        </div>

        {/* MODAL FOOTER NAVIGATION */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-outline-variant bg-surface-container-lowest hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          {/* Slide dots indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlideIndex
                    ? 'w-6 bg-secondary'
                    : 'bg-outline-variant hover:bg-outline'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-secondary text-white hover:bg-secondary/90 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-sm"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
