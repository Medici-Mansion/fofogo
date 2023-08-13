import { Validation } from '@/validation/translate/text.validation'
import axios from 'axios'
import type {
  UseQueryOptions,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query'

type QueryMethod = UseQueryOptions<unknown, unknown, unknown, QueryKey>
type MutationOptions<T> = UseMutationOptions<unknown, unknown, T, unknown>

const TranslateApi = {
  queries: {
    getCountryCode: {
      queryKey: ['contry-code'],
      queryFn: async () => {
        const result = await axios.get(
          'http://localhost:3000/api/translate/code-list'
        )
        return result.data
      },
      suspense: true,
    } satisfies QueryMethod,
    getHistoryText: {
      queryKey: ['history-text'],
      queryFn: async () => {
        const result = await axios.get(
          'http://localhost:3000/api/translate/text'
        )
        return result.data
      },
      suspense: true,
    },
  },

  mutations: {
    translateText: {
      mutationKey: ['translate-text'],
      mutationFn: async (param) => {
        const result = await axios.post('/api/translate/text', param)
        return result.data
      },
    } satisfies MutationOptions<Validation<'POST'>>,
  },
}

export default TranslateApi
