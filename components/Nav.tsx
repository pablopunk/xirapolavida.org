import { FunctionComponent, useEffect, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { FaPeopleCarry } from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import Link from 'next/link'
import classNames from 'classnames'
import { useLockBodyScroll } from 'react-use'
import { useRouter } from 'next/router'

const links = [
  {
    label: 'Colectivos',
    Icon: FaPeopleCarry,
    url: '/colectivos'
  },
  {
    label: 'Enlace Zapatista',
    Icon: FiExternalLink,
    url: 'http://enlacezapatista.ezln.org.mx/'
  }
]

const Nav: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { asPath } = useRouter()

  useLockBodyScroll(isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [asPath])

  return (
    <nav className="">
      <button onClick={() => setIsOpen(!isOpen)} className="block md:hidden">
        {isOpen ? (
          <MdClose className="text-2xl" />
        ) : (
          <HiMenuAlt3 className="text-2xl" />
        )}
      </button>
      <div
        className={classNames(
          'fixed bg-bgDim left-0 top-[76px] bottom-0 right-0 h-screen p-4 text-4xl z-10 overflow-hidden',
          'md:relative md:top-0 md:flex md:text-xl md:p-0 md:bg-transparent md:h-full',
          {
            'hidden md:flex': !isOpen,
            block: isOpen
          }
        )}
      >
        {links.map(link => (
          <Link key={link.url} href={link.url}>
            <a className="flex items-center px-2 py-3 md:flex-row-reverse hover:text-accent2 transition-colors border-t last:border-b md:border-none">
              <link.Icon className="pr-1 md:pr-0 md:pl-1 md:text-2xl" />
              <span>{link.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Nav
