import React, { useState } from 'react';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: 'all' | 'easy' | 'medium' | 'hard';
  onCategoryChange: (cat: 'all' | 'easy' | 'medium' | 'hard') => void;
  counts: { all: number; easy: number; medium: number; hard: number };
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  counts,
}) => {
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    // Check for Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query directly.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Default to Hindi/Indian English
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Voice search error:', e);
      setIsListening(false);
    }
  };

  return (
    <section className="bg-surface py-4 px-4 md:px-8 border-b border-outline-variant">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search Input with Speech Icon */}
        <div className="relative w-full lg:w-3/5">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined" data-icon="search">
              search
            </span>
          </div>
          <input
            className="w-full min-h-[48px] pl-11 pr-24 py-2.5 bg-surface-container-lowest border-1.5 border-outline-variant rounded-xl text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
            placeholder="Bol kar khojein / Type procedure or grievance (e.g., Driving Licence, NEET, Aadhaar, CPGRAMS)..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            onClick={startVoiceSearch}
            className={`absolute inset-y-1.5 right-1.5 px-3 rounded-lg flex items-center gap-1 text-label-sm font-label-sm transition-colors ${
              isListening
                ? 'bg-red-100 text-error animate-pulse border border-error'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
            title="Voice Search (Hindi / Hinglish)"
            type="button"
          >
            <span
              className={`material-symbols-outlined ${isListening ? 'text-error' : 'text-secondary'}`}
              data-icon="mic"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mic
            </span>
            <span className="hidden sm:inline">{isListening ? 'Sun rahe hain...' : 'Bol kar'}</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0" role="tablist">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-2 rounded-full text-label-sm font-label-sm whitespace-nowrap active:scale-[0.98] transition-all cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant'
            }`}
            type="button"
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => onCategoryChange('easy')}
            className={`px-3 py-2 rounded-full text-label-sm font-label-sm whitespace-nowrap active:scale-[0.98] transition-all cursor-pointer ${
              categoryFilter === 'easy'
                ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant'
            }`}
            type="button"
          >
            Easy (Online) ({counts.easy})
          </button>
          <button
            onClick={() => onCategoryChange('medium')}
            className={`px-3 py-2 rounded-full text-label-sm font-label-sm whitespace-nowrap active:scale-[0.98] transition-all cursor-pointer ${
              categoryFilter === 'medium'
                ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant'
            }`}
            type="button"
          >
            Medium (Multi-Step) ({counts.medium})
          </button>
          <button
            onClick={() => onCategoryChange('hard')}
            className={`px-3 py-2 rounded-full text-label-sm font-label-sm whitespace-nowrap active:scale-[0.98] transition-all cursor-pointer ${
              categoryFilter === 'hard'
                ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant'
            }`}
            type="button"
          >
            Hard (Grievance/Complex) ({counts.hard})
          </button>
        </div>
      </div>
    </section>
  );
};
