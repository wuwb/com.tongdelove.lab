import '@cypress-audit/lighthouse/commands'

Cypress.on('uncaught:exception', err => {
  /* returning false here prevents Cypress from failing the test */
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
})

export {}
