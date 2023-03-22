import { render, screen } from '@testing-library/react'
import { Repo } from '../../clients/backend'

import Card from '.'

describe('Component: Card', () => {
  let fakeLanguageRepo: Repo

  beforeEach(() => {
    fakeLanguageRepo = {
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner: {
        name: 'golang',
        avatarUrl: 'https://avatars.githubusercontent.com/u/4314092?v=4',
        pageUrl: 'https://github.com/golang',
      },
      url: 'https://github.com/golang/go',
      contributors: [],
      homePage: 'https://go.dev',
      stargazers: 109506,
      visibility: 'public',
    }
  })

  it('should render correctly', () => {
    render(<Card repo={fakeLanguageRepo} />)
    expect(screen.getByText(fakeLanguageRepo.stargazers)).toBeInTheDocument()
    expect(screen.getByText(fakeLanguageRepo.name)).toBeInTheDocument()
    expect(screen.getByText(fakeLanguageRepo.description)).toBeInTheDocument()
    expect(screen.getByTestId('star-icon')).toBeInTheDocument()
  })
})
