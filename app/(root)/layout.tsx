import { PropsWithChildren } from 'react'
import Navbar from "@/components/navbar"
import TextForm from "@/components/text-form"

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex flex-col">
      <Navbar />      
      <TextForm />
      <main className="h-full">{children}</main>
    </div>
  )
}

export default RootLayout
