/**
 * @name 检查URL是否有效
 * @param {string} url 页面URL
 * @returns {boolean} 是否为有效URL
 */
export function isJSInjectionValidUrl(url: string) {
  const allowedDomains = ['baidu.com', 'juejin.cn', 'temu.com']

  const invalidProtocols = ['chrome://', 'chrome-extension://', 'moz-extension://', 'about:', 'data:', 'file:']

  // 检查是否为无效协议
  if (invalidProtocols.some((protocol) => url.startsWith(protocol))) {
    return false
  }

  // 检查是否为允许的域名
  if (allowedDomains.some((domain) => url.includes(domain))) {
    return true
  }

  return false
}
