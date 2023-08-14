'use client'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import TranslateApi from '@/APIs/translateApi'

const useGetHistoryText = () => {
  return {
    ...useInfiniteQuery({
      ...TranslateApi.queries.getHistoryText,
      getNextPageParam: (lastPage, page) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    }),
    key: TranslateApi.queries.getHistoryText.queryKey,
  }
}

export default useGetHistoryText
