import Posts from 'components/Posts'
import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import { getPosts } from 'cosmicjs/api'

type Props = {
  posts: Post[]
}

const Index: FunctionComponent<Props> = ({ posts }) => {
  return (
    <>
      <h2 className="text-3xl py-6">
        {posts.length > 0
          ? 'Últimas publicacións'
          : 'Aínda non hai publicacións'}
      </h2>
      <Posts posts={posts} />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()

  return {
    props: { posts }
  }
}

export default Index
