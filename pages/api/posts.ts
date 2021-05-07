import { getPosts } from 'cosmicjs/api'

export default async function PostsApi(_req, res) {
  const posts = await getPosts()

  res.send({ posts })
}
