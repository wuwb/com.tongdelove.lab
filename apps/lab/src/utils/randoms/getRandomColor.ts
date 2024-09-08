export function getRandomColor() {
  // 生成0到255之间的随机整数
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // 将每个分量转换成CSS颜色字符串格式
  return `rgb(${r}, ${g}, ${b})`
}
