import { cache } from 'react'
import { QueryClient } from '@tanstack/react-query'

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          cacheTime: Infinity,
          retry: 3,
          refetchOnWindowFocus: false,
        },
      },
    })
)

export default getQueryClient
