export const usePopup = () => {
  const getCollectButtonStatus = async () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (!tabs[0].id) {
          reject()
          return
        }
        chrome.tabs.sendMessage(tabs[0].id, { action: "getCollectButtonStatus" }, function(response) {
          resolve(response)
        })
      })
    })
  }

  const collectAllImages = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (!tabs[0].id) {
        return
      }
      chrome.tabs.sendMessage(tabs[0].id, { action: "collectAllImages" })
    })
  }

  const collectGoodsImages = () => chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (!tabs[0].id) {
      return
    }
    chrome.tabs.sendMessage(tabs[0].id, { action: "collectGoodsImages" })
  })

  const downloadVideo = chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (!tabs[0].id) {
      return
    }
    chrome.tabs.sendMessage(tabs[0].id, { action: "downloadVideo" })
  })

  return {
    getCollectButtonStatus,
    collectAllImages,
    collectGoodsImages,
    downloadVideo,
  }
}
