import { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex flex-col">
      <main className="h-full">{children}</main>
    </div>
  )
}

export default RootLayout
