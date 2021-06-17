export type Tag =
  | 'colabora'
  | 'eventos'
  | 'pontevedra'
  | 'corunha'
  | 'ourense'
  | 'lugo'
  | 'feminismo'

export type Post = {
  title: string
  slug: string
  content: string // html
  thumbnail: string // url
  created_at: string
  metadata: {
    tags?: Tag[]
    description?: string
  }
}
