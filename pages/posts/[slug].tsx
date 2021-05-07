import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { API_URL } from 'constants/api'
import PostComponent from 'components/Post'

type Props = { post: Post }

const PostPage: FunctionComponent<Props> = ({ post }) => (
  <PostComponent post={post} />
)

export const getStaticProps: GetStaticProps<Props> = async ctx => {
  const { slug } = ctx.params
  const { post } = await fetch(API_URL + '/post?slug=' + slug).then(r =>
    r.json()
  )

  if (!post) {
    return { notFound: true }
  }

  return { props: { post } }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { posts } = await fetch(API_URL + '/posts').then(r => r.json())
  const paths = posts.map(post => ({ params: { slug: post.slug } }))

  return { paths, fallback: false }
}

export default PostPage
