import dayjs from 'dayjs'

export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A')

export function formatCompactNumber(number: number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'K'
  } else if (number >= 1000000 && number < 1000000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number >= 1000000000 && number < 1000000000000) {
    return (number / 1000000000).toFixed(1) + 'B'
    // } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
  } else if (number >= 1000000000000) {
    return (number / 1000000000000).toFixed(1) + 'T'
  } else {
    return number.toString()
  }
}

export function formatNumber(num: number | null) {
  if (!num) {
    return 0
  }
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
  } else if (num < 900) {
    return num // if value < 1000, nothing to do
  }
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
