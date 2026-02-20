import { useState } from 'react'

export function Versions() {
  console.log('window: ', window)

  const [versions] = useState(window?.electron?.process?.versions)
  // const versions = 1

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  )
}
