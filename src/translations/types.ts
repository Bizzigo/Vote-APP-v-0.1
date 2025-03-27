
export type Language = 'en' | 'lv';
export type TranslationValue = Record<Language, string>;
export type TranslationCategory = Record<string, TranslationValue>;
export type Translations = Record<string, TranslationValue>;
