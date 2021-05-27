import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { getEventos, POSTS_FILTERS } from 'cosmicjs/api'
import { SITE_URL } from 'components/constants'
import { Post } from 'cosmicjs/types'

const TITLE = 'Eventos | Xira pola vida'
const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

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
      <div className="bg-bgDim p-3 rounded-xl max-w-2xl text-center shadow-lg my-4 mx-auto">
        <h2 className="font-bold text-xl">Eventos</h2>
        <p className="text-lg mt-2">
          Aquí podes consultar os próximos actos da coordinadora galega
        </p>
      </div>
      <Posts
        initialPosts={posts}
        total={total}
        filters={JSON.stringify(POSTS_FILTERS.eventos)}
      />
    </>
  )
}

export async function getStaticProps() {
  const { posts, total } = await getEventos()

  return {
    props: { posts, total },
    revalidate: 60
  }
}

export default Eventos
