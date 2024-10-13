import { render } from '@testing-library/react'
import Index from 'pages/design'
import React from 'react'

test('renders learn react link', () => {
  const { getByText } = render(<Index />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
