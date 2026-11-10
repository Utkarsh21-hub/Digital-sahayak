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
import { getAppIcon, getProcedureIcon } from '../utils/appIcons';
import { AvatarAnimator, BotState } from './AvatarAnimator';
import { Language, UI_TRANSLATIONS, PROCEDURE_TRANSLATIONS } from '../utils/translations';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  image?: string;
  time: string;
  modelUsed?: string;
}

interface GeminiChatViewProps {
  language?: Language;
  initialLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  onOpenResizer?: () => void;
  onSelectProcedure?: (procedureId: string) => void;
  preselectedTask?: string;
  onOpenScamShield?: () => void;
  onOpenDraftGenerator?: () => void;
  theme?: 'light' | 'dark';
}

interface VerifiedTask {
  id: string;
  title: string;
  portal: string;
  level: 'Easy' | 'Medium' | 'Hard';
  levelColor: string;
  fee: string;
  icon: string;
  prompt: string;
}

const SUPPORTED_TASKS: VerifiedTask[] = [
  {
    id: 'neet-ug-2025',
    title: 'NEET UG Application',
    portal: 'neet.nta.nic.in',
    level: 'Easy',
    levelColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    fee: '₹1,000–₹1,700',
    icon: '🎓',
    prompt: 'Mujhe NEET UG application form bharna hai. Kripya shuru se guide karein.',
  },
  {
    id: 'fresh-aadhaar-enrolment',
    title: 'Fresh Aadhaar Enrolment',
    portal: 'uidai.gov.in',
    level: 'Easy',
    levelColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    fee: '₹0 (Completely Free)',
    icon: '🪪',
    prompt: 'Naya Aadhaar card banwane ka official process kya hai?',
  },
  {
    id: 'up-bhulekh',
    title: 'UP Bhulekh Land Record',
    portal: 'upbhulekh.gov.in',
    level: 'Easy',
    levelColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    fee: '₹0 (100% Free)',
    icon: '🏛️',
    prompt: 'UP Bhulekh par Real-Time Khatauni nakal Gata/Khata number se kaise dekhein?',
  },
  {
    id: 'driving-licence-renewal',
    title: 'Driving Licence Renewal',
    portal: 'sarathi.parivahan.gov.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹200–₹400',
    icon: '🚗',
    prompt: 'Online Driving Licence renew kaise karein bina RTO jaye?',
  },
  {
    id: 'aadhaar-mobile-update',
    title: 'Aadhaar Mobile Update',
    portal: 'myaadhaar.uidai.gov.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹50 (Statutory)',
    icon: '📱',
    prompt: 'Aadhaar me mobile number update karne ka sahi sarkari tarika kya hai?',
  },
  {
    id: 'tatkaal-passport',
    title: 'Fresh / Tatkaal Passport',
    portal: 'passportindia.gov.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹1,500–₹3,500',
    icon: '🛂',
    prompt: 'Tatkaal passport online apply karne ke liye kya steps aur documents chahiye?',
  },
  {
    id: 'delhi-land-records',
    title: 'Delhi Land Records',
    portal: 'dlrc.delhi.gov.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹0 (Free view)',
    icon: '🗺️',
    prompt: 'Delhi me DLR Act ya PLR Act ke tahat Khasra/Khatauni RoR kaise check aur download karein?',
  },
  {
    id: 'delhi-domicile',
    title: 'Delhi Domicile Certificate',
    portal: 'edistrict.delhigovt.nic.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹0 (NIL official fee)',
    icon: '🏠',
    prompt: 'Delhi e-District par Domicile (Niwas) praman patra ke liye 3-year proof kaise submit karein?',
  },
  {
    id: 'delhi-caste',
    title: 'Delhi Caste Certificate',
    portal: 'edistrict.delhigovt.nic.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹0 (NIL official fee)',
    icon: '📜',
    prompt: 'Delhi me OBC / SC certificate ke liye father caste proof aur cut-off document kaise lagayein?',
  },
  {
    id: 'up-domicile',
    title: 'UP Domicile',
    portal: 'esathi.up.gov.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹15 (Official fee)',
    icon: '🏠',
    prompt: 'Uttar Pradesh eSathi portal par Niwas Praman Patra (Domicile) apply karne ka process batayein.',
  },
  {
    id: 'up-caste',
    title: 'UP Caste Certificate',
    portal: 'esathi.up.gov.in',
    level: 'Medium',
    levelColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    fee: '₹15 (Official fee)',
    icon: '📜',
    prompt: 'UP eSathi par Jati Praman Patra (OBC/SC/ST) ke liye swa-pramanit ghoshana patra aur process batayein.',
  },
  {
    id: 'gazette-name-change',
    title: 'Gazette Name Change',
    portal: 'egazette.gov.in',
    level: 'Hard',
    levelColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    fee: '₹1,100',
    icon: '📰',
    prompt: 'Gazette me legal name change notification kaise publish karwayein?',
  },
  {
    id: 'cpgrams-grievance',
    title: 'CPGRAMS Grievance',
    portal: 'pgportal.gov.in',
    level: 'Hard',
    levelColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    fee: '₹0 (Free Citizen Right)',
    icon: '📋',
    prompt: 'Sarkari vibhag kaam nahi kar raha, CPGRAMS par grievance kaise darj karein?',
  },
  {
    id: 'delayed-service-redressal',
    title: 'Anti-Corruption',
    portal: 'cvc.gov.in / lokpal.gov.in',
    level: 'Hard',
    levelColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    fee: '₹0 (CBI/Lokpal)',
    icon: '🛡️',
    prompt: 'Citizen Charter SLA exceed ho gaya ya rishwat maangi ja rahi hai, kya karein?',
  },
  {
    id: 'renunciation-citizenship',
    title: 'OCI / Renunciation',
    portal: 'indiancitizenshiponline.nic.in',
    level: 'Hard',
    levelColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    fee: '₹8,000 + OCI fee',
    icon: '🛂',
    prompt: 'Indian citizenship renunciation aur fresh OCI card application ka process batayein.',
  },
];

