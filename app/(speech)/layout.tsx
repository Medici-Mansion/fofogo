import { PropsWithChildren } from 'react'
import { getDefaultMetadata } from '@/lib/headUtils'
export const metadata = {
  ...getDefaultMetadata(),
}


const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex flex-col">
      <main className="h-full">{children}</main>
    </div>
  )
}

export default RootLayout
