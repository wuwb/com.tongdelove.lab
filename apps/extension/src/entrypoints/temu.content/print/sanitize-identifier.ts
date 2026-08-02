export function sanitizeIdentifier(filename: string) {
  const baseName = filename.replace(/\.\w+$/, '')
  // 替换非合法标识符字符为下划线，并确保不以数字开头
  let safe = baseName.replace(/[^\w$]/g, '_')
  if (!/^[a-z_$]/i.test(safe)) {
    safe = `_${safe}`
  }
  return safe
}
