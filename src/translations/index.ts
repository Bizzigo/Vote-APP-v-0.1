
import { Translations } from './types';
import { navbarTranslations } from './navbar';
import { homepageTranslations } from './homepage';
import { searchTranslations } from './search';
import { commonTranslations } from './common';
import { authTranslations } from './auth';

// Combine all translation categories into a single object
export const translations: Translations = {
  ...navbarTranslations,
  ...homepageTranslations,
  ...searchTranslations,
  ...commonTranslations,
  ...authTranslations
};

export * from './types';
