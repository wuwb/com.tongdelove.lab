import React, { PropsWithChildren, useEffect, useState } from 'react'

/**
 * Hidden children node in ssr stage. to avoid ssr consistency problem
 */
export const SSRHidden: React.FC<PropsWithChildren> = React.memo((props) => {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    setShouldMount(true)
  }, [])

  return <>{shouldMount ? props.children : null}</>
})
SSRHidden.displayName = 'SSRHidden'
