describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('contains "FLOWGPT"', () => {
    cy.contains('FLOWGPT')
  })

  it('lighthouse', () => {
    const customThresholds = {
      performance: 10,
    }

    const desktopConfig = {
      formFactor: 'desktop',
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 11024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
    }
    cy.lighthouse(customThresholds, desktopConfig)
  })
})

export {}
