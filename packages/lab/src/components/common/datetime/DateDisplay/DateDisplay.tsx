const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayNames_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatNumber(number) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function getDateString(dateObj, options = { includeLongDay: true }) {
  const year = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth();
  const monthName = months[monthIndex];
  const day = dateObj.getDate();
  const dayNameIndex = dateObj.getDay();

  let dayName;
  if (options.includeShortDay) {
    dayName = dayNames_short[dayNameIndex];
  } else {
    dayName = dayNames[dayNameIndex];
  }
  return `${dayName}, ${monthName} ${day}, ${year}`;
}

function getTimeString(dateObj, options) {
  const hours = dateObj.getHours();
  const adjustedHours = hours === 0 ? 12 : hours < 13 ? hours : hours - 12;
  const minutes = formatNumber(dateObj.getMinutes());
  const seconds = formatNumber(dateObj.getSeconds());
  const meridiem = hours < 12 ? "AM" : "PM";
  return `${adjustedHours}:${minutes}${
    options.includeFullTime ? ":" + seconds : ``
  } ${meridiem}`;
}

export default function DateDisplay({
  children,
  options = {
    includeFullTime: false,
    includeLongDay: true,
  },
}) {
  const dateObj = new Date(children);
  let dateString = getDateString(dateObj, options);
  let timeString = "";

  if (options.includeFullTime || options.includeShortTime) {
    timeString = getTimeString(dateObj, options);
  }

  const dateTimeString = `${dateString} ${timeString}`;

  return <time dateTime={children}>{dateTimeString}</time>;
}
