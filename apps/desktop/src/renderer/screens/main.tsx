import { Terminal } from 'lucide-react'
import { useEffect } from 'react'

import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert'
import { Button } from '@chakra-ui/react'
// The "App" comes from the context bridge in preload/index.ts
const { app } = window

console.log('app: ', app)

export function MainScreen() {
  useEffect(() => {
    // check the console on dev tools
    app.sayHelloFromBridge()
  }, [])

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black w-full">
      <Alert className="mt-5 bg-transparent border-transparent text-accent w-fit">
        <AlertTitle className="text-5xl text-teal-400">Hi</AlertTitle>

        <AlertDescription className="flex items-center gap-2 text-lg">
          <Terminal className="size-6 text-fuchsia-300" />

          <span className="text-gray-400">
            It's time to build something awesome!
          </span>
        </AlertDescription>
      </Alert>

      <Button>Click me</Button>
    </main>
  )
}
