import { ReactNode } from 'react'
import * as S from './styles'

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <S.Wrapper>
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  )
}

export default ContentWrapper
