export function svgToPng(svgString: string, size: number) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const scale = 4
    canvas.width = size * scale
    canvas.height = size * scale
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('ctx not found')
    }

    ctx.scale(scale, scale)

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png')
    }
    img.onerror = (err) => {
      reject(err)
    }

    const encodedSvg = encodeURIComponent(svgString)
    img.src = `data:image/svg+xml;charset=utf-8,${encodedSvg}`
  })
}
