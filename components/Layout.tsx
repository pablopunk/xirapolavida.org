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
        <div className="relative h-[100px]">
          <Image
            src="/header.jpg"
            layout="fill"
            objectFit="cover"
            className="filter blur-md transform scale-110"
          />
        </div>
      )}
      <div className="mx-auto max-w-4xl flex items-center justify-center">
        <main className="p-2">{children}</main>
      </div>
      <div className="relative h-[60px]">
        <div className="bg-fg text-bgDim opacity-70 flex items-center justify-center z-10 h-[60px] absolute left-0 right-0">
          <p className="px-4">
            Coordinadora galega da Xira zapatista pola Vida. 2021
          </p>
          <a
            href="mailto:xirapolavida@riseup.net px-4"
            className="px-4 text-accent2"
          >
            xirapolavida@riseup.net
          </a>
        </div>
        <Image
          src="/header.jpg"
          layout="fill"
          objectFit="cover"
          className="filter blur-md transform scale-110 "
        />
      </div>
    </>
  )
}

export default Layout
