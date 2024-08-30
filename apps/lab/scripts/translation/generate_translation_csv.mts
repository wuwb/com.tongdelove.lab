import { buildCSV } from '@tongdelove/i18n'
import fs from 'fs-extra'

buildCSV('./public/locales/*/translation.json', [
  'en',
  'zh-CN',
  'de-DE',
  'es-ES',
  'fr-FR',
  'ja-JP',
  'pt-BR',
  'ru-RU',
]).then((csv) => {
  fs.writeFile('locales.csv', csv)
})
