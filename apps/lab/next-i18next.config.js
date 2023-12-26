import path from 'path'

const isDev = process.env.NODE_ENV !== 'production'
const debugI18n = ['true', 1].includes(
    process?.env?.NEXTJS_DEBUG_I18N ?? 'false'
);

const localePublicFolder = undefined;
export const defaultLocale = 'en';

/**
 * @type {import('next-i18next').UserConfig}
 */
export default {
    // https://www.i18next.com/overview/configuration-options#logging
    i18n: {
        defaultLocale: 'zh',
        locales: [
            'zh', // 中文
            'en', // 英文
            // 'ja', // 日文
            // 'ru', // 俄文
        ],
    },
    saveMissing: false,
    strictMode: true,
    serializeConfig: false,
    reloadOnPrerender: process?.env?.NODE_ENV === 'development',
    react: { useSuspense: false },
    debug: debugI18n,
    /*
    interpolation: {
      escapeValue: false,
    },
    */
    /** To avoid issues when deploying to some paas (vercel...) */
    localePath:
        typeof window === 'undefined'
            ? path.resolve('./public/locales')
            : localePublicFolder,


    /**
     * @link https://github.com/i18next/next-i18next#6-advanced-configuration
     */


    // fallbackLng: {
    //   default: ['zh'],
    //   en: ['zh']
    // },
    // de, fr and en will be loaded as fallback languages for de-CH
    // nonExplicitSupportedLngs: true,
    // defaultNS: 'common',
    // localeExtension: 'json',
    // interpolation: {
    //   prefix: '{{',
    //   suffix: '}}',
    // },
    // localeStructure: '{{lng}}/{{ns}}',
    // https://github.com/i18next/next-i18next#unserialisable-configs
    // serializeConfig: false,
    // use: [],

    // https://www.i18next.com/overview/configuration-options
    // https://react.i18next.com/latest/i18next-instance
    // ns: [
    //   'common',
    //   // 'modals', 'landing', 'dashboard', 'builder'
    // ],
    // keySeparator: 'false',
    // namespaceSeparator: false,
    // // pluralSeparator: '——',
    // // contextSeparator: '——',
    // react: {
    //   useSuspense: false,
    // },
    // nsSeparator: '.',
};
