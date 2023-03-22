import * as S from './styles'

const Header = ({ title }: { title: string }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}

export default Header
