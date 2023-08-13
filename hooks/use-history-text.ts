'use client'
import { useQuery } from '@tanstack/react-query'
import TranslateApi from '@/APIs/translateApi'

const useGetHistoryText = () => {
  return {
    ...useQuery(TranslateApi.queries.getHistoryText),
    key: TranslateApi.queries.getHistoryText.queryKey,
  }
}

export default useGetHistoryText
