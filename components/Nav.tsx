import { FunctionComponent, useEffect, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import {
  BiCalendarWeek,
  BiBuildingHouse,
  BiDotsVerticalRounded,
  BiFemaleSign,
} from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { FaPeopleCarry } from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import Link from 'next/link'
import classNames from 'classnames'
import { useLockBodyScroll, useMedia } from 'react-use'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'

const MAX_LINKS_DESKTOP = 5

const links = [
  {
    label: 'Aloxamento',
    Icon: BiBuildingHouse,
    url: '/formulario-e-axuda-para-a-coordinacion-da-acolhida-comunitaria',
  },
  {
    label: 'Eventos',
    Icon: BiCalendarWeek,
    url: '/eventos',
  },
  {
    label: 'Colabora',
    Icon: FaPeopleCarry,
    url: '/colabora',
  },
  {
    label: 'Feminismo',
    Icon: BiFemaleSign,
    url: '/feminismo',
  },
  {
    label: 'Colectivos',
    Icon: BsPeopleFill,
    url: '/colectivos',
  },
  {
    label: 'Blogue Europeo',
    Icon: FiExternalLink,
    url: 'https://viajezapatista.eu/gl/',
  },
  {
    label: 'Blogue Zapatista',
    Icon: FiExternalLink,
    url: 'http://enlacezapatista.ezln.org.mx/',
  },
]

const Mobile = ({ isOpen, asPath }) => (
  <div
    className={classNames(
      'fixed md:hidden bg-bgDim left-0 top-[76px] bottom-0 right-0 h-screen p-4 text-4xl z-10 overflow-hidden',
      {
        'hidden md:flex': !isOpen,
        block: isOpen,
      }
    )}
  >
    {links.map((link) => (
      <Link key={link.url} href={link.url}>
        <a
          className={classNames(
            'flex items-center px-2 py-3 border-t last:border-b text-lg rounded-md',
            {
              'text-accent': asPath === link.url,
            }
          )}
        >
          <link.Icon className="pr-1 md:pr-0 md:pl-1" />
          <span>{link.label}</span>
        </a>
      </Link>
    ))}
  </div>
)

const Desktop = ({ asPath }) => {
  const lg = useMedia('(min-width: 1024px)')
  const xl = useMedia('(min-width: 1280px)')
  const [navLinks, setNavLinks] = useState([])
  const [menuLinks, setMenuLinks] = useState([])

  useEffect(() => {
    const takeSomeLinksOut = xl ? 0 : lg ? 1 : 2
    const maxOnNav = MAX_LINKS_DESKTOP - takeSomeLinksOut

    setNavLinks(links.slice(0, maxOnNav))
    setMenuLinks(links.slice(maxOnNav, links.length))
  }, [lg, xl])

  return (
    <div className="hidden md:flex md:items-center">
      {navLinks.map((link) => (
        <div key={'nav-' + link.url}>
          <Link href={link.url}>
            <a
              className={classNames(
                'text-lg flex items-center p-4 hover:bg-bg transition hover:text-accent rounded-md hover:shadow-md',
                {
                  'text-accent': link.url === asPath,
                }
              )}
            >
              <span className="pr-1">
                <link.Icon />
              </span>
              <span>{link.label}</span>
            </a>
          </Link>
        </div>
      ))}
      <div className="p-4 text-lg">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                className={classNames(
                  'flex items-center px-2 border rounded-md focus:outline-none transition-colors',
                  {
                    'text-accent': open,
                  }
                )}
              >
                <BiDotsVerticalRounded />
                <span>Máis</span>
              </Menu.Button>
              <Menu.Items className="absolute flex flex-col border rounded-md shadow-lg z-1 bg-bgDim right-4">
                {menuLinks.map((link) => (
                  <Menu.Item key={'menu-' + link.url}>
                    <Link href={link.url}>
                      <a
                        className={classNames(
                          'flex items-center cursor-pointer px-4 py-2 border-b last:border-none hover:bg-bg hover:text-accent',
                          {
                            'text-accent': link.url === asPath,
                          }
                        )}
                      >
                        <span className="pr-1">
                          <link.Icon />
                        </span>
                        <span>{link.label}</span>
                      </a>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}

const Nav: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { asPath } = useRouter()

  useLockBodyScroll(isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [asPath])

  return (
    <nav className="relative z-10">
      <button onClick={() => setIsOpen(!isOpen)} className="block md:hidden">
        {isOpen ? (
          <MdClose className="text-2xl" />
        ) : (
          <HiMenuAlt3 className="text-2xl" />
        )}
      </button>
      <Mobile isOpen={isOpen} asPath={asPath} />
      <Desktop asPath={asPath} />
    </nav>
  )
}

export default Nav
