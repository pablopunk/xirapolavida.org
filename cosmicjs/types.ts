export type Post = {
  title: string
  slug: string
  content: string // html
  thumbnail: string // url
  published_at: string
  metadata: {
    categories?: string
    description?: string
  }
}
