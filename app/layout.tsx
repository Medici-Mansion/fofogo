import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider, auth } from '@clerk/nextjs'
import ThemeProvider from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/components/query-provider'
import Navbar from '@/components/navbar'
import { getDefaultMetadata } from '@/lib/headUtils'
import localFont from '@next/font/local'
import { cn } from '@/lib/utils'

const pretendard = localFont({
  src: './PretendardVariable.woff2',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
})

export const metadata: Metadata = {
  ...getDefaultMetadata(),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  return (
    <ClerkProvider>
      <html
        lang="ko"
        className={cn(
          'overflow-y-hidden sm:overflow-y-auto',
          pretendard.className
        )}
        suppressHydrationWarning
      >
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <QueryProvider>
              {userId && <Navbar />}
              {children}
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
