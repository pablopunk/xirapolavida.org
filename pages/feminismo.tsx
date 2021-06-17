import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { getFeminismo, POSTS_FILTERS } from 'cosmicjs/api'
import { SITE_URL } from 'components/constants'
import { Post } from 'cosmicjs/types'

const TITLE = 'Feminismo na Xira Pola Vida'
const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

type Props = {
  posts: Post[]
  total: number
}

const Feminismo: FunctionComponent<Props> = ({ posts, total }) => {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={SITE_URL + '/header.jpg'}
      />
      <h1 className="my-5 text-3xl">Feminismo na Xira Pola Vida</h1>
      <Posts
        initialPosts={posts}
        total={total}
        filters={JSON.stringify(POSTS_FILTERS.feminismo)}
      />
      {posts.length === 0 && (
        <p className="text-xl">Todavía non hai publicacións</p>
      )}
    </>
  )
}

export async function getStaticProps() {
  const { posts, total } = await getFeminismo()

  return {
    props: { posts, total },
    revalidate: 60,
  }
}

export default Feminismo
