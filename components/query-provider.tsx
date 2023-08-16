'use client'

import { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
