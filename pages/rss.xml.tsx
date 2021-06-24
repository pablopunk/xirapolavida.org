import { SITE_DESC, SITE_NAME, SITE_URL } from 'components/constants'
import { getPosts } from 'cosmicjs/api'
import { Feed } from 'feed'
import { NextPageContext } from 'next'
import { parseParagraphs } from 'utils/htmlParser'

export default function RSS() {
  return null
}

export async function getServerSideProps(context: NextPageContext) {
  if (!context.res) {
    return {
      notFound: true,
    }
  }

  const { res } = context
  const { posts } = await getPosts()

  // posts.forEach((post) => `${SITE_URL}/${post.slug}`)

  const feed = new Feed({
    title: SITE_NAME,
    description: SITE_DESC,
    id: SITE_URL,
    link: SITE_URL,
    language: 'gl',
    image: SITE_URL + '/header.jpg',
    favicon: SITE_URL + '/favicon/favicon.ico',
    copyright: '2021, Pablo Varela',
    generator: 'awesome',
    feedLinks: { xml: SITE_URL + '/rss.xml' },
    author: {
      name: 'Pablo Varela',
      email: 'pablo@pablopunk.com',
      link: 'https://pablopunk.com',
    },
  })

  posts.forEach((post) => {
    const url = `${SITE_URL}/${post.slug}`
    const description =
      parseParagraphs(post.content)
        .map((node) => node.text)
        .filter(Boolean)?.[0] || ''

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: description,
      content: post.content,
      author: [
        {
          name: 'Coordinadora Galega Da Xira Pola Vida',
          email: 'xirapolavida@riseup.net',
          link: 'https://xirapolavida.org',
        },
      ],
      contributor: [
        {
          name: 'Pablo Varela',
          email: 'pablo@pablopunk.com',
          link: 'https://pablopunk.com',
        },
      ],
      date: new Date(post.created_at),
      image: post.thumbnail,
    })
  })

  feed.addCategory('Politics')
  feed.addCategory('Lifestyle')
  feed.addCategory('Feminism')
  feed.addCategory('Anarchism')

  res.setHeader('Content-Type', 'text/xml')
  res.write(feed.rss2())
  res.end()
}
