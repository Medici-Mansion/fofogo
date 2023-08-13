'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { UserButton, useUser } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
})

export const Navbar = () => {
  const { isLoaded } = useUser()
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const shoudHideNavPathList = ['/speech']

  const setStyleFromNavHeight = () => {
    if (navRef.current) {
      document.documentElement.style.setProperty(
        '--nav-height',
        navRef.current.offsetHeight + 'px'
      )
    }
  }
  useLayoutEffect(() => {
    navRef.current?.addEventListener('resize', setStyleFromNavHeight)
    setStyleFromNavHeight()
    return () => {
      navRef.current?.removeEventListener('resize', setStyleFromNavHeight)
    }
  }, [])
  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16',
        shoudHideNavPathList.includes(pathname) &&
          'transition-all -translate-y-full'
      )}
    >
      <div className="flex items-center">
        <Image
          src={'/fofogo_symbol.png'}
          alt="logo"
          className="rounded-lg"
          width={30}
          height={30}
        />
        <Link href={'/'}>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary ml-3',
              font.className
            )}
          >
            fofogo
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        {isLoaded ? <UserButton afterSignOutUrl="/" /> : <>Loading...</>}
      </div>
    </nav>
  )
}

export default Navbar
