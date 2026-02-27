// import { Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'

const { app } = window

export function IndexPage() {
  useEffect(() => {
    // check the console on dev tools
    app?.sayHelloFromBridge()
  }, [])

  const userName = app?.username || 'there'

  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <main className="h-screen flex flex-col gap-4 p-4">

      Home Page
      Hi, {userName}!

      <Button className="text-3xl font-bold underline text-white" onClick={ipcHandle}>
        Send IPC
      </Button>

      <Button className="bg-sky-500 hover:bg-sky-700" onClick={handleClick}>
        Click me {count}
      </Button>

    </main>
  )
}
