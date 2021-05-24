import Cosmic from 'cosmicjs'
import { Post } from './types'

const api = Cosmic()

const bucket = api.bucket({
  slug: process.env.COSMICJS_BUCKET_SLUG,
  read_key: process.env.COSMICJS_READ_KEY
})

export async function getPosts(): Promise<Post[]> {
  return (
    bucket
      .getObjects({
        query: { type: 'publicacions' },
        props: 'slug,title,content,thumbnail,published_at,metadata'
      })
      .then(data => data.objects)
      // .then(x => {
      //   console.log(x)
      //   return x
      // })
      .catch(() => [])
  )
}

export async function getPost(slug: string) {
  return bucket
    .getObjects({
      query: { slug },
      props: 'title,content,slug,thumbnail,published_at,metadata'
    })
    .then(data => data.objects[0])
    .catch(() => null)
}

export async function getColectivos() {
  return bucket
    .getObjects({ query: { id: '60a2b4aca3d4f40008148afc' } })
    .then(data => data.objects[0])
    .then(data => data?.metadata?.text?.split('\n'))
    .catch(() => null)
}
