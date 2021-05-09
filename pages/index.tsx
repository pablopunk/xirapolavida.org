import Posts from 'components/Posts'
import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import { getPosts } from 'cosmicjs/api'
import Link from 'next/link'

type Props = {
  posts: Post[]
}

const Index: FunctionComponent<Props> = ({ posts }) => {
  return (
    <>
      <div className="bg-bgDim px-2 py-4 rounded-xl max-w-2xl text-center shadow-lg my-4 mx-auto">
        <h2 className="font-bold text-xl">
          Coordinadora galega da Xira zapatista pola Vida
        </h2>
        <p className="text-lg">
          Somos un grupo de{' '}
          <Link href="/colectivos">
            <a className="text-accent2">colectivos</a>
          </Link>{' '}
          e individuais voluntarios que colaboran para darlle a benvida e
          acoller á xira zapatista por Europa, que comeza na nosa terra.
        </p>
      </div>
      <h3 className="text-3xl py-6 text-center md:text-left">
        {posts.length > 0
          ? 'Últimas publicacións'
          : 'Aínda non hai publicacións'}
      </h3>
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
