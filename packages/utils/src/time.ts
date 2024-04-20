export function convertHours(time: string) {
  let [hour, minutes] = time.split(":").map(Number);
  if (typeof hour === 'undefined') {
    hour = 0;
  }
  if (typeof minutes === 'undefined') {
    minutes = 0;
  }
  const timeInMinutes = hour * 60 + minutes;
  return timeInMinutes;
}
