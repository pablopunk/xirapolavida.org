import { API_URL } from 'constants/api'
import Posts from 'components/Posts'

const Index = ({ posts }) => {
  return (
    <>
      <h2 className="text-3xl py-6">Últimas publicacións</h2>
      <Posts posts={posts} />
    </>
  )
}

export async function getStaticProps() {
  const { posts } = await fetch(API_URL + '/posts').then(r => r.json())

  return {
    props: { posts }
  }
}

export default Index
