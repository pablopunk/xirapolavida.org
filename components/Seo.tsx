import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { SITE_NAME, SITE_URL } from './constants'

type Props = { title: string; description?: string; imageUrl?: string }

const Seo: FunctionComponent<Props> = ({ title, description, imageUrl }) => {
  const { asPath } = useRouter()

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={SITE_URL + asPath}
      openGraph={{
        url: SITE_URL + asPath,
        title,
        description,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                alt: title,
              },
            ]
          : [],
        site_name: SITE_NAME,
      }}
      twitter={{
        handle: '@xirapolavida',
        site: '@xirapolavida',
        cardType: 'summary_large_image',
      }}
    />
  )
}

export default Seo
