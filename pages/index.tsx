import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import { getPosts } from 'cosmicjs/api'
import Link from 'next/link'
import { SITE_URL } from 'components/constants'

const TITLE = 'Xira pola vida'
const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

type Props = {
  posts: Post[]
}

const Index: FunctionComponent<Props> = ({ posts }) => {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={SITE_URL + '/header.jpg'}
      />
      <div className="bg-bgDim p-3 rounded-xl max-w-2xl text-center shadow-lg my-4 mx-auto">
        <h2 className="font-bold text-xl">
          Coordinadora <span className="text-accent2">galega</span> da Xira
          zapatista pola Vida
        </h2>
        <p className="text-lg mt-2">
          Somos un grupo de{' '}
          <Link href="/colectivos">
            <a className="text-accent2">colectivos</a>
          </Link>{' '}
          e persoas que colaboran para darlle a benvida e acoller á xira
          zapatista por Europa, que comeza na nosa terra.
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
    props: { posts },
    revalidate: 60
  }
}

export default Index
