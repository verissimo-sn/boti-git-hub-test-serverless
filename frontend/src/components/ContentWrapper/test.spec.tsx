import { render, screen } from '@testing-library/react'

import ContentWrapper from '.'

describe('Component: ContentWrapper', () => {
  it('should render correctly', () => {
    render(
      <ContentWrapper>
        <div>Fake component children</div>
      </ContentWrapper>
    )
    expect(screen.getByText(/Fake component children/i)).toBeInTheDocument()
  })
})
