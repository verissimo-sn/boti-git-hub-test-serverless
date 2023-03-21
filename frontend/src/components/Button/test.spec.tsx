import { fireEvent, render, screen } from '@testing-library/react'

import CustomButton from '.'

describe('Component: Button', () => {
  it('should render correctly', () => {
    const onClick = jest.fn()
    const buttonText = 'Click me!'
    render(<CustomButton onCLick={onClick}>{buttonText}</CustomButton>)
    const button = screen.getByRole('button', { name: buttonText })
    fireEvent.click(button)
    expect(onClick).toBeCalledTimes(1)
  })
})
