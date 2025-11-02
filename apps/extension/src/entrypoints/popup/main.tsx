import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.css'

console.log("Popup loaded")

let rootElement = document.getElementById('root')
if (!rootElement) {
  rootElement = document.createElement('div')
  rootElement.id = 'root'
  document.body.appendChild(rootElement)
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// document.addEventListener('DOMContentLoaded', function() {
//   // 采集所有图片按钮
//   const collectAllButton = document.getElementById('jtyt-collectAllButton');
//   // 采集商品图片按钮
//   const collectGoodsButton = document.getElementById('jtyt-collectGoodsButton');
//   // 商品详情页，下载视频按钮
//   const videoDownloadButton = document.getElementById('jtyt-video-download');
//   // 提示语
//   const tips = document.getElementById('jtyt-tips');
//   const btns = document.getElementById('jtyt-btn')

//   // 请求当前页面的采集按钮状态
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { action: "getCollectButtonStatus" }, function(response) {
//       const res = response.infos
//       console.log("🚀 ~ chrome.tabs.sendMessage ~ res:", res)
//       // 商品详情页
//       if (res.type === 'goods') {
//         // 可以采集
//         if (!res.disabled) {
//           if (res.hasVideo) {
//             collectAllButton.parentNode.removeChild(collectAllButton)
//             collectGoodsButton.innerText = '采集商品图片'
//             collectGoodsButton.style.display = 'block'
//             videoDownloadButton.innerText = '下载视频'
//             videoDownloadButton.style.display = 'block'
//             btns.appendChild(collectGoodsButton)
//             btns.appendChild(videoDownloadButton)
//           }
//           else {
//             collectAllButton.parentNode.removeChild(collectAllButton)
//             collectGoodsButton.innerText = '采集商品图片'
//             collectGoodsButton.style.display = 'block'
//             btns.appendChild(collectGoodsButton)
//           }
//         }
//         // 不可采集
//         if (res.disabled) {
//           collectGoodsButton.style.display = 'none'
//           collectAllButton.parentNode.removeChild(collectAllButton)
//           collectGoodsButton.parentNode.removeChild(collectGoodsButton)
//         }
//         tips.innerText = res.tips
//         if (res.tips === '页面不支持采集，请到商品详情页') {
//           btns.style.display = 'none'
//         }
//       }
//       // 不是商品页面
//       if (res.type === 'other') {
//         collectGoodsButton.style.display = 'none'
//         collectGoodsButton.parentNode.removeChild(collectGoodsButton)
//         collectAllButton.innerText = '采集所有图片'
//         collectAllButton.style.display = 'block'
//         btns.appendChild(collectAllButton)
//         tips.innerText = res.tips
//       }
//     });
//   });
  
//   // 采集所有图片按钮点击事件
//   collectAllButton.addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "collectAllImages" });
//     });
//   });

//   // 采集商品图片按钮点击事件
//   collectGoodsButton.addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "collectGoodsImages" });
//     });
//   });

//   // 下载视频点击事件
//   videoDownloadButton.addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "downloadVideo" });
//     });
//   });
// });
