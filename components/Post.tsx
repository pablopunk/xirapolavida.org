import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import Image from 'next/image'

type Props = { post: Post }

const PostComponent: FunctionComponent<Props> = ({ post }) => (
  <div>
    <div className="relative max-w-3xl">
      <Image
        src={post.thumbnail}
        width="1920"
        height="1080"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="text-center">
      {new Date(post.published_at).toLocaleDateString()}
    </div>
    <h2 className="text-3xl pt-2 pb-4 text-accent text-center">{post.title}</h2>
    <div
      className="max-w-2xl mx-auto px-3"
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  </div>
)

export default PostComponent
