import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Image as ImageIcon,
  X,
  Copy,
  Check,
  Mic,
  MicOff,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  HelpCircle,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  image?: string;
  time: string;
  modelUsed?: string;
}

interface GeminiChatViewProps {
  initialLanguage?: 'hinglish' | 'hi' | 'en';
  onLanguageChange?: (lang: 'hinglish' | 'hi' | 'en') => void;
  onOpenResizer?: () => void;
  onSelectProcedure?: (procedureId: string) => void;
  preselectedTask?: string;
  onOpenScamShield?: () => void;
  onOpenDraftGenerator?: () => void;
}

const SUPPORTED_TASKS = [
  {
    id: 'neet-ug-2025',
    title: 'NEET UG Application Form',
    portal: 'neet.nta.nic.in',
    level: 'Easy',
    fee: '₹1,000–₹1,700',
    prompt: 'Mujhe NEET UG application form bharna hai. Kripya shuru se guide karein.',
  },
  {
    id: 'driving-licence-renewal',
    title: 'Driving Licence Renewal',
    portal: 'sarathi.parivahan.gov.in',
    level: 'Easy',
    fee: '₹200–₹400',
    prompt: 'Online Driving Licence renew kaise karein bina RTO jaye?',
  },
  {
    id: 'aadhaar-mobile-update',
    title: 'Aadhaar Mobile Update',
    portal: 'myaadhaar.uidai.gov.in',
    level: 'Easy',
    fee: '₹50 (Statutory)',
    prompt: 'Aadhaar me mobile number update karne ka sahi sarkari tarika kya hai?',
  },
  {
    id: 'gazette-name-change',
    title: 'Gazette Name Change',
    portal: 'egazette.gov.in',
    level: 'Medium',
    fee: '₹1,100',
    prompt: 'Gazette me legal name change notification kaise publish karwayein?',
  },
  {
    id: 'fresh-aadhaar-enrolment',
    title: 'Fresh Aadhaar Enrolment',
    portal: 'uidai.gov.in',
    level: 'Easy',
    fee: '₹0 (Completely Free)',
    prompt: 'Naya Aadhaar card banwane ka official process kya hai?',
  },
  {
    id: 'tatkaal-passport',
    title: 'Fresh / Tatkaal Passport',
    portal: 'passportindia.gov.in',
    level: 'Medium',
    fee: '₹1,500–₹3,500',
    prompt: 'Tatkaal passport online apply karne ke liye kya steps aur documents chahiye?',
  },
  {
    id: 'cpgrams-grievance',
    title: 'CPGRAMS Central Grievance',
    portal: 'pgportal.gov.in',
    level: 'Hard',
    fee: '₹0 (Free Citizen Right)',
    prompt: 'Sarkari vibhag kaam nahi kar raha, CPGRAMS par grievance kaise darj karein?',
  },
  {
    id: 'delayed-service-redressal',
    title: 'Delayed Service / Anti-Corruption',
    portal: 'cvc.gov.in / lokpal.gov.in',
    level: 'Hard',
    fee: '₹0 (CBI/Lokpal)',
    prompt: 'Citizen Charter SLA exceed ho gaya ya rishwat maangi ja rahi hai, kya karein?',
  },
  {
    id: 'renunciation-citizenship',
    title: 'Renunciation / OCI Card',
    portal: 'indiancitizenshiponline.nic.in',
    level: 'Hard',
    fee: '₹8,000 + OCI fee',
    prompt: 'Indian citizenship renunciation aur fresh OCI card application ka process batayein.',
  },
  {
    id: 'delhi-land-records',
    title: 'Delhi Land Records (RoR/Khatauni)',
    portal: 'dlrc.delhi.gov.in',
    level: 'Medium',
    fee: '₹0 (Free view)',
    prompt: 'Delhi me DLR Act ya PLR Act ke tahat Khasra/Khatauni RoR kaise check aur download karein?',
  },
  {
    id: 'delhi-domicile',
    title: 'Delhi Domicile Certificate',
    portal: 'edistrict.delhigovt.nic.in',
    level: 'Medium',
    fee: '₹0 (NIL official fee)',
    prompt: 'Delhi e-District par Domicile (Niwas) praman patra ke liye 3-year proof kaise submit karein?',
  },
  {
    id: 'delhi-caste',
    title: 'Delhi Caste Certificate (SC/ST/OBC)',
    portal: 'edistrict.delhigovt.nic.in',
    level: 'Medium',
    fee: '₹0 (NIL official fee)',
    prompt: 'Delhi me OBC / SC certificate ke liye father caste proof aur cut-off document kaise lagayein?',
  },
  {
    id: 'up-bhulekh',
    title: 'UP Bhulekh (Khatauni Land Record)',
    portal: 'upbhulekh.gov.in',
    level: 'Easy',
    fee: '₹0 (100% Free)',
    prompt: 'UP Bhulekh par Real-Time Khatauni nakal Gata/Khata number se kaise dekhein?',
  },
  {
    id: 'up-domicile',
    title: 'UP Domicile (Niwas Praman Patra)',
    portal: 'esathi.up.gov.in',
    level: 'Medium',
    fee: '₹15 (Official fee)',
    prompt: 'Uttar Pradesh eSathi portal par Niwas Praman Patra (Domicile) apply karne ka process batayein.',
  },
  {
    id: 'up-caste',
    title: 'UP Caste (Jati Praman Patra)',
    portal: 'esathi.up.gov.in',
    level: 'Medium',
    fee: '₹15 (Official fee)',
    prompt: 'UP eSathi par Jati Praman Patra (OBC/SC/ST) ke liye swa-pramanit ghoshana patra aur process batayein.',
  },
];

