import dayjs from 'dayjs'

export const DateFormater = ({ dateString }) => {
  const date = dayjs(dateString)
  return <time dateTime={dateString}>{date.format('MMMM D, YYYY')}</time>
}
