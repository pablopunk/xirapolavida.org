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

const MAX_LINKS_DESKTOP = 4

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
  const isWide = useMedia('(min-width: 1024px)')
  const minus = isWide ? 0 : 1
  const firstLinks = links.slice(0, MAX_LINKS_DESKTOP - minus)
  const restLinks = links.slice(MAX_LINKS_DESKTOP - minus, links.length)

  return (
    <div className="hidden md:flex">
      {firstLinks.map((link) => (
        <div key={link.url}>
          <Link href={link.url}>
            <a
              className={classNames(
                'text-lg flex items-center p-4 hover:bg-bg transition-colors hover:text-accent rounded-md',
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
                {restLinks.map((link) => (
                  <Menu.Item key={link.url}>
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
