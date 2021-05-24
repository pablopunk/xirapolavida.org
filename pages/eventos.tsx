import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { getPosts } from 'cosmicjs/api'
import { SITE_URL } from 'components/constants'
import { isEvent } from 'cosmicjs/utils'
import { Post } from 'cosmicjs/types'

const TITLE = 'Eventos | Xira pola vida'
const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

type Props = {
  posts: Post[]
}

const Eventos: FunctionComponent<Props> = ({ posts }) => {
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
      <h3 className="text-3xl py-6 text-center md:text-left">
        {posts.length > 0
          ? 'Últimas publicacións'
          : 'Aínda non hai publicacións'}
      </h3>
      <Posts posts={posts} filter={post => isEvent(post)} />
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

export default Eventos
