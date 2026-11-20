export {
  type Language,
  type LanguageMeta,
  type LocalizedString,
  FALLBACK_LANGUAGE,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  VALID_LANGUAGE_CODES,
  isValidLanguage,
  getLanguageMeta,
  getSpeechLocale,
  getSavedLanguage,
  saveLanguage,
  t,
} from './i18n/types';

import { UI_CORE_TRANSLATIONS } from './i18n/uiCore';
import { UI_INTERACTIVE_TRANSLATIONS } from './i18n/uiInteractive';
import { UI_OFFICER_TRANSLATIONS } from './i18n/uiOfficers';

export {
  PROCEDURE_TRANSLATIONS,
  PROCEDURE_TAG_TRANSLATIONS,
  getLocalizedProcedure,
  type ProcedureTextEntry,
} from './i18n/procedureTranslations';

export const UI_TRANSLATIONS = {
  ...UI_CORE_TRANSLATIONS,
  ...UI_INTERACTIVE_TRANSLATIONS,
  officers: UI_OFFICER_TRANSLATIONS,
} as const;
