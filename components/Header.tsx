import Link from 'next/link'
import Logo from 'components/Logo'
import Nav from 'components/Nav'
import { IoIosStar } from 'react-icons/io'

const Header = () => (
  <header className="flex items-center justify-between px-4 py-2 bg-bgDim h-header">
    <Link href="/">
      <a className="flex items-center text-6xl text-accent">
        <Logo />
        <h1 className="flex px-2 text-2xl font-bold whitespace-nowrap">
          <span className="pr-[5px]">Xira pola </span>
          <span className="flex items-center text-danger">
            Vida
            <IoIosStar />
          </span>
        </h1>
      </a>
    </Link>
    <Nav />
  </header>
)

export default Header
