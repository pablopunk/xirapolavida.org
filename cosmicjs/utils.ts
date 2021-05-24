import { Post } from 'cosmicjs/types'

export const isEvent = (post: Post) => {
  return (
    post.metadata?.categories
      ?.split(',')
      .some(category => category === 'eventos') || false
  )
}
