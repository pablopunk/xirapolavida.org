import Cosmic from 'cosmicjs'
import { Post } from './types'

const PAGE_SIZE = 5

const api = Cosmic()
const bucket = api.bucket({
  slug: process.env.COSMICJS_BUCKET_SLUG,
  read_key: process.env.COSMICJS_READ_KEY,
})

type Options = {
  page?: number
  filters?: { [key: string]: any } // e.g 'metadata.categories': { $regex: 'eventos' }
}

type QueryResult = {
  posts: Post[]
  total: number
}

export const POSTS_FILTERS = {
  eventos: {
    'metadata.categories': { $regex: 'eventos' },
  },
  colabora: {
    'metadata.categories': { $regex: 'colabora' },
  },
  feminismo: {
    'metadata.categories': { $regex: 'feminismo' },
  },
}

export async function getFeminismo(options?: Options): Promise<QueryResult> {
  return getPosts({ ...options, filters: POSTS_FILTERS.feminismo })
}

export async function getColabora(options?: Options): Promise<QueryResult> {
  return getPosts({ ...options, filters: POSTS_FILTERS.colabora })
}

export async function getEventos(options?: Options): Promise<QueryResult> {
  return getPosts({
    ...options,
    filters: POSTS_FILTERS.eventos,
  })
}

export async function getEventosInLocation(
  id: string,
  options?: Options
): Promise<QueryResult> {
  return getPosts({
    ...options,
    filters: { 'metadata.categories': { $regex: id } },
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
      skip: PAGE_SIZE * options?.page || 0,
    })
    .then((data) => ({
      posts: data.objects,
      total: data.total,
    }))
    .catch(() => ({ posts: [], total: 0 }))
}

export async function getPost(slug: string) {
  return bucket
    .getObjects({
      query: { slug },
      props: 'title,content,slug,thumbnail,published_at,metadata',
    })
    .then((data) => data.objects[0])
    .catch(() => null)
}
