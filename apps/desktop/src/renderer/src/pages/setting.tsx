import { Input, Stack, Heading, Text, Field, Box, Container, Accordion } from '@chakra-ui/react'
import { useSettings } from '../hooks/useSettings'
import { useState } from 'react'

export function SettingPage() {
  const { settings, setApiKey, setModel } = useSettings()
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})

  const toggleVisibility = (key: string) => {
    setVisibleKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Container maxW="container.md" py={8}>
      <Stack gap={8}>
        <Heading size="xl">设置</Heading>

        <Accordion.Root multiple defaultValue={['openai', 'anthropic']}>
          <Accordion.Item value="openai">
            <Accordion.ItemTrigger>
              <Heading size="md">OpenAI 配置</Heading>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Stack gap={4} pt={4}>
                <Field.Root>
                  <Field.Label>API Key</Field.Label>
                  <Box display="flex" gap={2}>
                    <Input
                      value={settings.apiKeys.openai || ''}
                      onChange={(e) => setApiKey('openai', e.target.value)}
                      type={visibleKeys.openai ? 'text' : 'password'}
                      placeholder="sk-..."
                      flex={1}
                    />
                    <button
                      onClick={() => toggleVisibility('openai')}
                      className="px-3 text-sm border rounded hover:bg-gray-100"
                    >
                      {visibleKeys.openai ? '隐藏' : '显示'}
                    </button>
                  </Box>
                  <Field.HelperText>
                    OpenAI API 密钥将使用系统加密存储。获取密钥请访问：
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      className="ml-1 text-blue-600 underline"
                    >
                      OpenAI Platform
                    </a>
                  </Field.HelperText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>模型</Field.Label>
                  <Input
                    value={settings.models.openai || ''}
                    onChange={(e) => setModel('openai', e.target.value)}
                    placeholder="gpt-4o"
                  />
                  <Field.HelperText>
                    可用模型：gpt-4o, gpt-4o-mini, gpt-4-turbo, gpt-4, gpt-3.5-turbo, o1-mini,
                    o1-preview
                  </Field.HelperText>
                </Field.Root>
              </Stack>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item value="anthropic">
            <Accordion.ItemTrigger>
              <Heading size="md">Anthropic Claude 配置</Heading>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Stack gap={4} pt={4}>
                <Field.Root>
                  <Field.Label>API Key</Field.Label>
                  <Box display="flex" gap={2}>
                    <Input
                      value={settings.apiKeys.anthropic || ''}
                      onChange={(e) => setApiKey('anthropic', e.target.value)}
                      type={visibleKeys.anthropic ? 'text' : 'password'}
                      placeholder="sk-ant-..."
                      flex={1}
                    />
                    <button
                      onClick={() => toggleVisibility('anthropic')}
                      className="px-3 text-sm border rounded hover:bg-gray-100"
                    >
                      {visibleKeys.anthropic ? '隐藏' : '显示'}
                    </button>
                  </Box>
                  <Field.HelperText>
                    Anthropic API 密钥将使用系统加密存储。获取密钥请访问：
                    <a
                      href="https://console.anthropic.com/"
                      target="_blank"
                      className="ml-1 text-blue-600 underline"
                    >
                      Anthropic Console
                    </a>
                  </Field.HelperText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>模型</Field.Label>
                  <Input
                    value={settings.models.anthropic || ''}
                    onChange={(e) => setModel('anthropic', e.target.value)}
                    placeholder="claude-3-5-sonnet-20241022"
                  />
                  <Field.HelperText>
                    可用模型：claude-3-7-sonnet-20250219, claude-3-5-sonnet-20241022,
                    claude-3-5-haiku-20241022, claude-3-opus-20240229
                  </Field.HelperText>
                </Field.Root>
              </Stack>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item value="google">
            <Accordion.ItemTrigger>
              <Heading size="md">Google Gemini 配置</Heading>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Stack gap={4} pt={4}>
                <Field.Root>
                  <Field.Label>API Key</Field.Label>
                  <Box display="flex" gap={2}>
                    <Input
                      value={settings.apiKeys.google || ''}
                      onChange={(e) => setApiKey('google', e.target.value)}
                      type={visibleKeys.google ? 'text' : 'password'}
                      placeholder="AIza..."
                      flex={1}
                    />
                    <button
                      onClick={() => toggleVisibility('google')}
                      className="px-3 text-sm border rounded hover:bg-gray-100"
                    >
                      {visibleKeys.google ? '隐藏' : '显示'}
                    </button>
                  </Box>
                  <Field.HelperText>
                    Google AI API 密钥将使用系统加密存储。获取密钥请访问：
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      className="ml-1 text-blue-600 underline"
                    >
                      Google AI Studio
                    </a>
                  </Field.HelperText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>模型</Field.Label>
                  <Input
                    value={settings.models.google || ''}
                    onChange={(e) => setModel('google', e.target.value)}
                    placeholder="gemini-1.5-pro"
                  />
                  <Field.HelperText>
                    可用模型：gemini-2.5-flash-preview-04-17, gemini-2.0-flash-exp, gemini-1.5-pro,
                    gemini-1.5-flash, gemini-1.0-pro
                  </Field.HelperText>
                </Field.Root>
              </Stack>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item value="ollama">
            <Accordion.ItemTrigger>
              <Heading size="md">Ollama 配置</Heading>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Stack gap={4} pt={4}>
                <Field.Root>
                  <Field.Label>Base URL</Field.Label>
                  <Input
                    value={settings.providers.ollama?.baseUrl || 'http://localhost:11434'}
                    onChange={(e) => setModel('ollama', e.target.value)}
                    placeholder="http://localhost:11434"
                  />
                  <Field.HelperText>
                    Ollama 服务的基础 URL。确保 Ollama 已在本地运行。安装 Ollama 请访问：
                    <a
                      href="https://ollama.ai"
                      target="_blank"
                      className="ml-1 text-blue-600 underline"
                    >
                      ollama.ai
                    </a>
                  </Field.HelperText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>模型</Field.Label>
                  <Input
                    value={settings.models.ollama || ''}
                    onChange={(e) => setModel('ollama', e.target.value)}
                    placeholder="llama3.2"
                  />
                  <Field.HelperText>
                    可用模型（需要先在 Ollama 中下载）：llama3.2, llama3.1, llama2, qwen3:8b,
                    mistral, codellama
                  </Field.HelperText>
                </Field.Root>
              </Stack>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Stack>
    </Container>
  )
}
