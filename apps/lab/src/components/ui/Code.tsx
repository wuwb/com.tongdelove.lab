import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

export function Code({ code, language }: { code: string; language: string }) {
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.textContent = code
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <div className="Code">
      <pre>
        <div ref={codeRef} className={`language-${language}`} />
      </pre>
    </div>
  )
}
