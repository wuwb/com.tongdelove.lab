import { Box, Button, HStack, Textarea, IconButton } from '@chakra-ui/react'
import { Send, StopCircle, Paperclip, Globe, Image as ImageIcon } from 'lucide-react'
import { useState, useRef } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  onCancel: () => void
  loading: boolean
}

export function ChatInput({
  onSend,
  onCancel,
  loading
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
    <Box 
        bg="gray.50" 
        _dark={{ bg: 'gray.800', borderColor: 'gray.700' }} 
        borderRadius="xl" 
        p={2} 
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
    >
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="在这里输入消息，按 Enter 发送"
        resize="none"
        rows={1}
        minH="40px"
        maxH="200px"
        variant="outline"
        border="none"
        bg="transparent"
        _focus={{ boxShadow: 'none' }}
        p={3}
        fontSize="sm"
        autoFocus
      />
      
      <HStack justify="space-between" px={2} pb={1} pt={2}>
        <HStack gap={1} color="gray.400">
            <IconButton aria-label="Add file" variant="ghost" size="xs" color="gray.400" _hover={{ color: 'gray.600', bg: 'gray.100' }}>
                 <Paperclip size={18} />
            </IconButton>
            <IconButton aria-label="Web search" variant="ghost" size="xs" color="gray.400" _hover={{ color: 'gray.600', bg: 'gray.100' }}>
                 <Globe size={18} />
            </IconButton>
            <IconButton aria-label="Image generation" variant="ghost" size="xs" color="gray.400" _hover={{ color: 'gray.600', bg: 'gray.100' }}>
                 <ImageIcon size={18} />
            </IconButton>
        </HStack>
        
        <HStack>
            <Box fontSize="xs" color="gray.400" mr={2}>
                {loading ? 'Thinking...' : `${input.length} chars`}
            </Box>

            <Button
                onClick={loading ? onCancel : handleSend}
                size="sm"
                rounded="lg"
                colorPalette={loading ? 'red' : 'gray'}
                variant={input.trim() ? "solid" : "ghost"}
                disabled={!input.trim() && !loading}
            >
                {loading ? <StopCircle size={16} /> : <Send size={16} />}
            </Button>
        </HStack>
      </HStack>
    </Box>
  )
}
