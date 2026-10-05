/**
 * 与服务端数据库枚举保持一致的前端枚举定义。
 *
 * 这些枚举原先从 @prisma/client / @tongdelove/prisma 引入，属于数据库 schema 的产物。
 * lab 改为前后端分离、不再直连数据库后，枚举在前端独立定义，
 * 取值与 services/server 的 drizzle schema 保持一致。
 */

/** UserLanguageCode */
export enum UserLanguageCode {
  en = 'en',
  zh = 'zh',
  de = 'de',
  es = 'es',
  fr = 'fr',
  ja = 'ja',
  pt = 'pt',
  ru = 'ru',
  ko = 'ko',
  tr = 'tr',
  it = 'it',
  nl = 'nl',
  pl = 'pl',
  sv = 'sv',
  id = 'id',
  hu = 'hu',
  el = 'el',
  cs = 'cs',
  ro = 'ro',
  vi = 'vi',
  th = 'th',
  ms = 'ms',
  bg = 'bg',
  fi = 'fi',
  hi = 'hi',
  hr = 'hr',
  lt = 'lt',
  uk = 'uk',
  ar = 'ar',
  bn = 'bn',
  en_US = 'en_US',
  es_ES = 'es_ES',
  fr_FR = 'fr_FR',
  it_IT = 'it_IT',
  pt_PT = 'pt_PT',
  de_DE = 'de_DE',
  tr_TR = 'tr_TR',
  pl_PL = 'pl_PL',
  ru_RU = 'ru_RU',
  id_ID = 'id_ID',
  zh_CN = 'zh_CN',
  zh_TW = 'zh_TW',
  ja_JP = 'ja_JP',
  ko_KR = 'ko_KR',
  th_TH = 'th_TH',
  vi_VN = 'vi_VN',
  bg_BG = 'bg_BG',
  cs_CZ = 'cs_CZ',
  el_GR = 'el_GR',
  fi_FI = 'fi_FI',
  hi_IN = 'hi_IN',
  hr_HR = 'hr_HR',
  hu_HU = 'hu_HU',
  lt_LT = 'lt_LT',
  nl_NL = 'nl_NL',
  ro_RO = 'ro_RO',
  sv_SE = 'sv_SE',
  uk_UA = 'uk_UA',
  ms_MY = 'ms_MY',
}

/** UserPermissionRole */
export enum UserPermissionRole {
  ADMIN = 'admin',
  USER = 'user',
}
