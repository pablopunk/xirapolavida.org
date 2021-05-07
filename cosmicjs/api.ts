import Cosmic from 'cosmicjs'
import { Post } from './types'

const api = Cosmic()

const bucket = api.bucket({
  slug: process.env.COSMICJS_BUCKET_SLUG,
  read_key: process.env.COSMICJS_READ_KEY
})

export async function getPosts(): Promise<Post[]> {
  const data = await bucket.getObjects({
    query: { type: 'publicacions' },
    props: 'slug,title,content,thumbnail'
  })

  const posts = data.objects

  return posts
}

export async function getPost(slug: string) {
  const data = await bucket.getObjects({
    query: { slug },
    props: 'title,content,slug,thumbnail'
  })

  return data.objects[0]
}
