'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigationItems = [
  { key: 'home' as const, href: '' },
  { key: 'team' as const, href: 'team' },
  { key: 'projects' as const, href: 'project' },
  { key: 'calendar' as const, href: 'calendar' },
]

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ')
}

function isActive(pathname: string, lang: string, href: string) {
  const fullPath = `/${lang}${href ? `/${href}` : ''}`
  return pathname === fullPath
}

interface AppDict {
  app: {
    nav: Record<string, string>
    notifications: string
    openMenu: string
    userNav: {
      profile: string
      settings: string
      signOut: string
    }
  }
}

interface ApplicationShellProps {
  dict: AppDict
  lang: string
  children: React.ReactNode
}

export default function ApplicationShell({ dict, lang, children }: ApplicationShellProps) {
  const pathname = usePathname()
  const translations = dict.app

  const userNavigation = [
    { name: translations.userNav.profile, href: '#' },
    { name: translations.userNav.settings, href: '#' },
    { name: translations.userNav.signOut, href: '#' },
  ]

  return (
    <>
      <Disclosure
        as="nav"
        className="relative bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=sky&shade=600"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=sky&shade=500"
                  className="h-8 w-auto not-dark:hidden"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${lang}${item.href ? `/${item.href}` : ''}`}
                    className={classNames(
                      isActive(pathname, lang, item.href)
                        ? 'border-sky-600 text-gray-900 dark:border-sky-500 dark:text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white',
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                    )}
                  >
                    {translations.nav[item.key]}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-sky-600 dark:hover:text-white dark:focus:outline-sky-500"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">{translations.notifications}</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-500">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">{translations.openMenu}</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:-outline-offset-1 focus:outline-sky-600 dark:hover:bg-white/5 dark:hover:text-white dark:focus:outline-sky-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">{translations.openMenu}</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 pt-2 pb-3">
            {navigationItems.map((item) => (
              <DisclosureButton
                key={item.key}
                as={Link}
                href={`/${lang}${item.href ? `/${item.href}` : ''}`}
                className={classNames(
                  isActive(pathname, lang, item.href)
                    ? 'border-sky-600 bg-sky-50 text-sky-700 dark:border-sky-500 dark:bg-sky-600/10 dark:text-sky-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white',
                  'block border-l-4 py-2 pr-4 pl-3 text-base font-medium',
                )}
              >
                {translations.nav[item.key]}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 pb-3 dark:border-white/10">
            <div className="flex items-center px-4">
              <div className="shrink-0">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">Tom Cook</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">tom@example.com</div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-sky-600 dark:hover:text-white dark:focus:outline-sky-500"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">{translations.notifications}</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <main>{children}</main>
    </>
  )
}
