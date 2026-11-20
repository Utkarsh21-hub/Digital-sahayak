import test from 'node:test';
import assert from 'node:assert/strict';
import { PROCEDURES_DATA } from '../procedures';
import {
  SUPPORTED_LANGUAGES,
  VALID_LANGUAGE_CODES,
  UI_TRANSLATIONS,
  PROCEDURE_TRANSLATIONS,
  PROCEDURE_TAG_TRANSLATIONS,
  getLocalizedProcedure,
  getSpeechLocale,
  isValidLanguage,
  t,
  Language,
} from '../translations';

const REQUIRED_EIGHT_LANGUAGES: Language[] = [
  'en',
  'hi',
  'bn',
  'mr',
  'te',
  'ta',
  'gu',
  'kn',
];

test('supports all 8 required Indian & English languages plus Hinglish with native scripts', () => {
  for (const code of REQUIRED_EIGHT_LANGUAGES) {
    assert.ok(isValidLanguage(code), `Missing required language code: ${code}`);
    const meta = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    assert.ok(meta, `Missing LanguageMeta for ${code}`);
    assert.ok(meta.nativeName.trim().length > 0, `Missing nativeName for ${code}`);
    assert.ok(getSpeechLocale(code).endsWith('-IN'), `Expected -IN locale for ${code}`);
  }
  assert.ok(isValidLanguage('hinglish'), 'Hinglish should remain preserved');
  assert.equal(isValidLanguage('xx'), false);
});

test('every UI translation entry has non-empty values for all supported languages', () => {
  for (const [sectionName, section] of Object.entries(UI_TRANSLATIONS)) {
    for (const [key, entry] of Object.entries(section)) {
      for (const lang of VALID_LANGUAGE_CODES) {
        const val = (entry as Record<string, string>)[lang];
        assert.equal(
          typeof val,
          'string',
          `Missing UI translation string at ${sectionName}.${key}.${lang}`
        );
        assert.ok(
          val.trim().length > 0,
          `Empty UI translation string at ${sectionName}.${key}.${lang}`
        );
      }
    }
  }
});

test('every procedure in PROCEDURES_DATA has complete translations in all supported languages', () => {
  for (const proc of PROCEDURES_DATA) {
    const entry = PROCEDURE_TRANSLATIONS[proc.id];
    assert.ok(entry, `Missing PROCEDURE_TRANSLATIONS entry for ${proc.id}`);
    for (const lang of VALID_LANGUAGE_CODES) {
      const localized = getLocalizedProcedure(proc, lang);
      assert.ok(localized.title.trim().length > 0, `Empty title for ${proc.id} (${lang})`);
      assert.ok(localized.subtitle.trim().length > 0, `Empty subtitle for ${proc.id} (${lang})`);
      assert.ok(localized.fraudWarning.trim().length > 0, `Empty fraudWarning for ${proc.id} (${lang})`);
      assert.ok(localized.tag.trim().length > 0, `Empty tag for ${proc.id} (${lang})`);
    }
  }
});

test('t() falls back gracefully to English when a regional translation is missing', () => {
  const partial = { en: 'Fallback English Label', hi: '' };
  assert.equal(t(partial, 'bn'), 'Fallback English Label');
  assert.equal(t(partial, 'hi'), 'Fallback English Label');
  assert.equal(t(undefined, 'ta'), '');
});

test('procedure tag translations cover all tag types across all languages', () => {
  for (const tagType of ['easy', 'medium', 'hard', 'free'] as const) {
    for (const lang of VALID_LANGUAGE_CODES) {
      assert.ok(t(PROCEDURE_TAG_TRANSLATIONS[tagType], lang).length > 0);
    }
  }
});
