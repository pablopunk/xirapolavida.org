import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { getColabora, POSTS_FILTERS } from 'cosmicjs/api'
import { SITE_URL } from 'components/constants'
import { Post } from 'cosmicjs/types'

const TITLE = 'Colabora na Xira pola vida'
const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

type Props = {
  posts: Post[]
  total: number
}

const Colabora: FunctionComponent<Props> = ({ posts, total }) => {
  const formulario = posts.find(
    (post: Post) =>
      post.slug ===
      'formulario-e-axuda-para-a-coordinacion-da-acolhida-comunitaria'
  )
  let postsWithFormularioFirst = [...posts]

  if (formulario) {
    postsWithFormularioFirst.splice(posts.indexOf(formulario), 1)
    postsWithFormularioFirst = [formulario, ...postsWithFormularioFirst]
  }

  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={SITE_URL + '/header.jpg'}
      />
      <h1 className="my-5 text-3xl">Colabora coa coordinadora galega</h1>
      <Posts
        initialPosts={postsWithFormularioFirst}
        total={total}
        filters={JSON.stringify(POSTS_FILTERS.colabora)}
      />
      {posts.length === 0 && (
        <p className="text-xl">Todavía non hai publicacións</p>
      )}
    </>
  )
}

export async function getStaticProps() {
  const { posts, total } = await getColabora()

  return {
    props: { posts, total },
    revalidate: 60,
  }
}

export default Colabora
