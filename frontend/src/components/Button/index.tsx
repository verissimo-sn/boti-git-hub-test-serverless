import { ReactNode } from 'react'
import * as S from './styles'

type Props = {
  children: ReactNode
  onCLick: Function
}

const CustomButton = ({ onCLick, children }: Props) => {
  return <S.CustomButton onClick={() => onCLick()}>{children}</S.CustomButton>
}

export default CustomButton
