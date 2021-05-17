import { FunctionComponent } from 'react'
import { getColectivos } from 'cosmicjs/api'

type Props = { colectivos: string }

const Colectivos: FunctionComponent<Props> = ({ colectivos }) => {
  return (
    <div>
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

  return { props: { colectivos } }
}

export default Colectivos
