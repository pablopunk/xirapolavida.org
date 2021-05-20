import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { SITE_URL } from './constants'

type Props = { title: string; description?: string; imageUrl?: string }

const Seo: FunctionComponent<Props> = ({ title, description, imageUrl }) => {
  const { asPath } = useRouter()

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: SITE_URL + asPath,
        title,
        description,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                alt: title
              }
            ]
          : []
      }}
    />
  )
}

export default Seo
