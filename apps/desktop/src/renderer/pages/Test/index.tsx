import { useRef, useState } from 'react'
import { Radio, RadioGroup } from 'renderer/components/ui/radio'
import { HStack, RadioCard } from '@chakra-ui/react'

declare global {
  interface Window {
    custom: {
      processFolder: (data: {
        folderPath: string, 
        size: string,
        fillType: string
      }) => Promise<any>
      getFolderPath: (filePath: string) => Promise<any>
      selectFolder: () => Promise<string>
    }
  }
}

export const TestPage = () => {
  const [message, setMessage] = useState('点击此处选择一个文件夹')
  const [isProcessing, setIsProcessing] = useState(false)
  const [size, setSize] = useState('3inch')
  const [fillType, setFillType] = useState('cover')
  const [result, setResult] = useState('')

  const handleSelectFolderClick = async () => {
    setResult('')

    // 防止用户在对话框打开时重复点击
    if (isProcessing) return

    setIsProcessing(true)
    setMessage('正在打开选择器...')

    try {
      // 调用我们在 preload 中暴露的 API
      const folderPath = await window.custom.selectFolder()

      // ✅ 根据返回结果更新UI
      if (folderPath) {
        console.log('成功选择文件夹:', folderPath)
        setMessage(`已选择: ${folderPath}`)

        const result = await window.custom.processFolder({
          folderPath, 
          size,
          fillType,
        })

        console.log('result: ', result)

        if (result.success === true) {
          setResult('合成成功')
        }
      } else {
        // 用户点击了“取消”
        console.log('用户取消了选择')
        setMessage('点击此处选择一个文件夹')
      }
    } catch (error) {
      console.error('选择文件夹时出错:', error)
      setMessage('发生错误，请重试')
    } finally {
      setIsProcessing(false)
    }
  }

  const boxClasses = `
    w-full max-w-lg border-2 border-dashed rounded-lg
    flex justify-center items-center text-center p-4
    transition-colors duration-200 cursor-pointer
    border-gray-500 bg-transparent hover:border-blue-400 hover:bg-blue-900/50
  `

  const items = [
    {
      title: '3英寸',
      value: '3inch',
    },
    {
      title: '4英寸',
      value: '4inch',
    },
  ]

  const fillTypes = [
    {
      title: 'contain',
      value: 'contain',
    },
    {
      title: 'cover',
      value: 'cover',
    },
  ]

  const handleSizeClick = (value: string) => {
    setSize(value)
  }

  const handleFillClick = (value: string) => {
    setFillType(value)
  }
  

  return (
    <div className="flex flex-col grow justify-center items-center">
      <RadioCard.Root defaultValue={size}>
        <RadioCard.Label>选择尺寸</RadioCard.Label>
        <HStack align="stretch">
          {items.map(item => (
            <RadioCard.Item
              key={item.value}
              value={item.value}
              onClick={() => {
                handleSizeClick(item.value)
              }}
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </HStack>
      </RadioCard.Root>

      <RadioCard.Root defaultValue={fillType}>
        <RadioCard.Label>选择填充方式</RadioCard.Label>
        <HStack align="stretch">
          {fillTypes.map(item => (
            <RadioCard.Item
              key={item.value}
              value={item.value}
              onClick={() => {
                handleFillClick(item.value)
              }}
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </HStack>
      </RadioCard.Root>

      <div
        className={boxClasses}
        // ✅ 绑定 onClick 事件
        onClick={handleSelectFolderClick}
      >
        <p className="text-lg">{message}</p>
        <p className="text-lg">{result}</p>
      </div>
    </div>
  )
}
