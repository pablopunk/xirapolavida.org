import Cosmic from 'cosmicjs'
import { Post } from './types'

const PAGE_SIZE = 5

const api = Cosmic()
const bucket = api.bucket({
  slug: process.env.COSMICJS_BUCKET_SLUG,
  read_key: process.env.COSMICJS_READ_KEY
})

type Options = {
  page?: number
  filters?: { [key: string]: any } // e.g 'metadata.categories': { $regex: 'eventos' }
}

export const POSTS_FILTERS = {
  eventos: {
    'metadata.categories': { $regex: 'eventos' }
  }
}

export async function getEventos(options?: Options): Promise<{
  posts: Post[]
  total: number
}> {
  return getPosts({
    ...options,
    filters: POSTS_FILTERS.eventos
  })
}

export async function getPosts(options?: Options): Promise<{
  posts: Post[]
  total: number
}> {
  return bucket
    .getObjects({
      query: { type: 'publicacions', ...(options?.filters || {}) },
      props: 'slug,title,content,thumbnail,published_at,metadata',
      limit: PAGE_SIZE,
      sort: '-created_at',
      skip: PAGE_SIZE * options?.page || 0
    })
    .then(data => ({
      posts: data.objects,
      total: data.total
    }))
    .catch(() => [])
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
