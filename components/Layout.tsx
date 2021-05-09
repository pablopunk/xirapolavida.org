import Link from 'next/link'
import { FunctionComponent } from 'react'
import { IoIosStar } from 'react-icons/io'
import Nav from './Nav'

type Props = {}

const Layout: FunctionComponent<Props> = ({ children }) => (
  <>
    <header className="flex items-center justify-between py-2 px-4 bg-bgDim">
      <Link href="/">
        <a className="text-accent text-6xl flex items-center">
          <IoIosStar />
          <h1 className="text-2xl font-bold px-2">
            <span className="text-accent2">Xira pola</span> Vida
          </h1>
        </a>
      </Link>
      <Nav />
    </header>
    <div className="mx-auto max-w-4xl flex items-center justify-center">
      <main className="p-2">{children}</main>
    </div>
  </>
)

export default Layout
