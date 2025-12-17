import { Input, Button, Stack, Heading, Text, Field, Box, Container } from '@chakra-ui/react'
import { useSettings } from '../hooks/useSettings'

export function SettingPage() {
  const { settings, setApiKey, setModel } = useSettings()

  return (
    <Container maxW="container.md" py={8}>
      <Stack gap={8}>
        <Heading size="xl">Settings</Heading>
        
        <Box p={6} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>OpenAI Configuration</Heading>
          <Stack gap={4}>
            <Field.Root>
              <Field.Label>API Key</Field.Label>
              <Input 
                value={settings.apiKeys.openai || ''} 
                onChange={(e) => setApiKey('openai', e.target.value)} 
                type="password"
                placeholder="sk-..."
              />
              <Field.HelperText>Your OpenAI API Key is stored locally.</Field.HelperText>
            </Field.Root>
            
            <Field.Root>
              <Field.Label>Model</Field.Label>
              <Input 
                value={settings.models.openai || ''} 
                onChange={(e) => setModel('openai', e.target.value)} 
                placeholder="gpt-3.5-turbo"
              />
            </Field.Root>
          </Stack>
        </Box>

        <Box p={6} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>Ollama Configuration</Heading>
          <Stack gap={4}>
            <Field.Root>
               <Field.Label>Model Name</Field.Label>
               <Input 
                 value={settings.models.ollama || ''}
                 onChange={(e) => setModel('ollama', e.target.value)}
                 placeholder="llama2"
               />
               <Field.HelperText>Ensure Ollama is running locally.</Field.HelperText>
            </Field.Root>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
