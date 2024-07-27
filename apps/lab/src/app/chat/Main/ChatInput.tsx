'use client'

import { Button } from '@mantine/core'
import { MdRefresh } from 'react-icons/md'
import { PiLightningFill } from 'react-icons/pi'
import { FiSend } from 'react-icons/fi'
import TextareaAutoSize from 'react-textarea-autosize'
import { useState } from 'react'

export function ChatInput() {
  const [messageText, setMessageText] = useState('')

  async function send() {
    const body = JSON.stringify({ messageText })
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    if (!response.ok) {
      console.log(response.statusText)
      return
    }
    if (!response.body) {
      console.log('body error')
      return
    }
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let done = false
    while (!done) {
      const result = await reader.read()
      done = result.done
      const chunk = decoder.decode(result.value)
      console.log(chunk)
    }
    setMessageText('')
  }

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 px-4">
        <Button icon={MdRefresh} variant="primary" className="font-medium">
          重新生成
        </Button>
        <div className="flex w-full items-end rounded-lg border border-black/10 bg-white py-4 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:border-gray-800/50 dark:bg-gray-700">
          <div className="text-primary-500 mx-3 mb-2.5">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className="mb-1.5 max-h-64 flex-1 resize-none border-0 bg-transparent text-black outline-none dark:text-white"
            placeholder="输入一条消息..."
            rows={1}
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value)
            }}
          />
          <Button
            className="mx-3 !rounded-lg"
            icon={FiSend}
            variant="primary"
            onClick={send}
          />
        </div>
      </div>
    </div>
  )
}
