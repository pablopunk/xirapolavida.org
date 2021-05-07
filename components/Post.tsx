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
      />
    </div>
    <h2 className="text-3xl py-5 text-accent">{post.title}</h2>
    <div
      className="max-w-xl mx-auto"
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  </div>
)

export default PostComponent
