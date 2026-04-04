import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import kkTranslations from '../public/locales/kk/common.json';
import ruTranslations from '../public/locales/ru/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kk: { common: kkTranslations },
      ru: { common: ruTranslations }
    },
    lng: "kk", // Default language requirement
    fallbackLng: "ru",
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
