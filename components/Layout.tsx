import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Header from './Header'
import Footer from './Footer'

type Props = {}

const Layout: FunctionComponent<Props> = ({ children }) => {
  const { asPath } = useRouter()
  const index = asPath === '/'

  return (
    <>
      <Header />
      <div className="relative">
        {index && (
          <div className="relative h-[100px] overflow-hidden">
            <img
              src="/header.jpg"
              className="object-cover transform scale-110 filter blur-md h-[100px] w-full"
            />
          </div>
        )}
        <main
          className={classNames(
            'mx-auto max-w-4xl flex items-start justify-center',
            {
              index,
            }
          )}
        >
          <div className="p-2">{children}</div>
        </main>
      </div>
      <Footer />
      <style jsx>{`
        main {
          min-height: calc(100vh - var(--header-height) - var(--footer-height));
        }
        main.index {
          min-height: calc(
            100vh - var(--header-height) - var(--footer-height) - 100px
          );
        }
      `}</style>
    </>
  )
}

export default Layout
