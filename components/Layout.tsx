import Link from 'next/link'
import { FunctionComponent } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { IoIosStar } from 'react-icons/io'

type Props = {}

const Layout: FunctionComponent<Props> = ({ children }) => (
  <>
    <header className="flex items-center justify-between py-2 px-4 bg-bgDim">
      <Link href="/">
        <a className="text-accent text-6xl flex items-center">
          <IoIosStar />
          <h1 className="text-2xl font-bold px-2">
            <span className="text-accent2">Galiza</span> Zapatista
          </h1>
        </a>
      </Link>
      <nav>
        <a
          className="flex items-center text-accent2"
          href="http://enlacezapatista.ezln.org.mx/"
        >
          Enlace zapatista
          <FiExternalLink className="pl-1 text-xl" />
        </a>
      </nav>
    </header>
    <div className="container mx-auto">
      <main className="p-2">{children}</main>
    </div>
  </>
)

export default Layout
