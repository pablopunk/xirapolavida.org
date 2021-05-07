import { getPost } from 'cosmicjs/api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function PostApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query

  if (!slug) {
    res.end(404)
    return 404
  }

  const post = await getPost(slug as string)

  res.send({ post })
}
