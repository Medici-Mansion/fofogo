import { Validation } from '@/validation/translate/text.validation'
import axios from 'axios'
import type { UseQueryOptions, QueryKey, QueryFunction, UseMutationOptions } from 'react-query'

type QueryMethod = UseQueryOptions<unknown, unknown, unknown, QueryKey>
type MutationOptions<T> = UseMutationOptions<unknown, unknown, T, unknown>



const TranslateApi = {
  queries: {
    getCountryCode: {
      queryKey: ['contry-code'],
      queryFn: async () => {
        const result = await axios.get('/api/translate/code-list')
        return result.data
      },
      cacheTime: 1000,
      staleTime: 1000,
    } satisfies QueryMethod,
    getHistoryText: {
      queryKey: ['history-text'],
      queryFn: async () => {
        const result = await axios.get('/api/translate/text')
        return result.data
      }
    }
  },

  mutations: {
    translateText: {
      mutationKey: ['translate-text'],
      mutationFn: async (param) => {
        const result = await axios.post('/api/translate/text', param)
        return result.data
      }
    } satisfies MutationOptions<Validation<'POST'>>
  }
}

export default TranslateApi

