import { useState } from 'react'
import Versions from './components/Versions'
import { Button } from "@chakra-ui/react"

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [count, setCount] = useState(0)

  const handleClick = (): void => {
    setCount(count + 1)
  }

  return (
    <div>
      <a className="text-3xl font-bold underline" target="_blank" rel="noreferrer" onClick={ipcHandle}>
        Send IPC
      </a>
      <Button className="bg-sky-500 hover:bg-sky-700" onClick={handleClick}>Click me {count}</Button>
      <Versions />
    </div>
  )
}

export default App
