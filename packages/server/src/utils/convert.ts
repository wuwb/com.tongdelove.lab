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

export function converData(data: string) {
  let [ano, mes, dia, hora, min] = data.split("/").map(Number);
  if (typeof ano === 'undefined') {
    ano = 0;
  }
  if (typeof mes === 'undefined') {
    mes = 0;
  }
  if (typeof dia === 'undefined') {
    dia = 0;
  }
  if (typeof hora === 'undefined') {
    hora = 0;
  }
  if (typeof min === 'undefined') {
    min = 0;
  }
  const horaMin = hora * 60;
  const totalMin = ano + mes + dia + horaMin + min;
  return totalMin;
}
