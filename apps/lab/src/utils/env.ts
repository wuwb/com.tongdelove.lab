export const isServer = () => typeof window === 'undefined'

export function isWeiXin() {
  return /MicroMessenger/i.test(window.navigator.userAgent)
}
