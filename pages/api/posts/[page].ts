import { getPosts } from 'cosmicjs/api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function PostsApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = parseInt(req.query.page as string)

  if (isNaN(page)) {
    return res.status(403).send('Page must be a number')
  }

  const { filters } = req.query
  const { posts } = await getPosts({
    page,
    filters: filters ? JSON.parse(filters as string) : undefined
  })

  return res.status(200).send({ posts })
}
