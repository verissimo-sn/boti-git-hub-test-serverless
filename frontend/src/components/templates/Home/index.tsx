import ContentWrapper from '../../ContentWrapper'
import Header from '../../Header'
import Card from '../../Card'
import CardSection from '../../CardSection'
import { Language, Repo } from '../../../clients/backend'
import { convertFirstLetterToUppercase } from '../../../utils/string-util'

const Home = ({ languageList }: { languageList: Language[] }) => {
  return (
    <>
      <Header title="The Best Repos" />
      <ContentWrapper>
        {languageList &&
          languageList?.map((languages) => (
            <CardSection
              key={languages.id}
              languageName={convertFirstLetterToUppercase(languages.name)}
            >
              {languages?.repos.map((repo: Repo) => (
                <Card key={repo.githubId} repo={repo} />
              ))}
            </CardSection>
          ))}
      </ContentWrapper>
    </>
  )
}

export default Home
