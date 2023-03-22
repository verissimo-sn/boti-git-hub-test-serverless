import { render, screen } from '@testing-library/react'

import Header from '.'

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(<Header title="Fake Title" />)
    expect(screen.getByText(/Fake Title/i)).toBeInTheDocument()
  })
})
