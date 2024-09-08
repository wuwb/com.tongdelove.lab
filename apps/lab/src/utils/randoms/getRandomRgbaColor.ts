export function getRandomRgbaColor() {
  // 生成0到255之间的随机整数
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // 生成0到1之间的随机浮点数作为透明度
  const a = Math.random() // 可以调整为Math.random() * alphaMax + alphaMin 来限制透明度范围

  // 将每个分量转换成CSS颜色字符串格式
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
}
