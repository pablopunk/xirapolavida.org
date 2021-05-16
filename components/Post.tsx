import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import Image from 'next/image'
import styled from 'styled-components'
import { SRLWrapper } from 'simple-react-lightbox'

const Body = styled.article`
  p {
    margin: 1rem 0;
  }
  blockquote {
    border-left: 3px solid var(--color-accent);
    padding-left: 1rem;
    font-style: italic;
  }
  a {
    color: var(--color-accent2);
  }
  img {
    width: 100%;
    transition: all 0.4s;
  }
  img:hover {
    cursor: zoom-in;
    filter: grayscale(80%);
  }
  h3 {
    margin: 2rem 0 1rem;
    font-size: 2rem;
  }
`

type Props = { post: Post }

const PostComponent: FunctionComponent<Props> = ({ post }) => (
  <div>
    <div className="text-center">
      {new Date(post.published_at).toLocaleDateString()}
    </div>
    <h2 className="text-3xl pt-2 pb-4 text-accent text-center">{post.title}</h2>
    <div className="relative max-w-3xl mx-auto">
      <Image
        src={post.thumbnail}
        width="1920"
        height="1080"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <SRLWrapper>
      <Body
        className="max-w-2xl mx-auto px-3"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></Body>
    </SRLWrapper>
  </div>
)

export default PostComponent
