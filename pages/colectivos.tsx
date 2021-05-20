import React, { FunctionComponent } from 'react'
import { getColectivos } from 'cosmicjs/api'
import { SITE_URL } from 'components/constants'
import Seo from 'components/Seo'

type Props = { colectivos: string }

const Colectivos: FunctionComponent<Props> = ({ colectivos }) => {
  return (
    <div>
      <Seo
        title="Colectivos"
        description="Unha lista dos colectivos galegos que participan na organización da benvida e acollida ás Zapatistas"
        imageUrl={SITE_URL + '/header.jpg'}
      />
      <h2 className="text-3xl text-accent2 font-bold my-4">Colectivos</h2>
      <div
        className="mt-7 text-xl"
        dangerouslySetInnerHTML={{ __html: colectivos }}
      ></div>
    </div>
  )
}

export async function getStaticProps() {
  const colectivos = await getColectivos()

  return { props: { colectivos }, revalidate: 60 }
}

export default Colectivos
