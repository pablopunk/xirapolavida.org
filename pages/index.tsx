import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import { getPosts } from 'cosmicjs/api'
import Link from 'next/link'
import { PAGE_REVALIDATE_TIME, SITE_URL } from 'components/constants'

const TITLE = 'Xira pola vida'
const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

type Props = {
  posts: Post[]
  total: number
}

const Index: FunctionComponent<Props> = ({ posts, total }) => {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={SITE_URL + '/header.jpg'}
      />
      <div className="max-w-2xl p-3 mx-auto my-4 text-center shadow-lg bg-bgDim rounded-xl">
        <h2 className="text-xl font-bold">
          Coordinadora <span className="text-accent">galega</span> da Xira
          zapatista pola Vida
        </h2>
        <p className="mt-2 text-lg">
          Somos un grupo de{' '}
          <Link href="/colectivos">
            <a className="text-accent2">colectivos</a>
          </Link>{' '}
          e persoas que colaboran para darlle a benvida e acoller á xira
          zapatista por Europa, que comeza na nosa terra.
        </p>
      </div>
      <h3 className="py-6 text-3xl text-center md:text-left">
        {posts.length > 0
          ? 'Últimas publicacións'
          : 'Aínda non hai publicacións'}
      </h3>
      <Posts initialPosts={posts} total={total} />
    </>
  )
}

export async function getStaticProps() {
  const { posts, total } = await getPosts()

  return {
    props: { posts, total },
    revalidate: PAGE_REVALIDATE_TIME,
  }
}

export default Index
