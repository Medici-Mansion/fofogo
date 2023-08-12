import axios from 'axios'
import type { UseQueryOptions, QueryKey, QueryFunction } from 'react-query'

type QueryMethod = UseQueryOptions<unknown, unknown, unknown, QueryKey>


const TranslateApi = {
  getCountryCode: {
    queryKey: ['contry-code'],
    queryFn: async () => {
      const result = await axios.get('/api/translate/code-list')
      return result.data
    },
    cacheTime: 1000,
    staleTime: 1000,
  } satisfies QueryMethod
}

export default TranslateApi

