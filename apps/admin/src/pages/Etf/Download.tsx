import React, { useCallback } from 'react'
import { toPng } from 'html-to-image'
import usePortal from './hooks/usePortal'
import { useStyles } from './styles'

function Loading() {
  const { styles } = useStyles()
  return (
    <>
      <div className={styles.background} />
      <div className={styles.spinner}>loading</div>
    </>
  )
}

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// 将 dataUrl 保存为本地文件，替代原项目的 downloadjs
const saveDataUrl = (dataUrl: string, fileName: string) => {
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function Download() {
  const { styles } = useStyles()
  
  const { portal, togglePortal } = usePortal(<Loading />)

  const callback = useCallback(async () => {
    const input = document.getElementById('fund-input')
    const table = document.getElementById('table-list')
    const name = (input as HTMLInputElement)?.value.trim() || `${Date.now()}`
    try {
      togglePortal(true)
      const [dataUrl] = await Promise.all([toPng(table as HTMLTableElement), delay(2000)])
      saveDataUrl(dataUrl, `${name}.png`)
      await delay(1000)
      togglePortal(false)
    } catch (e) {
      togglePortal(false)
      console.error(e)
    }
  }, [togglePortal])

  return (
    <>
      <button type="button" className={styles.plainButton} onClick={callback}>
        下载表格
      </button>
      {portal}
    </>
  )
}
