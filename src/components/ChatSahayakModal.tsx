import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

interface ChatSahayakModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTaskTitle: string;
  language: 'hinglish' | 'hi' | 'en';
}

const QUICK_QUESTIONS = [
  'Driving licence bina RTO visit ke renew kaise karein?',
  'NEET photo me 80% face visible hona kyun zaroori hai?',
  'CPGRAMS par complaint solve hone me kitne din lagte hain?',
  'Cyber cafe tout agar extra paise maange to kya karein?',
  'Aadhaar mobile update online kyun nahi hota?',
];

export const ChatSahayakModal: React.FC<ChatSahayakModalProps> = ({
  isOpen,
  onClose,
  currentTaskTitle,
  language,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Namaste! Main hoon aapka Digital Sahayak (डिजिटल सहायक). 🇮🇳\n\nAapko kisi bhi sarkari portal (.gov.in / .nic.in), entrance exam, certificate, ya grievance me koi bhi pareshani ho, bina kisi cyber cafe agent ko paise diye mujhse pooch sakte hain.\n\n⚠️ Yaad rakhein: Kabhi bhi kisi ke saath apna OTP, Password ya Aadhaar OTP share mat karein!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
          context: { currentTask: currentTaskTitle },
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Chat API returned an error');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: data.reply || 'Digital Sahayak response received.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: 'Maaf kijiye, temporary network issue aayi. Please dobara poochhein ya direct helpline 1947 par call karein.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl" data-icon="smart_toy">
                smart_toy
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Digital Sahayak Chat</h3>
                <span className="bg-tertiary-fixed text-tertiary-container px-2 py-0.5 rounded-full text-[10px] font-bold">
                  Zero Agent Fee
                </span>
              </div>
              <p className="text-caption font-caption text-on-surface-variant">
                Active Context: <span className="text-secondary font-semibold">{currentTaskTitle}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined" data-icon="close">
              close
            </span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-low">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-body-md ${
                  m.sender === 'user'
                    ? 'bg-secondary text-on-secondary rounded-br-sm'
                    : 'bg-surface-container-lowest text-on-surface border border-outline-variant rounded-bl-sm'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{m.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    m.sender === 'user' ? 'text-on-secondary/70' : 'text-on-surface-variant'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant max-w-[200px]">
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:0.4s]" />
              <span className="text-label-sm text-on-surface-variant font-medium">Sahayak soch raha hai...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 border-t border-outline-variant bg-surface-container-lowest overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] font-bold text-on-surface-variant whitespace-nowrap">Aksar Poochhe Jaane Wale:</span>
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-label-sm font-label-sm bg-surface-container-low hover:bg-surface-container text-secondary border border-outline-variant px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer"
              type="button"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-outline-variant bg-surface-container-lowest flex items-center gap-2">
          <input
            type="text"
            className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
            placeholder="Apna sawaal type karein (e.g. Parivahan payment fail ho gayi, kya karu?)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="bg-secondary hover:bg-secondary-container text-on-secondary px-5 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer min-h-[44px]"
            type="button"
          >
            <span>Bhejein</span>
            <span className="material-symbols-outlined text-lg" data-icon="send">
              send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
