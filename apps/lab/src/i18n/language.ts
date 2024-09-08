import { UserLanguageCode } from '@prisma/client'

interface UserLanguageType {
  code: UserLanguageCode
  name: string
  rawName: string
  code639: string
}

/**
 * you can get code639 from https://www.npmjs.com/package/franc-min
 */
export const popularUserLanguages = [
  {
    code: UserLanguageCode.en,
    name: 'English',
    rawName: 'English',
    code639: 'eng',
  },
  {
    code: UserLanguageCode.zh,
    name: '中文 (Chinese)',
    rawName: 'Chinese',
    code639: 'cmn',
  },
  {
    code: UserLanguageCode.de,
    name: 'Deutsch (German)',
    rawName: 'German',
    code639: 'deu',
  },
  {
    code: UserLanguageCode.es,
    name: 'Español (Spanish)',
    rawName: 'Spanish',
    code639: 'spa',
  },
  {
    code: UserLanguageCode.fr,
    name: 'Français (French)',
    rawName: 'French',
    code639: 'fra',
  },
  {
    code: UserLanguageCode.ja,
    name: '日本語 (Japanese)',
    rawName: 'Japanese',
    code639: 'jpn',
  },
  {
    code: UserLanguageCode.pt,
    name: 'Português (Portuguese)',
    rawName: 'Portuguese',
    code639: 'por',
  },
  {
    code: UserLanguageCode.ru,
    name: 'Русский (Russian)',
    rawName: 'Russian',
    code639: 'rus',
  },
  {
    code: UserLanguageCode.hi,
    name: 'हिन्दी (Hindi)',
    rawName: 'Hindi',
    code639: 'hin',
  },
  {
    code: UserLanguageCode.ar,
    name: 'العربية (Arabic)',
    rawName: 'Arabic',
    code639: 'arb',
  },
  {
    code: UserLanguageCode.bn,
    name: 'বাংলা (Bengali)',
    rawName: 'Bengali',
    code639: 'ben',
  },
  {
    code: UserLanguageCode.vi,
    name: 'Tiếng Việt (Vietnamese)',
    rawName: 'Vietnamese',
    code639: 'vie',
  },
  {
    code: UserLanguageCode.ko,
    name: '한국어 (Korean)',
    rawName: 'Korean',
    code639: 'kor',
  },
  {
    code: UserLanguageCode.tr,
    name: 'Türkçe (Turkish)',
    rawName: 'Turkish',
    code639: 'tur',
  },
  {
    code: UserLanguageCode.it,
    name: 'Italiano (Italian)',
    rawName: 'Italian',
    code639: 'ita',
  },
  {
    code: UserLanguageCode.th,
    name: 'ไทย (Thai)',
    rawName: 'Thai',
    code639: 'tha',
  },
  {
    code: UserLanguageCode.pl,
    name: 'Polski (Polish)',
    rawName: 'Polish',
    code639: 'pol',
  },
  {
    code: UserLanguageCode.ro,
    name: 'Română (Romanian)',
    rawName: 'Romanian',
    code639: 'ron',
  },
  {
    code: UserLanguageCode.nl,
    name: 'Nederlands (Dutch)',
    rawName: 'Dutch',
    code639: 'nld',
  },
  {
    code: UserLanguageCode.hu,
    name: 'Magyar (Hungarian)',
    rawName: 'Hungarian',
    code639: 'hun',
  },
  {
    code: UserLanguageCode.cs,
    name: 'Čeština (Czech)',
    rawName: 'Czech',
    code639: 'ces',
  },
  {
    code: UserLanguageCode.el,
    name: 'Ελληνικά (Greek)',
    rawName: 'Greek',
    code639: 'ell',
  },
  {
    code: UserLanguageCode.sv,
    name: 'Svenska (Swedish)',
    rawName: 'Swedish',
    code639: 'swe',
  },
  {
    code: UserLanguageCode.id,
    name: 'Bahasa Indonesia (Indonesian)',
    rawName: 'Indonesian',
    code639: 'ind',
  },
  {
    code: UserLanguageCode.ms,
    name: 'Bahasa Melayu (Malay)',
    rawName: 'Malay',
    code639: 'msa',
  },
  {
    code: UserLanguageCode.bg,
    name: 'Български (Bulgarian)',
    rawName: 'Bulgarian',
    code639: 'bul',
  },
  {
    code: UserLanguageCode.fi,
    name: 'Suomen kieli (Finnish)',
    rawName: 'Finnish',
    code639: 'fin',
  },
  {
    code: UserLanguageCode.hr,
    name: 'Hrvatski (Croatian)',
    rawName: 'Croatian',
    code639: 'hrv',
  },
  {
    code: UserLanguageCode.lt,
    name: 'Lietuvių (Lithuanian)',
    rawName: 'Lithuanian',
    code639: 'lit',
  },
  {
    code: UserLanguageCode.uk,
    name: 'Українська (Ukrainian)',
    rawName: 'Ukrainian',
    code639: 'ukr',
  },
  // Comment temp, keep "all" enum in database. when we remove migrate "all" into "en", then can been delete
  // {
  //   code: UserLanguageCode.all,
  //   name: 'All Languages',
  //   rawName: 'All Languages',
  //   code639: 'all',
  // },
] as UserLanguageType[]
