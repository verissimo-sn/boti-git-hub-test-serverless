import HomeTemplate from '../components/templates/Home'
import { BackendHttpClient, Language } from '../clients/backend'
import axios from 'axios'

const Home = (props: { languages?: Language[] }) => {
  if (!props.languages) {
    return <div>loading...</div>
  }
  return <HomeTemplate languageList={props.languages} />
}

export const getServerSideProps = async () => {
  try {
    const instance = axios.create({
      baseURL: process.env.BACKEND_BASE_URL,
    })
    const client = new BackendHttpClient(instance)
    const languages = await client.getRepositoriesByLanguage()
    return {
      props: {
        languages,
      },
    }
  } catch (error) {
    console.log('Error on SSR', error)
    return {
      props: {},
    }
  }
}

export default Home
