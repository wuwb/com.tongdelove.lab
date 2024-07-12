const localStorageMock = {}

global.localStorage = localStorageMock

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
})

class Worker {
  constructor(stringUrl) {
    this.url = stringUrl
    this.onmessage = () => {}
  }

  postMessage(msg) {
    this.onmessage(msg)
  }
}
window.Worker = Worker

/* eslint-disable global-require */
if (typeof window !== 'undefined') {
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
    })
  }
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
    })
  }
}
const errorLog = console.error
Object.defineProperty(global.window.console, 'error', {
  writable: true,
  configurable: true,
  value: (...rest) => {
    const logStr = rest.join('')
    if (
      logStr.includes(
        'Warning: An update to %s inside a test was not wrapped in act(...)',
      )
    ) {
      return
    }
    errorLog(...rest)
  },
})
