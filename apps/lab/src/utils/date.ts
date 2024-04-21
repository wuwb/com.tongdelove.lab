import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export function formatYMDHMS(date, sep1, sep2) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  month = month < 10 ? '0' + month : month
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  sep1 = sep1 || '-'
  sep2 = sep2 || ':'
  const str = `${year}${sep1}${month}${sep1}${d} ${h}${sep2}${m}${sep2}${s}`
  return str
}

export function formatYMD(date, sep1) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let d = date.getDate()
  month = month < 10 ? '0' + month : month
  d = d < 10 ? '0' + d : d
  sep1 = sep1 || '-'
  const str = `${year}${sep1}${month}${sep1}${d}`
  return str
}

export function getShortDuration(seconds: number) {
  const dur = dayjs.duration(seconds, 'seconds')
  let short = ''

  if (dur.asYears() >= 1) {
    const years = Math.floor(dur.asYears())
    short += `${years}y`
  } else if (dur.months() >= 1) {
    const months = Math.floor(dur.months())
    short += `${months}M`
  } else if (dur.days() >= 1) {
    const days = Math.floor(dur.days())
    short += `${days}d`
  } else if (dur.hours() >= 1) {
    const hours = Math.floor(dur.hours())
    short += `${hours}h`
  } else if (dur.minutes() >= 1) {
    const minutes = Math.floor(dur.minutes())
    short += `${minutes}m`
  } else {
    const seconds = Math.floor(dur.seconds())
    short += `${seconds}s`
  }

  return short
}

export function getLastTimeDuration(seconds: number) {
  const dur = dayjs.duration(seconds, 'seconds')
  let lastTime = ''

  if (dur.asYears() >= 1) {
    const years = Math.floor(dur.asYears())
    lastTime += `${years} year`
  } else if (dur.months() >= 1) {
    const months = Math.floor(dur.months())
    lastTime += `${months} month`
  } else if (dur.days() >= 1) {
    const days = Math.floor(dur.days())
    lastTime += `${days} day`
  } else if (dur.hours() >= 1) {
    const hours = Math.floor(dur.hours())
    lastTime += `${hours} hour`
  } else if (dur.minutes() >= 1) {
    const minutes = Math.floor(dur.minutes())
    lastTime += `${minutes} mintue`
  } else {
    const seconds = Math.floor(dur.seconds())
    lastTime += `${seconds}s`
  }

  return lastTime
}

export function formatDate(milliseconds: number) {
  return dayjs(milliseconds).format('YYYY-MM-DD')
}

export function roundToNearestHour(inputDate: Date) {
  const date = new Date(inputDate)
  date.setMinutes(date.getMinutes() >= 30 ? 60 : 0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export function getPDTToday() {
  const now = new Date()

  // get local time end of today at 00:00:00
  const localTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)

  return localTimeToday
}

export function hoursDifference(date1: { getTime: () => number }, date2: { getTime: () => number }) {
  const millisecondsPerHour = 1000 * 60 * 60
  return (date2.getTime() - date1.getTime()) / millisecondsPerHour
}
