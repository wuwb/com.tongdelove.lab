export function hexToRgba(hex: string, opacity: number) {
  // 去掉十六进制颜色值前的#
  hex = hex.replace('#', '')

  // 确保十六进制颜色值是6位的，如果不是则补全
  if (hex.length === 3) {
    hex = hex[0]! + hex[0]! + hex[1]! + hex[1]! + hex[2]! + hex[2]!
  }

  // 解析十六进制颜色值为RGB值
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // 返回rgba格式的颜色字符串
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
