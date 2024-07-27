import React, { useCallback } from 'react'
import { toPng } from 'html-to-image'
import { Button, LoadingOverlay } from '@mantine/core'
import download from 'downloadjs'
import { usePortal } from '@/hooks/usePortal'

function Loading() {
  return (
    <>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    </>
  )
}

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function Download() {
  const { portal, togglePortal } = usePortal(<Loading />)
  const callback = useCallback(async () => {
    const input = document.getElementById('fund-input')
    const table = document.getElementById('table-list')
    const name = (input as HTMLInputElement).value.trim() || `${Date.now()}`
    try {
      togglePortal(true)
      const [dataUrl] = await Promise.all([
        toPng(table as HTMLTableElement),
        delay(2000),
      ])
      download(dataUrl, `${name}.png`)
      await delay(1000)
      togglePortal(false)
    } catch (e) {
      togglePortal(false)
      console.error(e)
    }
  }, [togglePortal])

  return (
    <>
      <Button onClick={callback}>下载</Button>
      {portal}
    </>
  )
}
