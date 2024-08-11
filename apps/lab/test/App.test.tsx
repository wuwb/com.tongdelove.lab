import React from 'react'
import { render } from '@testing-library/react'
import Index from 'pages/index'

test('renders learn react link', async () => {
  await render(<Index />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
