import Cosmic from 'cosmicjs'
import { Post, Tag } from './types'

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

export function getFilterForTags(tags: Tag[]) {
  return { 'metadata.tags': { $in: tags } }
}

export async function getPostsWithTags(
  tags: Tag[],
  options?: Options
): Promise<QueryResult> {
  return getPosts({ ...options, filters: getFilterForTags(tags) })
}

export async function getPosts(options?: Options): Promise<{
  posts: Post[]
  total: number
}> {
  return bucket
    .getObjects({
      query: { type: 'publicacions', ...(options?.filters || {}) },
      props: 'slug,title,content,thumbnail,created_at,metadata',
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

export async function getAllPosts(): Promise<Post[]> {
  return bucket
    .getObjects({
      query: { type: 'publicacions' },
      props: 'slug,title,content,thumbnail,created_at,metadata',
      sort: '-created_at',
    })
    .then((data) => data.objects || [])
    .catch(() => [])
}

export async function getPost(slug: string) {
  return bucket
    .getObjects({
      query: { slug },
      props: 'title,content,slug,thumbnail,created_at,metadata',
    })
    .then((data) => data.objects[0])
    .catch(() => null)
}