export const GeminiChatView: React.FC<GeminiChatViewProps> = ({
  language: propLanguage,
  initialLanguage = 'hinglish',
  onLanguageChange,
  onOpenResizer,
  onSelectProcedure,
  preselectedTask,
  onOpenScamShield,
  onOpenDraftGenerator,
  theme = 'light',
}) => {
  const [language, setLanguage] = useState<Language>(propLanguage || initialLanguage);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{ base64: string; name: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);
  const [botState, setBotState] = useState<BotState>('greeting');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sync with prop changes from header language toggle
  useEffect(() => {
    if (propLanguage && propLanguage !== language) {
      setLanguage(propLanguage);
    }
  }, [propLanguage]);

  // Update welcome message if chat is at initial state
  useEffect(() => {
    setMessages((prev) => {
      const welcomeContent =
        UI_TRANSLATIONS.chat.welcomeText[language] || UI_TRANSLATIONS.chat.welcomeText.hinglish;
      if (prev.length === 0) {
        return [
          {
            id: 'welcome-gemini',
            sender: 'assistant',
            text: welcomeContent,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            modelUsed: 'gemini-2.5-flash-lite',
          },
        ];
      }
      if (prev.length === 1 && prev[0].id === 'welcome-gemini') {
        return [
          {
            ...prev[0],
            text: welcomeContent,
          },
        ];
      }
      return prev;
    });
  }, [language]);

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
    if (isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (messages.length > 0) {
      latestMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    setBotState('thinking');

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
      const replyText = data.reply || 'Guidance received.';
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || 'gemini-2.5-flash-lite',
      };
      setMessages((prev) => [...prev, botMsg]);

      // Determine animation: Pointing (Directing / Forms / Buttons / Side panel) vs Answering (Thought bubble & lightbulb)
      const lower = replyText.toLowerCase();
      const hasActionOrForm =
        lower.includes('form') ||
        lower.includes('button') ||
        lower.includes('apply online') ||
        lower.includes('upload') ||
        lower.includes('click') ||
        lower.includes('side panel') ||
        lower.includes('check a link') ||
        lower.includes('draft') ||
        lower.includes('resizer') ||
        lower.includes('portal');

      setBotState(hasActionOrForm ? 'pointing' : 'answering');
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
      setBotState('idle');
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
      setBotState('greeting');
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

        {/* Action chips for next steps when assistant finishes a turn - only workflow progression buttons */}
        {isBot && (
          <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-200/60 dark:border-slate-700/60 mt-3">
            <button
              onClick={() =>
                handleSend(
                  language === 'hi'
                    ? 'हाँ, मेरे पास ये दस्तावेज़ तैयार हैं। स्टेप 1 बताएं।'
                    : language === 'en'
                    ? 'Yes, my documents are ready. Please guide me through Step 1.'
                    : 'Haan, mere paas ye documents hain aur ready hain. Step 1 batayein.'
                )
              }
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition shadow-2xs flex items-center gap-1.5"
            >
              <span>{UI_TRANSLATIONS.chat.btnDocumentsReady[language]}</span>
            </button>
            <button
              onClick={() =>
                handleSend(
                  language === 'hi'
                    ? 'मैंने यह स्टेप पूरा कर लिया है! अगला स्टेप बताएं।'
                    : language === 'en'
                    ? 'I have completed this step! Please explain the next step.'
                    : 'Maine ye step pura kar liya hai! Agla step batayein.'
                )
              }
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600 transition shadow-2xs flex items-center gap-1.5"
            >
              <span>{UI_TRANSLATIONS.chat.btnStepComplete[language]}</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden w-full min-h-[580px] lg:min-h-[660px]">
      {/* CARD TOP BAR */}
      <div className="px-5 py-3.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Digital Sahayak</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">
            {UI_TRANSLATIONS.chat.groundedNotice[language]}
          </span>
        </div>
        <button
          type="button"
          onClick={handleResetChat}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
          title="Start new conversation"
        >
          <img src={getAppIcon('refresh', theme)} alt="Refresh" className="w-3.5 h-3.5 object-contain" />
          <span>{UI_TRANSLATIONS.chat.newChat[language]}</span>
        </button>
      </div>

      {/* SCAM SHIELD ACTIVE ALERT */}
      <div className="mx-4 sm:mx-6 mt-2 mb-1 p-2.5 sm:p-3 rounded-xl bg-[#fdf2f1] dark:bg-rose-950/30 border border-rose-200/90 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 p-0.5 flex items-center justify-center shrink-0">
            <img
              src={getAppIcon('shield', theme)}
              alt="Shield"
              className="w-full h-full object-contain"
            />
          </span>
          <p className="text-slate-700 dark:text-slate-300">
            {UI_TRANSLATIONS.chat.scamNotice[language]}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenScamShield?.()}
          className="px-3.5 py-1.5 rounded-lg bg-[#c04337] hover:bg-[#ad3a2f] text-white font-medium text-xs shrink-0 transition shadow-xs active:scale-95 text-center whitespace-nowrap"
        >
          {UI_TRANSLATIONS.chat.checkLink[language]}
        </button>
      </div>

      {/* VERIFIED TASKS WRAPPING ROW WITH EXPAND/COLLAPSE */}
      <div className="px-3 sm:px-5 lg:px-6 pt-1.5 pb-1">
        <div
          className={`flex items-center gap-1 sm:gap-1.5 lg:gap-2 ${
            isTasksExpanded ? 'flex-wrap' : 'flex-nowrap w-full'
          }`}
        >
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider shrink-0 mr-0.5 uppercase whitespace-nowrap">
            {UI_TRANSLATIONS.chat.verifiedTasks[language]}
          </span>

          {(isTasksExpanded ? SUPPORTED_TASKS : SUPPORTED_TASKS.slice(0, 4)).map((task) => {
            const localizedTitle = PROCEDURE_TRANSLATIONS[task.id]?.[language]?.title || task.title;
            const localizedLevel =
              language === 'hi'
                ? task.level === 'Easy'
                  ? 'सरल'
                  : task.level === 'Medium'
                  ? 'मध्यम'
                  : 'कठिन'
                : task.level;

            return (
              <button
                key={task.id}
                type="button"
                onClick={() => {
                  onSelectProcedure?.(task.id);
                  handleSend(task.prompt);
                }}
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition active:scale-95 shadow-2xs whitespace-nowrap ${
                  isTasksExpanded ? 'shrink-0' : 'flex-1 min-w-0 justify-center'
                }`}
              >
                <img
                  src={getProcedureIcon(task.id, theme)}
                  alt=""
                  className="w-3.5 h-3.5 shrink-0 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="truncate">{localizedTitle}</span>
                <span
                  className={`text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none shrink-0 ${task.levelColor} ${
                    isTasksExpanded ? 'inline-block' : 'hidden md:inline-block'
                  }`}
                >
                  {localizedLevel}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setIsTasksExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-semibold shrink-0 transition whitespace-nowrap"
          >
            <span>{isTasksExpanded ? (language === 'hi' ? 'कम देखें' : 'Show less') : (language === 'hi' ? 'और देखें' : 'Show more')}</span>
            <span>{isTasksExpanded ? '⌃' : '⌄'}</span>
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 my-1"></div>

      {/* CHAT MESSAGES SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 bg-slate-50/40 dark:bg-slate-950/30 min-h-[380px] lg:min-h-[460px]">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          const isLatestBotMessage =
            !isUser &&
            (index === messages.length - 1 ||
              (index === messages.length - 2 && messages[messages.length - 1].sender === 'user'));

          if (isUser) {
            return (
              <div
                key={msg.id}
                ref={index === messages.length - 1 ? latestMessageRef : undefined}
                className="flex flex-row items-start justify-end gap-3 sm:gap-4 w-full max-w-4xl mx-auto"
              >
                <div className="flex flex-col items-end max-w-[85%] sm:max-w-[75%] min-w-0">
                  <div className="p-4 rounded-2xl bg-blue-600 text-white rounded-tr-none border border-blue-500 shadow-2xs">
                    {renderMessageContent(msg)}
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{msg.time}</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-xs shrink-0 mt-0.5 border border-slate-300 dark:border-slate-600">
                  You
                </div>
              </div>
            );
          }

          // Assistant / Bot message - strictly horizontal flex layout (side-by-side, top-aligned)
          const activeStateForThisMsg = isLatestBotMessage ? (isLoading ? 'idle' : botState) : 'idle';
          const statusText =
            index === 0 && activeStateForThisMsg === 'idle'
              ? language === 'hi'
                ? 'नमस्ते!'
                : 'Namaste!'
              : activeStateForThisMsg === 'greeting'
              ? language === 'hi'
                ? 'नमस्ते!'
                : 'Namaste!'
              : activeStateForThisMsg === 'thinking'
              ? language === 'hi'
                ? 'सोच रहे हैं...'
                : 'Thinking...'
              : activeStateForThisMsg === 'answering'
              ? language === 'hi'
                ? 'उत्तर दे रहे हैं...'
                : 'Answering...'
              : activeStateForThisMsg === 'pointing'
              ? language === 'hi'
                ? 'मार्गदर्शन...'
                : 'Guiding...'
              : language === 'hi'
              ? 'नमस्ते!'
              : 'Namaste!';

          return (
            <div
              key={msg.id}
              ref={index === messages.length - 1 ? latestMessageRef : undefined}
              className="flex flex-row items-start gap-4 sm:gap-5 w-full max-w-4xl mx-auto"
            >
              {/* Character Animation Wrapper (Fixed Size - Enlarged 150%, Left-aligned, Top-aligned) */}
              <div className="flex-shrink-0 flex flex-col items-center w-28 sm:w-36">
                <div className="w-[96px] h-[120px] sm:w-[120px] sm:h-[144px] flex items-center justify-center overflow-hidden">
                  <AvatarAnimator
                    botState={activeStateForThisMsg}
                    className="w-full h-full"
                    onAnimationComplete={() => {
                      if (isLatestBotMessage) {
                        setBotState('idle');
                      }
                    }}
                  />
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-2xs whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{statusText}</span>
                </div>
              </div>

              {/* Message Bubble Column */}
              <div className="flex-1 max-w-[85%] sm:max-w-[80%] flex flex-col items-start min-w-0">
                <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#f0f4f9] dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
                  {renderMessageContent(msg)}
                </div>

                <div className="flex items-center gap-2 mt-1.5 px-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{msg.time}</span>
                  {msg.modelUsed && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                        {msg.modelUsed}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Spinner Row with Thinking Character (Enlarged 150%) */}
        {isLoading && (
          <div className="flex flex-row items-start gap-4 sm:gap-5 w-full max-w-4xl mx-auto">
            <div className="flex-shrink-0 flex flex-col items-center w-28 sm:w-36">
              <div className="w-[96px] h-[120px] sm:w-[120px] sm:h-[144px] flex items-center justify-center overflow-hidden">
                <AvatarAnimator botState="thinking" className="w-full h-full" />
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 text-[11px] font-medium text-amber-700 dark:text-amber-300 shadow-2xs whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                <span>Thinking...</span>
              </div>
            </div>

            <div className="flex-1 max-w-[85%] sm:max-w-[80%] flex flex-col items-start min-w-0">
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#f0f4f9] dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 shadow-2xs flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Consulting Gemini 2.5 Flash Light & Verified Government Guides...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* CHAT INPUT AND ACTION CONTROLS AREA */}
      <div className="p-3.5 sm:p-4 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Quick Action Pills Row (KB Resizer, Error Screenshot AI, Draft Sahayak AI, Scam Shield) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenResizer?.()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition shadow-2xs"
            >
              <img src={getAppIcon('resize', theme)} alt="KB Resizer" className="w-3.5 h-3.5 object-contain" />
              <span>{UI_TRANSLATIONS.chat.pills.resizer[language]}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition shadow-2xs"
            >
              <img src={getAppIcon('camera', theme)} alt="Error screenshot" className="w-3.5 h-3.5 object-contain" />
              <span>{UI_TRANSLATIONS.chat.pills.screenshot[language]}</span>
              <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">AI</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenDraftGenerator?.()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition shadow-2xs"
            >
              <img src={getAppIcon('draft', theme)} alt="Draft" className="w-3.5 h-3.5 object-contain" />
              <span>{UI_TRANSLATIONS.chat.pills.draft[language]}</span>
              <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">AI</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenScamShield?.()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition shadow-2xs"
            >
              <img src={getAppIcon('shield', theme)} alt="Scam Shield" className="w-3.5 h-3.5 object-contain" />
              <span>{UI_TRANSLATIONS.chat.pills.shield[language]}</span>
            </button>
          </div>

          {/* Image preview badge if attached */}
          {attachedImage && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs">
              <div className="flex items-center gap-2">
                <img src={getAppIcon('camera', theme)} alt="Attached" className="w-4 h-4 object-contain" />
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
          <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all p-1.5 shadow-2xs">
            {/* Hidden File Input for Screenshot Sahayak */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Attach Screenshot / File Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition shrink-0 flex items-center justify-center"
              title="Attach screenshot or error image"
            >
              <img
                src={getAppIcon('attach', theme)}
                alt="Attach"
                className="w-5 h-5 object-contain"
              />
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
              placeholder={UI_TRANSLATIONS.chat.inputPlaceholder[language]}
              className="flex-1 bg-transparent border-0 outline-none resize-none px-3 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 min-h-[38px] max-h-32"
            />

            {/* Voice Input Mic Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2 rounded-xl transition shrink-0 flex items-center justify-center ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-blue-600'
              }`}
              title="Voice Search (Hindi / English)"
            >
              <img
                src={getAppIcon('mic', isListening ? 'dark' : theme)}
                alt="Voice"
                className="w-5 h-5 object-contain"
              />
            </button>

            {/* Send Button */}
            <button
              type="button"
              disabled={isLoading || (!input.trim() && !attachedImage)}
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-xl bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition shrink-0 shadow-xs flex items-center justify-center ml-1"
              title="Send message"
            >
              <img
                src={getAppIcon('send', 'dark')}
                alt="Send"
                className="w-4 h-4 object-contain brightness-0 invert"
              />
            </button>
          </div>

          {/* Subtext Grounding Guarantee */}
          <div className="flex items-center justify-between px-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <span>{UI_TRANSLATIONS.chat.zeroCommission[language]}</span>
            <span>{UI_TRANSLATIONS.chat.pressEnter[language]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
