import { useEffect, useState } from 'react'
import { Button } from '@/renderer/components/ui/button'

const { app } = window

export const IndexPage = () => {
  useEffect(() => {
    app?.sayHelloFromBridge()
  }, [])

  const userName = app?.username || 'there'

  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className="flex h-screen flex-col gap-4 p-4">
      Home Page Hi, {userName}!
      <Button className="font-bold text-3xl text-white underline" onClick={ipcHandle}>
        Send IPC
      </Button>
      <Button className="bg-sky-500 hover:bg-sky-700" onClick={handleClick}>
        Click me {count}
      </Button>
    </div>
  )
}
