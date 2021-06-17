import Link from 'next/link'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { GiPaperBoat } from 'react-icons/gi'
import Nav from './Nav'
import { useRouter } from 'next/router'
import classNames from 'classnames'

type Props = {}

const Layout: FunctionComponent<Props> = ({ children }) => {
  const { asPath } = useRouter()
  const index = asPath === '/'

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 bg-bgDim h-header">
        <Link href="/">
          <a className="flex items-center text-6xl text-accent2">
            <GiPaperBoat />
            <h1 className="px-2 text-2xl font-bold">
              <span className="text-accent">Xira pola</span> Vida
            </h1>
          </a>
        </Link>
        <Nav />
      </header>
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
      <footer className="relative h-footer">
        <div className="bg-fg text-bgDim opacity-70 flex items-center justify-center z-10 h-[60px] absolute left-0 right-0">
          <p className="hidden px-4 opacity-80 md:block">
            Coordinadora galega da Xira zapatista pola Vida. 2021
          </p>
          <a href="mailto:xirapolavida@riseup.net" className="px-4">
            xirapolavida@riseup.net
          </a>
        </div>
        <Image
          src="/header.jpg"
          layout="fill"
          objectFit="cover"
          className="transform scale-110 filter blur-md "
        />
      </footer>
      <style jsx>{`
        main {
          position: relative;
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
