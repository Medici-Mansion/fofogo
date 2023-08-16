import { Validation } from '@/validation/translate/text.validation'
import axios from 'axios'
import type {
  UseQueryOptions,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query'

type QueryMethod = UseQueryOptions<unknown, unknown, unknown, QueryKey>
type MutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> = UseMutationOptions<TData, TError, TVariables, TContext>
export interface Message {
  content: string
  createdAt: string
  id: string
  role: 'system' | 'user'
  updatedAt: string
  language: {
    id: string
    code: string
    name: string
  }
}

export interface HistoryTextResponse {
  ok: boolean
  error?: any
  data: {
    chats: Message[]
    count: number
    hasNext: boolean
    total: number
  }
}

export interface MutationTextReponse {
  ok: boolean
  data: Message
  error?: any
}

export interface CountryCode {
  code: string
  id: string
  name: string
}

export interface GetCountryResponse {
  ok: boolean
  data: CountryCode[]
  error?: any
}

const TranslateApi = {
  queries: {
    getCountryCode: {
      queryKey: ['contry-code'],
      queryFn: async () => {
        const result = await axios.get<GetCountryResponse>(
          '/api/translate/code-list'
        )
        return result.data.data
      },
      suspense: true,
    } satisfies QueryMethod,
    getHistoryText: {
      queryKey: ['history-text'],
      queryFn: async ({
        pageParam = 0,
        signal,
      }: {
        pageParam?: number
        signal?: AbortSignal
      }) => {
        const result = await axios.get<HistoryTextResponse>(
          '/api/translate/text',
          {
            params: { page: pageParam },
            signal,
          }
        )
        return { ...result.data.data, page: pageParam }
      },
      suspense: true,
    },
  },

  mutations: {
    translateText: {
      mutationKey: ['translate-text'],
      mutationFn: async (param) => {
        const result = await axios.post<MutationTextReponse>(
          '/api/translate/text',
          param
        )
        return result.data
      },
    } as MutationOptions<MutationTextReponse, any, Validation<'POST'>>,
  },
}

export default TranslateApi