export const GeminiChatView: React.FC<GeminiChatViewProps> = ({
  initialLanguage = 'hinglish',
  onLanguageChange,
  onOpenResizer,
  onSelectProcedure,
  preselectedTask,
  onOpenScamShield,
  onOpenDraftGenerator,
}) => {
  const [language, setLanguage] = useState<'hinglish' | 'hi' | 'en'>(initialLanguage);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{ base64: string; name: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize welcome conversation following Language First rule
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-gemini',
          sender: 'assistant',
          text: `Namaste! Main **Digital Sahayak** hoon — aapka government portal AI assistant powered by **Gemini 2.5 Flash Light**. 🇮🇳✨

Mera maksad hai ki aap bina kisi cyber cafe tout ko ₹300–₹3,000 diye, apne phone se sarkari portals (.gov.in / .nic.in) par saare kaam 100% sahi aur safely complete karein.

Aap kis bhasha me baat karna chahte hain? (Select your preferred language):
• **Hinglish** (Roman Hindi + English)
• **Simple Hindi (सरल हिंदी)**
• **Simple English**

Neeche diye gaye 15 verified central aur state tasks (Delhi, UP) me se koi bhi select karein, ya apna sawal poochhein!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'gemini-2.5-flash-lite',
        },
      ]);
    }
  }, [messages.length]);

  // Pre-fill query if coming from task selection
  useEffect(() => {
    if (preselectedTask) {
      const match = SUPPORTED_TASKS.find((t) => t.title.toLowerCase().includes(preselectedTask.toLowerCase()));
      if (match) {
        setInput(match.prompt);
      }
    }
  }, [preselectedTask]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleLanguageSelect = (newLang: 'hinglish' | 'hi' | 'en') => {
    setLanguage(newLang);
    onLanguageChange?.(newLang);
    const langNames = {
      hinglish: 'Hinglish (Hindi in English script)',
      hi: 'Simple Hindi (सरल हिंदी)',
      en: 'Simple English',
    };
    handleSend(`Maine meri language "${langNames[newLang]}" select ki hai. Please confirm karein aur batayein aap kin tasks me guide kar sakte hain.`);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAttachedImage({
        base64: result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
    // Reset file input so same file can be re-selected if removed
    e.target.value = '';
  };

  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText ?? input).trim();
    if (!textToSend && !attachedImage) return;
    if (isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend || (attachedImage ? 'Maine portal ka screenshot attach kiya hai. Kripya dekhein aur batayein kya karna hai.' : ''),
      image: attachedImage?.base64,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    const currentAttachment = attachedImage;
    setAttachedImage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          imageBase64: currentAttachment?.base64,
          history: messages.slice(-10).map((m) => ({ sender: m.sender, text: m.text })),
          language,
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat error status ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Guidance received.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || 'gemini-2.5-flash-lite',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Failed to get Gemini response:', err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'assistant',
        text: `Temporary network delay in contacting Gemini 2.5 Flash Light. 
Please retry your query or click one of the quick options below. Remember: Never pay any agent fee!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'digital-sahayak-engine',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCard = (cardText: string, messageId: string) => {
    navigator.clipboard.writeText(cardText).then(() => {
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleResetChat = () => {
    if (confirm('Kya aap naye sire se chat shuru karna chahte hain?')) {
      setMessages([]);
    }
  };

  // Helper to render message text with Markdown-like styling and WhatsApp card detection
  const renderMessageContent = (msg: ChatMessage) => {
    const isBot = msg.sender === 'assistant';
    const text = msg.text;

    // Check if message contains a WhatsApp card or revision card
    const isWhatsAppCard =
      text.includes('WhatsApp Revision Card') ||
      text.includes('REVISION SUMMARY') ||
      text.includes('WhatsApp Summary');

    // Split paragraphs
    const paragraphs = text.split('\n\n');

    return (
      <div className="space-y-3">
        {msg.image && (
          <div className="mb-3 rounded-xl overflow-hidden border border-outline-variant max-w-sm">
            <img src={msg.image} alt="Uploaded screenshot" className="w-full h-auto object-cover max-h-60" />
            <div className="p-2 bg-surface-container-high text-label-sm font-semibold flex items-center gap-1.5 text-on-surface-variant">
              <ImageIcon className="w-4 h-4 text-secondary" />
              <span>Screenshot Sahayak Image Attached</span>
            </div>
          </div>
        )}

        {paragraphs.map((p, idx) => {
          // Check if paragraph is a WhatsApp card block
          if (
            p.includes('WhatsApp Revision Card') ||
            p.includes('WhatsApp Summary') ||
            (isWhatsAppCard && p.includes('* Portal Link:'))
          ) {
            return (
              <div
                key={idx}
                className="my-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/30 text-emerald-950 dark:text-emerald-100 relative group"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-300 dark:border-emerald-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <strong className="text-sm font-bold uppercase tracking-wide">
                      📲 WhatsApp Revision Card (Save for Later)
                    </strong>
                  </div>
                  <button
                    onClick={() => handleCopyCard(p, `${msg.id}-${idx}`)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
                    title="Copy for WhatsApp"
                  >
                    {copiedId === `${msg.id}-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Card</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed">{p}</pre>
              </div>
            );
          }

          // Format regular lines
          const lines = p.split('\n');
          return (
            <div key={idx} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                // Highlight Official Link
                if (line.includes('OFFICIAL LINK:') || line.includes('Official Link:')) {
                  const urlMatch = line.match(/https?:\/\/[^\s)\]]+/);
                  const url = urlMatch ? urlMatch[0] : '#';
                  return (
                    <div
                      key={lIdx}
                      className="p-2.5 my-1.5 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-secondary shrink-0" />
                        <span className="text-sm font-bold text-secondary">
                          {line.replace(/https?:\/\/[^\s)\]]+/, '')}
                        </span>
                      </div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-secondary underline hover:opacity-80"
                      >
                        {url}
                      </a>
                    </div>
                  );
                }

                // Highlight Official Fee
                if (line.includes('OFFICIAL FEE:') || line.includes('Official Fee:')) {
                  return (
                    <div
                      key={lIdx}
                      className="p-2.5 my-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-center gap-2 text-amber-900 dark:text-amber-100"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-sm font-semibold">{line}</span>
                    </div>
                  );
                }

                // Highlight tough terms in brackets
                const formattedLine = line
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\|\s*TOUGH TERMS:\s*(.*?)$/i, '<span class="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800 font-medium">💡 Asaan Matlab: $1</span>');

                return (
                  <p
                    key={lIdx}
                    className="text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              })}
            </div>
          );
        })}

        {/* Action chips for next steps when assistant finishes a turn */}
        {isBot && (
          <div className="pt-2 flex flex-wrap gap-2 border-t border-outline-variant/40 mt-3">
            <button
              onClick={() => handleSend('Haan, mere paas ye documents hain aur ready hain. Step 1 batayein.')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-white hover:bg-secondary/90 transition shadow-sm flex items-center gap-1.5"
            >
              <span>✅ Yes, Documents Ready! Show Step 1</span>
            </button>
            <button
              onClick={() => handleSend('Maine ye step pura kar liya hai! Agla step batayein.')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant transition"
            >
              <span>➡️ Step Complete! Next Step</span>
            </button>
            <button
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition flex items-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>📸 Error/Form Screenshot Upload</span>
            </button>
            <button
              onClick={() => onOpenResizer?.()}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface-variant border border-outline-variant transition"
            >
              <span>📐 KB Resizer Tool</span>
            </button>
            <button
              onClick={() => onOpenDraftGenerator?.()}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              <span>📝 Draft Sahayak (Legal Affidavits)</span>
            </button>
            <button
              onClick={() => onOpenScamShield?.()}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 transition flex items-center gap-1.5 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>🛡️ Scam Shield (Check WhatsApp Link)</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[850px] min-h-[550px] bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg overflow-hidden">
      {/* GEMINI CHAT TOP BAR */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between gap-3">
        {/* Left: Gemini Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-on-surface">Digital Sahayak</h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Gemini 2.5 Flash Light
              </span>
              <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-container text-on-surface-variant border border-outline-variant">
                Temp: 0.2
              </span>
            </div>
            <p className="text-xs text-on-surface-variant line-clamp-1">
              Strictly Grounded in 9 Verified Government Guides • Zero Cyber Cafe Commission
            </p>
          </div>
        </div>

        {/* Right: Language Pill & Reset */}
        <div className="flex items-center gap-2">
          {/* Quick Language Toggle */}
          <div className="flex items-center bg-surface-container rounded-xl p-0.5 border border-outline-variant text-xs font-semibold">
            <button
              onClick={() => handleLanguageSelect('hinglish')}
              className={`px-2.5 py-1 rounded-lg transition ${
                language === 'hinglish'
                  ? 'bg-surface-container-lowest text-secondary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Hinglish
            </button>
            <button
              onClick={() => handleLanguageSelect('hi')}
              className={`px-2.5 py-1 rounded-lg transition ${
                language === 'hi'
                  ? 'bg-surface-container-lowest text-secondary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => handleLanguageSelect('en')}
              className={`px-2.5 py-1 rounded-lg transition ${
                language === 'en'
                  ? 'bg-surface-container-lowest text-secondary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              English
            </button>
          </div>

          <button
            onClick={handleResetChat}
            className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant transition"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* QUICK TASK SELECTOR PILLS CAROUSEL */}
      <div className="px-4 py-2 bg-surface-container-low border-b border-outline-variant/60 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
          <FileText className="w-3.5 h-3.5 text-secondary" />
          Verified Tasks (9):
        </span>
        <button
          onClick={() => onOpenScamShield?.()}
          className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-red-600 to-rose-700 text-white hover:from-red-700 hover:to-rose-800 font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>🛡️ Scam Shield (कवच)</span>
        </button>
        {SUPPORTED_TASKS.map((task) => (
          <button
            key={task.id}
            onClick={() => {
              onSelectProcedure?.(task.id);
              handleSend(task.prompt);
            }}
            className="px-2.5 py-1 text-xs rounded-full bg-surface-container-lowest hover:bg-secondary/10 hover:text-secondary border border-outline-variant text-on-surface whitespace-nowrap transition flex items-center gap-1.5 shrink-0"
          >
            <span className="font-medium">{task.title}</span>
            <span
              className={`text-[10px] px-1 rounded font-bold ${
                task.level === 'Easy'
                  ? 'bg-emerald-100 text-emerald-800'
                  : task.level === 'Medium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {task.level}
            </span>
          </button>
        ))}
      </div>

      {/* CHAT MESSAGES SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 bg-surface-container-lowest/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'} max-w-4xl mx-auto`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`flex flex-col ${
                  isUser ? 'items-end max-w-[85%] sm:max-w-[75%]' : 'items-start max-w-[95%] sm:max-w-[85%]'
                }`}
              >
                <div
                  className={`p-4 rounded-2xl ${
                    isUser
                      ? 'bg-surface-container text-on-surface rounded-tr-none border border-outline-variant'
                      : 'bg-surface-container-lowest text-on-surface rounded-tl-none border border-outline-variant/80 shadow-sm'
                  }`}
                >
                  {renderMessageContent(msg)}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-on-surface-variant">
                  <span>{msg.time}</span>
                  {msg.modelUsed && !isUser && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-secondary font-medium">
                        {msg.modelUsed}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold text-xs shrink-0 mt-0.5 border border-outline-variant">
                  You
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Spinner Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-4xl mx-auto items-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-surface-container-lowest border border-outline-variant shadow-sm flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-xs font-semibold text-on-surface-variant">
                Consulting Gemini 2.5 Flash Light & Verified Government Guides...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* CHAT INPUT AREA */}
      <div className="p-3 sm:p-4 border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Image preview badge if attached */}
          {attachedImage && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="font-medium text-purple-900 dark:text-purple-200 truncate max-w-xs">
                  {attachedImage.name} (Screenshot Sahayak ready)
                </span>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="p-1 rounded-md hover:bg-purple-200/50 text-purple-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input Capsule */}
          <div className="relative flex items-center bg-surface-container-lowest rounded-2xl border-2 border-outline-variant focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all p-1.5 shadow-sm">
            {/* Hidden File Input for Screenshot Sahayak */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Screenshot Sahayak Camera / Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-secondary hover:bg-surface-container transition shrink-0 flex items-center justify-center"
              title="Upload Screenshot (Screenshot Sahayak - decode form/error)"
            >
              <ImageIcon className="w-5 h-5 text-secondary" />
            </button>

            {/* Main Textarea */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder={
                language === 'hi'
                  ? 'संदेह पूछें, या स्क्रीनशॉट अपलोड करें (उदा. NEET, DL, Aadhaar)...'
                  : 'Sawal poochhein ya screenshot attach karein (e.g. NEET, DL Renewal, Aadhaar)...'
              }
              className="flex-1 bg-transparent border-0 outline-none resize-none px-3 py-2 text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant min-h-[44px] max-h-32"
            />

            {/* Voice Input Mic Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-xl transition shrink-0 flex items-center justify-center ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-on-surface-variant hover:text-secondary hover:bg-surface-container'
              }`}
              title="Voice Search (Hindi / English)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Send Button */}
            <button
              type="button"
              disabled={isLoading || (!input.trim() && !attachedImage)}
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-secondary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary/90 transition shrink-0 shadow-sm"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Subtext Grounding Guarantee */}
          <div className="flex items-center justify-between px-2 text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Strictly Grounded in 9 Verified Guides • Zero Commission Guarantee</span>
            </span>
            <span className="hidden sm:inline">Press Enter to Send</span>
          </div>
        </div>
      </div>
    </div>
  );
};
