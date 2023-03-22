import { render, screen } from '@testing-library/react'

import CardSection from '.'

describe('Component: CardSection', () => {
  it('should render correctly', () => {
    render(
      <CardSection languageName="Typescript">
        <div>Fake component children</div>
      </CardSection>
    )
    expect(screen.getByText(/Typescript/i)).toBeInTheDocument()
    expect(screen.getByText(/Fake component children/i)).toBeInTheDocument()
  })
})
