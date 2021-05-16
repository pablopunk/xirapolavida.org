import Link from 'next/link'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { GiPaperBoat } from 'react-icons/gi'
import Nav from './Nav'
import { useRouter } from 'next/router'

type Props = {}

const Layout: FunctionComponent<Props> = ({ children }) => {
  const { asPath } = useRouter()

  return (
    <>
      <header className="flex items-center justify-between py-2 px-4 bg-bgDim">
        <Link href="/">
          <a className="text-accent2 text-6xl flex items-center">
            <GiPaperBoat />
            <h1 className="text-2xl font-bold px-2">
              <span className="text-accent">Xira pola</span> Vida
            </h1>
          </a>
        </Link>
        <Nav />
      </header>
      {asPath === '/' && (
        <div className="relative h-[100px] w-[110%] -ml-3 overflow-hidden">
          <Image
            src="/header.jpg"
            layout="fill"
            objectFit="cover"
            className="filter blur-md"
          />
        </div>
      )}
      <div className="mx-auto max-w-4xl flex items-center justify-center">
        <main className="p-2">{children}</main>
      </div>
      <footer className="bg-fg h-[60px] flex items-center justify-center">
        <p className="text-bgDim opacity-60 px-4">
          Coordinadora galega da Xira zapatista pola Vida. 2021
        </p>
        <a
          href="mailto:xirapolavida@riseup.net px-4"
          className="text-bgDim opacity-80"
        >
          xirapolavida@riseup.net
        </a>
      </footer>
    </>
  )
}

export default Layout
