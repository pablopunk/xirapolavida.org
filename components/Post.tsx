import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
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
  h1,
  h2,
  h3 {
    margin: 2rem 0 1rem;
    font-size: 2rem;
  }
  iframe {
    width: 100%;
    height: 400px;
  }
  ul > li {
    margin-left: 1rem;
  }
`

type Props = { post: Post }

const PostComponent: FunctionComponent<Props> = ({ post }) => (
  <div>
    <div className="relative w-full max-w-3xl mx-auto">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          className="mx-auto rounded-lg"
          loading="lazy"
        />
      )}
    </div>
    {post.thumbnail && (
      <div className="text-center">
        {new Date(post.published_at).toLocaleDateString()}
      </div>
    )}
    {post.title && (
      <h2 className="pt-2 pb-4 text-3xl text-center text-accent">
        {post.title}
      </h2>
    )}
    <SRLWrapper>
      <Body
        className="max-w-2xl px-3 mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></Body>
    </SRLWrapper>
  </div>
)

export default PostComponent
