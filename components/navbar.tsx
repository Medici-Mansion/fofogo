'use client'

import * as React from 'react'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { UserButton, useUser } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
})

export const Navbar = () => {
  const { isLoaded } = useUser()
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <LucideIcons.Menu className="block md:hidden" />
        <Link href={'/'}>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            FourFourGo
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        {isLoaded ? <UserButton afterSignOutUrl="/" /> : <>Loading...</>}
      </div>
    </div>
  )
}

export default Navbar
