// Disable missing translation message as translations will be added later.
// We can add a toggle for this later when we have most translations.

// eslint-disable-next-line
const consoleError = console.error.bind(console);
// eslint-disable-next-line
console.error = (message, ...args) => {
  if (
    typeof message === 'string' &&
    message.startsWith('[React Intl] Missing message:')
  ) {
    return;
  }
  consoleError(message, ...args);
};
