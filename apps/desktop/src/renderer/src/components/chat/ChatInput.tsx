import { Box, Button, HStack, Textarea,  NativeSelect } from '@chakra-ui/react'
import { Send, StopCircle } from 'lucide-react'
import { useState, useRef } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  onCancel: () => void
  loading: boolean
  models: { label: string; value: string }[]
  currentModel: string
  onModelChange: (model: string) => void
}

export function ChatInput({
  onSend,
  onCancel,
  loading,
  models,
  currentModel,
  onModelChange
}: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!input.trim() || loading) return
    onSend(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box p={4} borderTopWidth={1} bg="bg.panel">
      <HStack mb={2} justify="space-between">
        <Box width="200px">
           <NativeSelect.Root size="sm">
             <NativeSelect.Field 
                value={currentModel} 
                onChange={(e) => onModelChange(e.currentTarget.value)}
             >
                {models.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
             </NativeSelect.Field>
           </NativeSelect.Root>
        </Box>
      </HStack>
      
      <HStack align="flex-end">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          resize="none"
          rows={3}
          autoFocus
        />
        <Button
          onClick={loading ? onCancel : handleSend}
          colorPalette={loading ? 'red' : 'blue'}
          variant="solid"
          h="full"
        >
          {loading ? <StopCircle /> : <Send />}
        </Button>
      </HStack>
    </Box>
  )
}
