import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from './translations/en';
import zhJSON from './translations/zh';

const resources = {
    en: { translation: enJSON },
    cn: { translation: zhJSON }
};

i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        keySeparator: false,
        lng: 'en',
        fallbackLng: 'en',
        react: {
            useSuspense: true
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
