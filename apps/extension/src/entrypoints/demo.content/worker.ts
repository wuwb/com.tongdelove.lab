// Work around for: https://github.com/wxt-dev/wxt/issues/942
// @ts-expect-error
globalThis._content = undefined

// Worker code below:
console.log('Hello from worker')
