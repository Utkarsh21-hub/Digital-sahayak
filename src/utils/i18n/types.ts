export type Language =
  | 'en'
  | 'hi'
  | 'hinglish'
  | 'bn'
  | 'mr'
  | 'te'
  | 'ta'
  | 'gu'
  | 'kn';

export interface LanguageMeta {
  code: Language;
  nativeName: string;
  englishName: string;
  shortLabel: string;
  htmlLang: string;
  speechLocale: string;
  scriptName: string;
}

export const FALLBACK_LANGUAGE: Language = 'en';
export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_STORAGE_KEY = 'digital-sahayak-language';

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    shortLabel: 'English',
    htmlLang: 'en',
    speechLocale: 'en-IN',
    scriptName: 'Latin',
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    shortLabel: 'हिन्दी',
    htmlLang: 'hi',
    speechLocale: 'hi-IN',
    scriptName: 'Devanagari',
  },
  {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    shortLabel: 'বাংলা',
    htmlLang: 'bn',
    speechLocale: 'bn-IN',
    scriptName: 'Bengali',
  },
  {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    shortLabel: 'मराठी',
    htmlLang: 'mr',
    speechLocale: 'mr-IN',
    scriptName: 'Devanagari',
  },
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    shortLabel: 'తెలుగు',
    htmlLang: 'te',
    speechLocale: 'te-IN',
    scriptName: 'Telugu',
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    shortLabel: 'தமிழ்',
    htmlLang: 'ta',
    speechLocale: 'ta-IN',
    scriptName: 'Tamil',
  },
  {
    code: 'gu',
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati',
    shortLabel: 'ગુજરાતી',
    htmlLang: 'gu',
    speechLocale: 'gu-IN',
    scriptName: 'Gujarati',
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    shortLabel: 'ಕನ್ನಡ',
    htmlLang: 'kn',
    speechLocale: 'kn-IN',
    scriptName: 'Kannada',
  },
  {
    code: 'hinglish',
    nativeName: 'Hinglish',
    englishName: 'Hinglish (Conversational)',
    shortLabel: 'Hinglish',
    htmlLang: 'hi-Latn',
    speechLocale: 'hi-IN',
    scriptName: 'Latin',
  },
];

export const VALID_LANGUAGE_CODES: readonly Language[] = SUPPORTED_LANGUAGES.map((l) => l.code);

export function isValidLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (VALID_LANGUAGE_CODES as readonly string[]).includes(value);
}

export function getLanguageMeta(lang: Language): LanguageMeta {
  return (
    SUPPORTED_LANGUAGES.find((item) => item.code === lang) ||
    SUPPORTED_LANGUAGES[0]
  );
}

export function getSpeechLocale(lang: Language): string {
  return getLanguageMeta(lang).speechLocale;
}

export function getSavedLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isValidLanguage(saved)) return saved;
  } catch {
    // Ignore storage read errors in restricted iframes
  }
  return DEFAULT_LANGUAGE;
}

export function saveLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Ignore storage write errors
  }
}

export type LocalizedString = Record<Language, string>;

/**
 * Safely resolves a translated string with English ('en') as fallback.
 */
export function t(
  entry: Partial<Record<Language, string>> | undefined | null,
  lang: Language
): string {
  if (!entry) return '';
  const value = entry[lang];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  const fallback = entry[FALLBACK_LANGUAGE];
  if (typeof fallback === 'string' && fallback.trim().length > 0) {
    return fallback;
  }
  const firstAvailable = Object.values(entry).find(
    (v) => typeof v === 'string' && v.trim().length > 0
  );
  return firstAvailable || '';
}
