export type LLMProvider = {
  id: string
  name: string
  type: 'builtin' | 'custom'
  available: boolean
  config: {
    requiresApiKey: boolean
    requiresBaseUrl: boolean
    apiKeyPlaceholder: string
    baseUrlPlaceholder: string
    fields: Array<{
      key: string
      label: string
      type: 'text' | 'password' | 'url'
      placeholder: string | null
      optional: boolean
    }>
  }
}
