import { isJSON } from 'class-validator'

export function replaceSchemaByLanguage(language: string, source: any): any {
  if (Array.isArray(source)) {
    return source.map((item) => {
      return replaceSchemaByLanguage(language, item)
    })
  } else if (typeof source === 'object') {
    const copySource: any = {}
    Object.keys(source).forEach((key) => {
      copySource[key] = replaceSchemaByLanguage(language, source[key])
    })
    return copySource
  }
  return language[source] || source
}

export function getTypeByItem(item: any, lang: string, type = 'action') {
  const language = item.i18n[lang]
  const inputSchema = item.inputJsonSchema
  const outputSchema = item.outputJsonSchema
  const serviceLanguage = item.serviceI18n[lang]
  const idFieldName = type === 'action' ? 'actionTypeId' : 'triggerTypeId'
  return {
    [idFieldName]: item[idFieldName],
    name: language[item.name] || item.name,
    description: language[item.description] || item.description,
    endpoint: item.endpoint,
    inputJsonSchema: replaceSchemaByLanguage(language, inputSchema),
    outputJsonSchema: replaceSchemaByLanguage(language, outputSchema),
    service: {
      serviceId: item.serviceId,
      name: serviceLanguage[item.serviceName],
      logo: isJSON(item.serviceLogo)
        ? JSON.parse(item.serviceLogo).light
        : item.serviceLogo,
      themeLogo: isJSON(item.serviceLogo)
        ? JSON.parse(item.serviceLogo)
        : { light: item.serviceLogo },
      slug: item.serviceSlug,
    },
  }
}
