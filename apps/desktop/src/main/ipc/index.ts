import { registerAssistantsIpc } from "./assistants"
import { registerDatabaseIpc } from "./database"
import { registerOllamaIpc } from "./ollama"
import { registerSettingsIpc } from "./settings"
import { registerVersionIpc } from './version'
import { registerWindowIpc } from "./window"

export const registerIPC = () => {
  console.log('[main:ipc:index] registerIPC')
  registerOllamaIpc()
  registerSettingsIpc()
  registerAssistantsIpc()
  registerDatabaseIpc()
  registerVersionIpc()
  registerWindowIpc()
}
