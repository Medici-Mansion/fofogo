import Loading from '@/components/loading'
import { PropsWithChildren, Suspense } from 'react'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="pt-nav-height sm:pt-0 h-[100dvh] sm:h-full">
      {children}
    </main>
  )
}

export default RootLayout
