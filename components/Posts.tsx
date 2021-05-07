import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import Image from 'next/image'
import { parseParagraphs } from 'utils/htmlParser'
import Link from 'next/link'

type Props = { posts: Post[] }

const Posts: FunctionComponent<Props> = ({ posts }) => (
  <div className="">
    {posts.map(post => {
      const content = parseParagraphs(post.content)
        .map(node => node.rawText)
        .filter(Boolean)

      return (
        <div
          key={post.slug}
          className="mx-auto mb-10 md:mx-0 flex flex-col md:flex-row items-center"
        >
          <Link href={`/posts/${post.slug}`}>
            <a className="hover:opacity-90 transition-opacity">
              <div className="relative w-[420px] h-[300px] rounded-2xl shadow-xl">
                <Image
                  src={post.thumbnail}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </a>
          </Link>
          <div className="ml-4 h-full my-auto">
            <Link href={`/posts/${post.slug}`}>
              <a className="block text-accent hover:text-accent2 transition-colors">
                <h3 className="text-2xl my-4">{post.title}</h3>
              </a>
            </Link>
            <div className="line-clamp-9 max-w-lg">
              {content.map(html => (
                <p key={html} dangerouslySetInnerHTML={{ __html: html }}></p>
              ))}
            </div>
          </div>
        </div>
      )
    })}
  </div>
)

export default Posts
