import { UserLanguageCode } from '@prisma/client'

export function getLocale(userLanguage: UserLanguageCode) {
  if (userLanguage === 'zh') {
    return 'zh-CN'
  }
  if (userLanguage === 'de') {
    return 'de-DE'
  }
  if (userLanguage === 'es') {
    return 'es-ES'
  }
  if (userLanguage === 'fr') {
    return 'fr-FR'
  }
  if (userLanguage === 'ja') {
    return 'ja-JP'
  }
  if (userLanguage === 'pt') {
    return 'pt-BR'
  }
  if (userLanguage === 'ru') {
    return 'ru-RU'
  }

  return 'en'
}
