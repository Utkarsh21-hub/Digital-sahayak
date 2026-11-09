import React, { useState } from 'react';
import { getAppIcon } from '../utils/appIcons';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: 'all' | 'easy' | 'medium' | 'hard';
  onCategoryChange: (cat: 'all' | 'easy' | 'medium' | 'hard') => void;
  counts: { all: number; easy: number; medium: number; hard: number };
  theme?: 'light' | 'dark';
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  counts,
  theme = 'light',
}) => {
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query directly.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center justify-between">
        {/* Search Input with Provided Speech Icon & Mic Button */}
        <div className="relative w-full lg:flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <img
              src={getAppIcon('ai-chat', theme)}
              alt=""
              className="w-4 h-4 object-contain opacity-70"
            />
          </div>
          <input
            className="w-full min-h-[44px] pl-10 pr-24 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none shadow-2xs"
            placeholder="Search a procedure or grievance, e.g. Driving Licence, NEET, Aadhaar"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            onClick={startVoiceSearch}
            className={`absolute inset-y-1.5 right-1.5 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              isListening
                ? 'bg-red-100 text-red-700 animate-pulse border border-red-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Voice Search (Bol kar)"
            type="button"
          >
            <img
              src={getAppIcon('mic', theme)}
              alt=""
              className="w-3.5 h-3.5 object-contain"
            />
            <span>{isListening ? 'Sun rahe...' : 'Bol kar'}</span>
          </button>
        </div>

        {/* Category Filter Pills Matching Screenshot */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0" role="tablist">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 font-medium'
            }`}
            type="button"
          >
            All {counts.all}
          </button>
          <button
            onClick={() => onCategoryChange('easy')}
            className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === 'easy'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 font-medium'
            }`}
            type="button"
          >
            Easy • online {counts.easy}
          </button>
          <button
            onClick={() => onCategoryChange('medium')}
            className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === 'medium'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 font-medium'
            }`}
            type="button"
          >
            Medium • multi-step {counts.medium}
          </button>
          <button
            onClick={() => onCategoryChange('hard')}
            className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === 'hard'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 font-medium'
            }`}
            type="button"
          >
            Hard • grievance {counts.hard}
          </button>
        </div>
      </div>
    </section>
  );
};
