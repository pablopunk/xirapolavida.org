import React, { FunctionComponent } from 'react'
import { Post, Tag } from 'cosmicjs/types'
import { parseParagraphs } from 'utils/htmlParser'
import Link from 'next/link'
import { useState } from 'react'
import LoadMore from './LoadMore'
import classNames from 'classnames'

const DISPLAY_TAGS: Tag[] = ['eventos', 'colabora']

const colorForTag: Partial<Record<Tag, string>> = {
  eventos: 'text-accent2 bg-bgDim border border-accent2',
  colabora: 'text-pink-500 bg-bgDim border border-pink-500',
}

type Props = {
  initialPosts: Post[]
  total: number
  filters?: string
}

const Posts: FunctionComponent<Props> = ({ initialPosts, total, filters }) => {
  const [{ posts, page }, setState] = useState({ posts: initialPosts, page: 1 })

  const fetchMorePosts = () => {
    const url = filters
      ? `/api/posts/${page}?filters=${filters}`
      : `/api/posts/${page}?`
    return fetch(url)
      .then((r) => r.json())
      .then((responseData) => {
        setState({
          page: page + 1,
          posts: [...posts, ...responseData.posts],
        })
      })
  }

  const canLoadMore = posts.length < total

  return (
    <div>
      {posts.map((post) => {
        const date = new Date(post.created_at).toLocaleDateString()
        const content = parseParagraphs(post.content)
          .map((node) => node.text)
          .filter(Boolean)
          .slice(0, 1)

        return (
          <div key={post.slug} className="relative">
            <div className="absolute z-10 flex right-2 -top-2">
              {post.metadata?.tags
                ?.filter((tag) => DISPLAY_TAGS.includes(tag))
                .map((tag) => (
                  <Link key={post.slug + tag} href={`/${tag}`}>
                    <a
                      className={classNames(
                        'px-1 rounded-md ml-1 hover:opacity-60 transition-opacity',
                        colorForTag[tag]
                      )}
                    >
                      {tag}
                    </a>
                  </Link>
                ))}
            </div>
            <Link href={`/${post.slug}`} passHref>
              <a className="flex flex-col items-center mx-auto mb-10 rounded-lg md:mx-0 md:flex-row md:bg-bgDim md:shadow-lg group hover:cursor-pointer">
                <div>
                  <div className="hidden md:block relative w-[210px] h-[150px] rounded-lg shadow-xl">
                    <img
                      src={post.thumbnail}
                      className="object-cover w-full h-full transition-all rounded-tl-lg rounded-bl-lg filter group-hover:grayscale group-hover:opacity-80"
                      loading="lazy"
                    />
                  </div>
                  <div className="block md:hidden h-[300px] relative">
                    <img
                      src={post.thumbnail}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="w-full h-full pr-4 my-auto ml-4">
                  <div className="opacity-70">
                    <span>{date}</span>
                  </div>
                  <h3 className="block my-2 text-2xl transition-colors text-accent group-hover:text-accent2">
                    {post.title}
                  </h3>
                  <div className="hidden max-w-lg md:block">
                    <div className="line-clamp-1">
                      {content.map((html) => (
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
      <LoadMore canLoadMore={canLoadMore} onLoadMore={fetchMorePosts} />
    </div>
  )
}

export default Posts
