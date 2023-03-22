import { ReactNode } from 'react'
import * as S from './styles'

type Props = {
  languageName: string
  children: ReactNode
}

const CardSection = ({ languageName, children }: Props) => {
  return (
    <S.Container>
      <S.Title>{languageName}</S.Title>
      <S.CardList>{children}</S.CardList>
    </S.Container>
  )
}

export default CardSection
