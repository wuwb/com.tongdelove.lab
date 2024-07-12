import dayjs from 'dayjs';
import dateFormat from 'dayjs/plugin/dateFormat'

dayjs.extend(dateFormat);

export default function DateFormatter({ dateString }) {
  const date = dayjs(dateString);
  return <time dateTime={dateString}>{date.format('MMMM D, YYYY')}</time>;
}
