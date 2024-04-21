import { UserLanguageCode, PromptLanguageCode } from '@prisma/client'

interface UserLanguageType {
  code: UserLanguageCode
  name: string
  rawName: string
  code639: string
}

interface PromptLanguageType {
  code: PromptLanguageCode
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
  // Comment temp, keep "all" enum in database. when we remove migrate "all" into "en", then can been delete
  // {
  //   code: UserLanguageCode.all,
  //   name: 'All Languages',
  //   rawName: 'All Languages',
  //   code639: 'all',
  // },
] as UserLanguageType[]

export const promptLanguages = [
  {
    code: PromptLanguageCode.en,
    name: 'English',
    rawName: 'English',
    code639: 'eng',
  },
  {
    code: PromptLanguageCode.zh,
    name: '中文 (Chinese)',
    rawName: 'Chinese',
    code639: 'cmn',
  },
  {
    code: PromptLanguageCode.es,
    name: 'Español (Spanish)',
    rawName: 'Spanish',
    code639: 'spa',
  },
  {
    code: PromptLanguageCode.hi,
    name: 'हिन्दी (Hindi)',
    rawName: 'Hindi',
    code639: 'hin',
  },
  {
    code: PromptLanguageCode.ar,
    name: 'العربية (Arabic)',
    rawName: 'Arabic',
    code639: 'arb',
  },
  {
    code: PromptLanguageCode.pt,
    name: 'Português (Portuguese)',
    rawName: 'Portuguese',
    code639: 'por',
  },
  {
    code: PromptLanguageCode.bn,
    name: 'বাংলা (Bengali)',
    rawName: 'Bengali',
    code639: 'ben',
  },
  {
    code: PromptLanguageCode.ru,
    name: 'Русский (Russian)',
    rawName: 'Russian',
    code639: 'rus',
  },
  {
    code: PromptLanguageCode.ja,
    name: '日本語 (Japanese)',
    rawName: 'Japanese',
    code639: 'jpn',
  },
  {
    code: PromptLanguageCode.de,
    name: 'Deutsch (German)',
    rawName: 'German',
    code639: 'deu',
  },
  {
    code: PromptLanguageCode.vi,
    name: 'Tiếng Việt (Vietnamese)',
    rawName: 'Vietnamese',
    code639: 'vie',
  },
  {
    code: PromptLanguageCode.ko,
    name: '한국어 (Korean)',
    rawName: 'Korean',
    code639: 'kor',
  },
  {
    code: PromptLanguageCode.fr,
    name: 'Français (French)',
    rawName: 'French',
    code639: 'fra',
  },
  {
    code: PromptLanguageCode.tr,
    name: 'Türkçe (Turkish)',
    rawName: 'Turkish',
    code639: 'tur',
  },
  {
    code: PromptLanguageCode.it,
    name: 'Italiano (Italian)',
    rawName: 'Italian',
    code639: 'ita',
  },
  {
    code: PromptLanguageCode.th,
    name: 'ไทย (Thai)',
    rawName: 'Thai',
    code639: 'tha',
  },
  {
    code: PromptLanguageCode.pl,
    name: 'Polski (Polish)',
    rawName: 'Polish',
    code639: 'pol',
  },
  {
    code: PromptLanguageCode.ro,
    name: 'Română (Romanian)',
    rawName: 'Romanian',
    code639: 'ron',
  },
  {
    code: PromptLanguageCode.nl,
    name: 'Nederlands (Dutch)',
    rawName: 'Dutch',
    code639: 'nld',
  },
  {
    code: PromptLanguageCode.hu,
    name: 'Magyar (Hungarian)',
    rawName: 'Hungarian',
    code639: 'hun',
  },
  {
    code: PromptLanguageCode.cs,
    name: 'Čeština (Czech)',
    rawName: 'Czech',
    code639: 'ces',
  },
  {
    code: PromptLanguageCode.el,
    name: 'Ελληνικά (Greek)',
    rawName: 'Greek',
    code639: 'ell',
  },
  {
    code: PromptLanguageCode.sv,
    name: 'Svenska (Swedish)',
    rawName: 'Swedish',
    code639: 'swe',
  },
  {
    code: PromptLanguageCode.th,
    name: 'ไทย (Thai)',
    rawName: 'Thai',
    code639: 'tha',
  },
  {
    code: PromptLanguageCode.undefined,
    name: 'Other',
    rawName: 'Other',
    code639: 'und',
  },
] as PromptLanguageType[]
