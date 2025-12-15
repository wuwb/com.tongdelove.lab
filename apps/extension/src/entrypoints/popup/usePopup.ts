export function usePopup() {
  const getCollectButtonStatus = async () => {
    return new Promise((resolve, reject) => {
      browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0].id) {
          reject()
          return
        }
        browser.tabs.sendMessage(tabs[0].id, { action: 'getCollectButtonStatus' }, (response) => {
          resolve(response)
        })
      })
    })
  }

  const collectAllImages = () => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].id) {
        return
      }
      browser.tabs.sendMessage(tabs[0].id, { action: 'collectAllImages' })
    })
  }

  const collectGoodsImages = () =>
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].id) {
        return
      }
      browser.tabs.sendMessage(tabs[0].id, { action: 'collectGoodsImages' })
    })

  const downloadVideo = browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0].id) {
      return
    }
    browser.tabs.sendMessage(tabs[0].id, { action: 'downloadVideo' })
  })

  return {
    collectAllImages,
    collectGoodsImages,
    downloadVideo,
    getCollectButtonStatus,
  }
}
