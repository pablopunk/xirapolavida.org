import React, { FunctionComponent } from 'react'
import SimpleReactLightbox from 'simple-react-lightbox'
import 'tailwindcss/tailwind.css'
import 'components/styles.css'
import Layout from 'components/Layout'

const App: FunctionComponent<any> = ({ Component, pageProps }) => (
  <Layout>
    <SimpleReactLightbox>
      <Component {...pageProps} />
    </SimpleReactLightbox>
  </Layout>
)

export default App
