import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import PostComponent from 'components/Post'
import { getPost, getPosts } from 'cosmicjs/api'
import { useRouter } from 'next/router'
import Seo from 'components/Seo'
import { parseParagraphs } from 'utils/htmlParser'

type Props = { post: Post }

const PostPage: FunctionComponent<Props> = ({ post }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p className="mt-6 text-xl">Cargando publicación...</p>
  }

  let description = post.metadata.description

  if (!description) {
    description = parseParagraphs(post.content)
      .map((node) => node.text)
      .filter(Boolean)
      .join('\n')
  }

  return (
    <>
      <Seo
        title={post.title}
        description={description}
        imageUrl={post.thumbnail}
      />
      <PostComponent post={post} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { slug } = ctx.params
  const post = await getPost(slug as string)

  if (!post) {
    return { notFound: true }
  }

  return { props: { post }, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { posts } = await getPosts()
  const paths = posts.map((post) => ({ params: { slug: post.slug } }))

  return { paths, fallback: true }
}

export default PostPage
