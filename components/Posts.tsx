import React, { FunctionComponent } from 'react'
import { Post } from 'cosmicjs/types'
import Image from 'next/image'
import { parseParagraphs } from 'utils/htmlParser'
import Link from 'next/link'
import { isEvent } from 'cosmicjs/utils'
import { BiCalendarWeek } from 'react-icons/bi'
import { useState } from 'react'
import LoadMore from './LoadMore'

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
        const date = new Date(post.published_at).toLocaleDateString()
        const content = parseParagraphs(post.content)
          .map((node) => node.text)
          .filter(Boolean)
          .slice(0, 1)

        return (
          <div key={post.slug}>
            <Link href={`/${post.slug}`} passHref>
              <a className="flex flex-col items-center mx-auto mb-10 rounded-lg md:mx-0 md:flex-row md:bg-bgDim md:shadow-lg group hover:cursor-pointer">
                <div>
                  <div className="hidden md:block relative w-[210px] h-[150px] rounded-lg shadow-xl">
                    <Image
                      src={post.thumbnail}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all rounded-tl-lg rounded-bl-lg filter group-hover:grayscale group-hover:opacity-80"
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
                <div className="w-full h-full pr-4 my-auto ml-4">
                  <div className="flex items-center justify-between opacity-70">
                    <span>{date}</span>
                    {isEvent(post) && (
                      <span className="flex items-center text-accent2">
                        <span>
                          <BiCalendarWeek />
                        </span>
                        <span className="pl-1">Evento</span>
                      </span>
                    )}
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
