import { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import Image from 'next/image'
import { parseParagraphs } from 'utils/htmlParser'
import Link from 'next/link'

type Props = { posts: Post[] }

const Posts: FunctionComponent<Props> = ({ posts }) => (
  <div className="">
    {posts.map(post => {
      const date = new Date(post.published_at).toLocaleDateString()
      const content = parseParagraphs(post.content)
        .map(node => node.rawText)
        .filter(Boolean)
        .slice(0, 3)

      return (
        <div key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <a className="mx-auto mb-10 md:mx-0 flex flex-col md:flex-row items-center md:bg-bgDim rounded-lg md:shadow-lg group hover:cursor-pointer">
              <div className="group-hover:opacity-90 transition-opacity">
                <div className="hidden md:block relative w-[210px] h-[150px] rounded-lg shadow-xl">
                  <Image
                    src={post.thumbnail}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-tl-lg rounded-bl-lg"
                  />
                </div>
                <div className="block md:hidden">
                  <Image
                    src={post.thumbnail}
                    width="1920"
                    height="1080"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="ml-4 h-full w-full my-auto pr-4">
                <div className="opacity-70">{date}</div>
                <h3 className="text-2xl my-2 block text-accent group-hover:text-accent2 transition-colors">
                  {post.title}
                </h3>
                <div className="hidden md:block max-w-lg">
                  <div className="line-clamp-2">
                    {content.map(html => (
                      <p
                        key={html}
                        dangerouslySetInnerHTML={{ __html: html }}
                      ></p>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      )
    })}
  </div>
)

export default Posts
