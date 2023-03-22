import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import * as S from './styles'
import { Repo } from '../../clients/backend'

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/25/25231.png'

const Card = ({ repo }: { repo: Repo }) => {
  const { stargazers, name, description, owner, url } = repo
  return (
    <S.Container>
      <S.ImageContainer>
        <a href={url} target="_blank">
          <S.Image url={defaultImage} />
        </a>
        <a href={owner?.pageUrl} target="_blank">
          <S.Avatar avatarUrl={owner.avatarUrl} />
        </a>
      </S.ImageContainer>
      <S.Info>
        <S.Stars>
          <p>{stargazers}</p>
          <FontAwesomeIcon
            data-testid="star-icon"
            icon={faStar}
            style={{ fontSize: '12px' }}
          />
        </S.Stars>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Info>
    </S.Container>
  )
}

export default Card
