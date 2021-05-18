import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import PostComponent from 'components/Post'
import { getPost, getPosts } from 'cosmicjs/api'
import { useRouter } from 'next/router'

type Props = { post: Post }

const PostPage: FunctionComponent<Props> = ({ post }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p className="mt-6 text-xl">Cargando publicación...</p>
  }

  return <PostComponent post={post} />
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
  const { slug } = ctx.params
  const post = await getPost(slug as string)

  if (!post) {
    return { notFound: true }
  }

  return { props: { post }, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = await getPosts()
  const paths = posts.map(post => ({ params: { slug: post.slug } }))

  return { paths, fallback: true }
}

export default PostPage
