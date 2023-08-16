import { cache } from 'react'
import { QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})
const getQueryClient = cache(() => queryClient) || queryClient

export default getQueryClient
