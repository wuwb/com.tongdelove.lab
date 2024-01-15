import { formatDate, getLastTimeDuration, getShortDuration } from './date'

export function humanizeDeadline(endDate: Date) {
  const daysVal = Math.round((endDate.getTime() - Date.now()) / (1000 * 3600 * 24))
  return daysVal > 0 ? `${String(daysVal)} days left` : 'Expired'
}

export function humanizeDuration(inputMilliseconds: number, results: 'short' | 'lastTime' | 'fullDate') {
  const seconds = (new Date().getTime() - inputMilliseconds) / 1000
  switch (results) {
    case 'short':
      return getShortDuration(seconds)
    case 'lastTime':
      return getLastTimeDuration(seconds)
    default:
      return formatDate(inputMilliseconds)
  }
}
export function capitalizeWords(str: string) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function humanizeCategory(category: string) {
  return category.replace(/-/g, ' ')
}
