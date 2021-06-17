import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { SITE_URL } from 'components/constants'
import { Post, Tag } from 'cosmicjs/types'
import Galicia from 'components/Galicia'
import { getFilterForTags, getPostsWithTags } from 'cosmicjs/api'

const TITLE = 'Eventos | Xira pola vida'
const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

const TAG: Tag = 'eventos'

type Props = {
  posts: Post[]
  total: number
}

const Eventos: FunctionComponent<Props> = ({ posts, total }) => {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={SITE_URL + '/header.jpg'}
      />
      <div className="flex justify-center">
        <div className="p-4 my-4 text-center shadow-lg bg-bgDim rounded-xl">
          <h4 className="mb-2 text-xl">Filtra por provincia</h4>
          <Galicia />
        </div>
      </div>
      <Posts
        initialPosts={posts}
        total={total}
        filters={JSON.stringify(getFilterForTags([TAG]))}
      />
    </>
  )
}

export async function getStaticProps() {
  const { posts, total } = await getPostsWithTags([TAG])

  return {
    props: { posts, total },
    revalidate: 60,
  }
}

export default Eventos
