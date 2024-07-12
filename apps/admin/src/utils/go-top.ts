export function goTop() {
  let timer
  if (timer) {
    clearInterval(timer)
  }
  let i = 1
  let ele =
    document.documentElement.scrollTop > 0
      ? document.documentElement
      : document.body
  timer = setInterval(() => {
    if (ele.scrollTop > 0) {
      ele.scrollTop = ele.scrollTop - 100 * i
      i++
    } else {
      ele.scrollTop = 0
      i = 1
      clearInterval(timer)
    }
  }, 10)
}
