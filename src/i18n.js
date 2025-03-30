import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arTranslation from './translations/ar.json';

// the translations
const resources = {
  ar: {
    translation: arTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language is Arabic
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
