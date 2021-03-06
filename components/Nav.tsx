import { Menu } from '@headlessui/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import {
  BiBuildingHouse,
  BiCalendarWeek,
  BiDotsVerticalRounded,
  BiFemaleSign,
  BiMoon,
  BiRss,
} from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { FaPeopleCarry } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { HiChatAlt, HiMenuAlt3 } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { useLockBodyScroll, useMedia } from 'react-use'

const MAX_LINKS_DESKTOP = 5

const links: Array<{
  label: string
  Icon: any
  url?: string
  click?(): void
}> = [
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
    label: 'Contacto',
    Icon: HiChatAlt,
    url: '/contacto',
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
  {
    label: 'RSS',
    Icon: BiRss,
    url: '/rss.xml',
  },
  {
    label: 'Cambiar cores',
    Icon: BiMoon,
    click: () => window['__toggleDarkMode']?.(),
  },
]

const Mobile = ({ isOpen, asPath }) => (
  <div
    className={classNames(
      'fixed md:hidden bg-bgDim left-0 top-[76px] bottom-0 right-0 h-screen p-4 text-4xl overflow-hidden',
      {
        'hidden md:flex': !isOpen,
        block: isOpen,
      }
    )}
  >
    {links.map((link) =>
      'url' in link ? (
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
      ) : (
        <button
          name={link.label}
          title={link.label}
          key={'button:' + link.label}
          onClick={link.click}
          className={classNames(
            'flex items-center px-2 py-3 border-t last:border-b text-lg rounded-md w-full',
            {
              'text-accent': asPath === link.url,
            }
          )}
        >
          <link.Icon className="pr-1 md:pr-0 md:pl-1" />
          <span>{link.label}</span>
        </button>
      )
    )}
  </div>
)

const Desktop = ({ asPath }) => {
  const md = useMedia('(min-width: 700px)')
  const lg = useMedia('(min-width: 1000px)')
  const xl = useMedia('(min-width: 1280px)')
  const [navLinks, setNavLinks] = useState([])
  const [menuLinks, setMenuLinks] = useState([])

  useEffect(() => {
    const takeSomeLinksOut = xl ? 0 : lg ? 1 : md ? 2 : 3
    const maxOnNav = MAX_LINKS_DESKTOP - takeSomeLinksOut

    setNavLinks(links.slice(0, maxOnNav))
    setMenuLinks(links.slice(maxOnNav, links.length))
  }, [lg, xl])

  return (
    <div className="hidden md:flex md:items-center">
      {navLinks.map((link) => (
        <div key={'nav-' + link.url}>
          {'url' in link ? (
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
          ) : (
            <button
              name={link.label}
              title={link.label}
              className={classNames(
                'text-lg flex items-center p-4 hover:bg-bg transition hover:text-accent rounded-md hover:shadow-md',
                {
                  'text-accent': link.url === asPath,
                }
              )}
              onClick={link.click}
            >
              <span className="pr-1">
                <link.Icon />
              </span>
              <span>{link.label}</span>
            </button>
          )}
        </div>
      ))}
      <div className="p-4 text-lg">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                name="alternar-menu"
                title="Abrir ou pechar o men??"
                className={classNames(
                  'flex items-center px-2 border rounded-md focus:outline-none transition-colors',
                  {
                    'text-accent': open,
                  }
                )}
              >
                <BiDotsVerticalRounded />
                <span>M??is</span>
              </Menu.Button>
              <Menu.Items className="absolute flex flex-col border rounded-md shadow-lg z-1 bg-bgDim right-4">
                {menuLinks.map((link) => (
                  <Menu.Item key={'menu-' + link.url}>
                    {'url' in link ? (
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
                    ) : (
                      <button
                        name={link.label}
                        title={link.label}
                        className={classNames(
                          'flex items-center cursor-pointer px-4 py-2 border-b last:border-none hover:bg-bg hover:text-accent',
                          {
                            'text-accent': link.url === asPath,
                          }
                        )}
                        onClick={link.click}
                      >
                        <span className="pr-1">
                          <link.Icon />
                        </span>
                        <span>{link.label}</span>
                      </button>
                    )}
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
    <nav className="relative z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden"
        name="alternar-menu"
        title="Alternar menu de navegaci??n"
      >
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
