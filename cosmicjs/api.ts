import Cosmic from 'cosmicjs'
import { Post } from './types'

const api = Cosmic()

const bucket = api.bucket({
  slug: process.env.COSMICJS_BUCKET_SLUG,
  read_key: process.env.COSMICJS_READ_KEY
})

export async function getPosts(): Promise<Post[]> {
  return bucket
    .getObjects({
      query: { type: 'publicacions' },
      props: 'slug,title,content,thumbnail'
    })
    .then(data => data.objects)
    .catch(() => [])
}

export async function getPost(slug: string) {
  return bucket
    .getObjects({
      query: { slug },
      props: 'title,content,slug,thumbnail'
    })
    .then(data => data.objects[0])
    .catch(() => null)
}
