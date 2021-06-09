import Posts from 'components/Posts'
import Seo from 'components/Seo'
import { FunctionComponent } from 'react'
import { getEventosInLocation, POSTS_FILTERS } from 'cosmicjs/api'
import { SITE_URL } from 'components/constants'
import { Post } from 'cosmicjs/types'
import { GetStaticPaths, GetStaticProps } from 'next'

const DESCRIPTION = `Que veñen as Zapatistas!
Neste blogue podes obter información sobre a chegada, a benvida, e todos os actos
 que se farán na Galiza, así como da organización destes e mesmo participar neles!`

const labelForId = {
  corunha: 'A Coruña',
  pontevedra: 'Pontevedra',
  ourense: 'Ourense',
  lugo: 'Lugo',
}

type Provincia = keyof typeof labelForId

type Props = {
  posts: Post[]
  total: number
  provincia: Provincia
}

const Eventos: FunctionComponent<Props> = ({ posts, total, provincia }) => {
  return (
    <>
      <Seo
        title={`Eventos en ${labelForId[provincia]} | Xira pola Vida`}
        description={DESCRIPTION}
        imageUrl={SITE_URL + '/header.jpg'}
      />
      <div className="max-w-2xl p-3 mx-auto my-4 text-center shadow-lg bg-bgDim rounded-xl">
        <h2 className="text-xl font-bold text-accent">
          {labelForId[provincia]}
        </h2>
        <p className="mt-2 text-lg">Próximos actos nesta provincia</p>
      </div>
      <Posts
        initialPosts={posts}
        total={total}
        filters={JSON.stringify(POSTS_FILTERS.eventos)}
      />
      {posts.length === 0 && (
        <p className="text-2xl text-accent">
          Todavía non hai eventos para {labelForId[provincia]}, volve pronto!
        </p>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const id = ctx.params.id
  const { posts, total } = await getEventosInLocation(id as string)

  return {
    props: { posts, total, provincia: id as Provincia },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths<{ id: keyof typeof labelForId }> =
  async () => {
    const ids = ['corunha', 'pontevedra', 'ourense', 'lugo']
    const paths = ids.map((id: Provincia) => ({
      params: { id },
    }))

    return {
      paths,
      fallback: false,
    }
  }

export default Eventos
